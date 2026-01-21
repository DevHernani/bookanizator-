// API Module - Open Library and Claude API integration

const API = {
  // Open Library base URL
  OPEN_LIBRARY_BASE: 'https://openlibrary.org',

  // Normalize ISBN (remove dashes and spaces)
  normalizeISBN(isbn) {
    return isbn.replace(/[-\s]/g, '');
  },

  // Search book by ISBN using Open Library
  async searchByISBN(isbn) {
    const normalizedISBN = this.normalizeISBN(isbn);

    try {
      // Try ISBN API first
      const response = await fetch(
        `${this.OPEN_LIBRARY_BASE}/isbn/${normalizedISBN}.json`
      );

      if (!response.ok) {
        // Try search API as fallback
        return await this.searchByQuery(normalizedISBN);
      }

      const bookData = await response.json();
      return await this.formatBookData(bookData, normalizedISBN);
    } catch (error) {
      console.error('Error fetching book by ISBN:', error);
      throw new Error('Não foi possível encontrar o livro. Verifique o ISBN.');
    }
  },

  // Search by query (title, author, etc.)
  async searchByQuery(query) {
    try {
      const response = await fetch(
        `${this.OPEN_LIBRARY_BASE}/search.json?q=${encodeURIComponent(query)}&limit=1`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();

      if (data.docs && data.docs.length > 0) {
        const doc = data.docs[0];
        return {
          isbn: doc.isbn ? doc.isbn[0] : query,
          title: doc.title || 'Título desconhecido',
          authors: doc.author_name || [],
          cover: doc.cover_i
            ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
            : null,
          description: '',
          subjects: doc.subject ? doc.subject.slice(0, 10) : [],
          publishYear: doc.first_publish_year || null,
          publisher: doc.publisher ? doc.publisher[0] : null
        };
      }

      throw new Error('No results found');
    } catch (error) {
      console.error('Error searching book:', error);
      throw new Error('Livro não encontrado.');
    }
  },

  // Format book data from Open Library response
  async formatBookData(data, isbn) {
    let authors = [];
    let description = '';
    let subjects = data.subjects || [];

    // Fetch author names if we have author keys
    if (data.authors && data.authors.length > 0) {
      try {
        const authorPromises = data.authors.map(async (author) => {
          const authorKey = author.key || author;
          const res = await fetch(`${this.OPEN_LIBRARY_BASE}${authorKey}.json`);
          if (res.ok) {
            const authorData = await res.json();
            return authorData.name || 'Autor desconhecido';
          }
          return 'Autor desconhecido';
        });
        authors = await Promise.all(authorPromises);
      } catch {
        authors = ['Autor desconhecido'];
      }
    }

    // Get description
    if (data.description) {
      description = typeof data.description === 'string'
        ? data.description
        : data.description.value || '';
    }

    // Get cover
    let cover = null;
    if (data.covers && data.covers.length > 0) {
      cover = `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`;
    }

    return {
      isbn: isbn,
      title: data.title || 'Título desconhecido',
      authors: authors,
      cover: cover,
      description: description,
      subjects: subjects.slice(0, 10),
      publishYear: data.publish_date || null,
      publisher: data.publishers ? data.publishers[0] : null
    };
  },

  // Classify book using Claude API
  async classifyBook(bookData, apiKey, existingBooks = []) {
    if (!apiKey) {
      throw new Error('API key do Claude não configurada.');
    }

    const categories = [
      'Literatura',
      'Desenvolvimento Pessoal',
      'Filosofia',
      'Ciência',
      'Mau',
      'Moral',
      'Negócios',
      'Fundamento',
      'Criatividade',
      'Realidade e Pensamento'
    ];

    const languages = ['Português', 'Inglês'];

    // Build context from existing books
    let contextExamples = '';
    if (existingBooks.length > 0) {
      const examples = existingBooks.slice(-10).map(book =>
        `- "${book.title}" por ${book.authors.join(', ')}: ${book.language}, ${book.category}`
      ).join('\n');
      contextExamples = `\n\nExemplos de classificações anteriores:\n${examples}`;
    }

    const prompt = `Você é um bibliotecário especializado em classificação de livros. Analise o seguinte livro e classifique-o.

Dados do livro:
- Título: ${bookData.title}
- Autor(es): ${bookData.authors.join(', ')}
- Descrição: ${bookData.description || 'Não disponível'}
- Assuntos: ${bookData.subjects.join(', ') || 'Não disponível'}

Categorias disponíveis: ${categories.join(', ')}
Idiomas disponíveis: ${languages.join(', ')}
${contextExamples}

Responda APENAS no seguinte formato JSON (sem markdown, sem explicações):
{
  "language": "Português ou Inglês",
  "category": "uma das categorias listadas",
  "confidence": 0.0 a 1.0,
  "reasoning": "breve explicação da classificação"
}`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('API key inválida. Verifique sua chave.');
        }
        throw new Error(errorData.error?.message || 'Erro na API do Claude.');
      }

      const data = await response.json();
      const content = data.content[0].text;

      // Parse JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Resposta inválida do Claude.');
      }

      const classification = JSON.parse(jsonMatch[0]);

      // Validate response
      if (!languages.includes(classification.language)) {
        classification.language = 'Português';
      }
      if (!categories.includes(classification.category)) {
        classification.category = 'Literatura';
      }
      if (typeof classification.confidence !== 'number') {
        classification.confidence = 0.5;
      }

      return classification;
    } catch (error) {
      console.error('Error classifying book:', error);
      throw error;
    }
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = API;
}
