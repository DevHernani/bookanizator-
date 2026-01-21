// Storage Module - LocalStorage management for BookAnizator

const Storage = {
  KEYS: {
    BOOKS: 'bookanizator_books',
    API_KEY: 'bookanizator_api_key',
    SETTINGS: 'bookanizator_settings'
  },

  // Generate unique ID
  generateId() {
    return 'book_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Get all books
  getBooks() {
    try {
      const data = localStorage.getItem(this.KEYS.BOOKS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading books from storage:', error);
      return [];
    }
  },

  // Save all books
  saveBooks(books) {
    try {
      localStorage.setItem(this.KEYS.BOOKS, JSON.stringify(books));
      return true;
    } catch (error) {
      console.error('Error saving books to storage:', error);
      return false;
    }
  },

  // Add a new book
  addBook(bookData) {
    const books = this.getBooks();
    const newBook = {
      id: this.generateId(),
      isbn: bookData.isbn || '',
      title: bookData.title || 'Título desconhecido',
      authors: bookData.authors || [],
      cover: bookData.cover || null,
      description: bookData.description || '',
      subjects: bookData.subjects || [],
      language: bookData.language || 'Português',
      category: bookData.category || 'Literatura',
      classificationConfidence: bookData.classificationConfidence || 0,
      addedAt: new Date().toISOString(),
      notes: bookData.notes || ''
    };

    books.push(newBook);
    this.saveBooks(books);
    return newBook;
  },

  // Update a book
  updateBook(id, updates) {
    const books = this.getBooks();
    const index = books.findIndex(book => book.id === id);

    if (index !== -1) {
      books[index] = { ...books[index], ...updates };
      this.saveBooks(books);
      return books[index];
    }
    return null;
  },

  // Delete a book
  deleteBook(id) {
    const books = this.getBooks();
    const filteredBooks = books.filter(book => book.id !== id);

    if (filteredBooks.length !== books.length) {
      this.saveBooks(filteredBooks);
      return true;
    }
    return false;
  },

  // Get a single book by ID
  getBookById(id) {
    const books = this.getBooks();
    return books.find(book => book.id === id) || null;
  },

  // Check if ISBN already exists
  isbnExists(isbn) {
    const books = this.getBooks();
    return books.some(book => book.isbn === isbn);
  },

  // Export books as JSON
  exportBooks() {
    const books = this.getBooks();
    const exportData = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      totalBooks: books.length,
      books: books
    };
    return JSON.stringify(exportData, null, 2);
  },

  // Import books from JSON
  importBooks(jsonString, mode = 'merge') {
    try {
      const data = JSON.parse(jsonString);
      const importedBooks = data.books || data;

      if (!Array.isArray(importedBooks)) {
        throw new Error('Invalid format: expected array of books');
      }

      const currentBooks = this.getBooks();
      let result = { added: 0, skipped: 0, updated: 0 };

      if (mode === 'replace') {
        this.saveBooks(importedBooks.map(book => ({
          ...book,
          id: book.id || this.generateId()
        })));
        result.added = importedBooks.length;
      } else {
        // Merge mode
        importedBooks.forEach(book => {
          const existingIndex = currentBooks.findIndex(
            b => b.isbn === book.isbn || b.id === book.id
          );

          if (existingIndex === -1) {
            currentBooks.push({
              ...book,
              id: book.id || this.generateId()
            });
            result.added++;
          } else {
            result.skipped++;
          }
        });
        this.saveBooks(currentBooks);
      }

      return result;
    } catch (error) {
      console.error('Error importing books:', error);
      throw error;
    }
  },

  // API Key management
  getApiKey() {
    try {
      return localStorage.getItem(this.KEYS.API_KEY) || '';
    } catch {
      return '';
    }
  },

  saveApiKey(key) {
    try {
      if (key) {
        localStorage.setItem(this.KEYS.API_KEY, key);
      } else {
        localStorage.removeItem(this.KEYS.API_KEY);
      }
      return true;
    } catch {
      return false;
    }
  },

  // Settings management
  getSettings() {
    try {
      const data = localStorage.getItem(this.KEYS.SETTINGS);
      return data ? JSON.parse(data) : { saveApiKey: false };
    } catch {
      return { saveApiKey: false };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch {
      return false;
    }
  },

  // Clear all data
  clearAll() {
    try {
      localStorage.removeItem(this.KEYS.BOOKS);
      localStorage.removeItem(this.KEYS.API_KEY);
      localStorage.removeItem(this.KEYS.SETTINGS);
      return true;
    } catch {
      return false;
    }
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Storage;
}
