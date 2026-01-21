// UI Module - Interface manipulation for BookAnizator

const UI = {
  // DOM Elements cache
  elements: {},

  // Categories data
  categories: [],
  languages: [],

  // Initialize UI
  init() {
    this.cacheElements();
    this.loadCategories();
    this.setupEventListeners();
    this.initApiKeyFromStorage();
  },

  // Cache DOM elements
  cacheElements() {
    this.elements = {
      // Navigation
      navLinks: document.querySelectorAll('.nav-link'),
      sections: document.querySelectorAll('.section'),

      // Search section
      isbnInput: document.getElementById('isbn-input'),
      searchBtn: document.getElementById('search-btn'),
      searchResults: document.getElementById('search-results'),
      bookPreview: document.getElementById('book-preview'),

      // Classification
      languageSelect: document.getElementById('language-select'),
      categorySelect: document.getElementById('category-select'),
      confidenceBar: document.getElementById('confidence-bar'),
      confidenceText: document.getElementById('confidence-text'),
      classificationReasoning: document.getElementById('classification-reasoning'),
      notesInput: document.getElementById('notes-input'),
      saveBookBtn: document.getElementById('save-book-btn'),

      // Books list
      booksGrid: document.getElementById('books-grid'),
      filterLanguage: document.getElementById('filter-language'),
      filterCategory: document.getElementById('filter-category'),
      searchBooks: document.getElementById('search-books'),
      totalBooks: document.getElementById('total-books'),
      viewToggle: document.querySelectorAll('.view-toggle button'),

      // Settings
      apiKeyInput: document.getElementById('api-key-input'),
      saveApiKeyCheckbox: document.getElementById('save-api-key'),
      saveSettingsBtn: document.getElementById('save-settings-btn'),

      // Export/Import
      exportBtn: document.getElementById('export-btn'),
      importBtn: document.getElementById('import-btn'),
      importFile: document.getElementById('import-file'),
      importMode: document.getElementById('import-mode'),

      // Modal
      modal: document.getElementById('modal'),
      modalTitle: document.getElementById('modal-title'),
      modalBody: document.getElementById('modal-body'),
      modalClose: document.querySelector('.modal-close'),

      // Loading
      loadingOverlay: document.getElementById('loading-overlay')
    };
  },

  // Load categories from JSON
  async loadCategories() {
    try {
      const response = await fetch('data/categories.json');
      const data = await response.json();
      this.categories = data.categories;
      this.languages = data.languages;
      this.populateSelects();
    } catch (error) {
      console.error('Error loading categories:', error);
      // Fallback categories
      this.categories = [
        { id: 'literatura', name: 'Literatura' },
        { id: 'desenvolvimento-pessoal', name: 'Desenvolvimento Pessoal' },
        { id: 'filosofia', name: 'Filosofia' },
        { id: 'ciencia', name: 'Ciência' },
        { id: 'mau', name: 'Mau' },
        { id: 'moral', name: 'Moral' },
        { id: 'negocios', name: 'Negócios' },
        { id: 'fundamento', name: 'Fundamento' },
        { id: 'criatividade', name: 'Criatividade' },
        { id: 'realidade-pensamento', name: 'Realidade e Pensamento' }
      ];
      this.languages = [
        { id: 'pt', name: 'Português' },
        { id: 'en', name: 'Inglês' }
      ];
      this.populateSelects();
    }
  },

  // Populate select dropdowns
  populateSelects() {
    // Language selects
    const languageOptions = this.languages.map(
      lang => `<option value="${lang.name}">${lang.name}</option>`
    ).join('');

    if (this.elements.languageSelect) {
      this.elements.languageSelect.innerHTML = languageOptions;
    }
    if (this.elements.filterLanguage) {
      this.elements.filterLanguage.innerHTML =
        '<option value="">Todos os idiomas</option>' + languageOptions;
    }

    // Category selects
    const categoryOptions = this.categories.map(
      cat => `<option value="${cat.name}">${cat.name}</option>`
    ).join('');

    if (this.elements.categorySelect) {
      this.elements.categorySelect.innerHTML = categoryOptions;
    }
    if (this.elements.filterCategory) {
      this.elements.filterCategory.innerHTML =
        '<option value="">Todas as categorias</option>' + categoryOptions;
    }
  },

  // Setup event listeners
  setupEventListeners() {
    // Navigation
    this.elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        this.switchSection(section);
      });
    });

    // Search on Enter
    if (this.elements.isbnInput) {
      this.elements.isbnInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.elements.searchBtn?.click();
        }
      });
    }

    // Modal close
    if (this.elements.modalClose) {
      this.elements.modalClose.addEventListener('click', () => this.closeModal());
    }
    if (this.elements.modal) {
      this.elements.modal.addEventListener('click', (e) => {
        if (e.target === this.elements.modal) {
          this.closeModal();
        }
      });
    }

    // View toggle
    this.elements.viewToggle.forEach(btn => {
      btn.addEventListener('click', () => {
        this.elements.viewToggle.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.dataset.view;
        this.elements.booksGrid?.classList.toggle('list-view', view === 'list');
      });
    });

    // Import file trigger
    if (this.elements.importBtn) {
      this.elements.importBtn.addEventListener('click', () => {
        this.elements.importFile?.click();
      });
    }
  },

  // Initialize API key from storage
  initApiKeyFromStorage() {
    const settings = Storage.getSettings();
    if (settings.saveApiKey) {
      const apiKey = Storage.getApiKey();
      if (this.elements.apiKeyInput && apiKey) {
        this.elements.apiKeyInput.value = apiKey;
      }
      if (this.elements.saveApiKeyCheckbox) {
        this.elements.saveApiKeyCheckbox.checked = true;
      }
    }
  },

  // Switch between sections
  switchSection(sectionId) {
    this.elements.sections.forEach(section => {
      section.classList.remove('active');
    });
    this.elements.navLinks.forEach(link => {
      link.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionId);
    const targetLink = document.querySelector(`[data-section="${sectionId}"]`);

    if (targetSection) targetSection.classList.add('active');
    if (targetLink) targetLink.classList.add('active');

    // Refresh books list when switching to it
    if (sectionId === 'books' && typeof App !== 'undefined') {
      App.refreshBooksList();
    }
  },

  // Show loading
  showLoading(message = 'Carregando...') {
    if (this.elements.loadingOverlay) {
      this.elements.loadingOverlay.querySelector('.loading-text').textContent = message;
      this.elements.loadingOverlay.classList.add('active');
    }
  },

  // Hide loading
  hideLoading() {
    if (this.elements.loadingOverlay) {
      this.elements.loadingOverlay.classList.remove('active');
    }
  },

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
  },

  // Show modal
  showModal(title, content) {
    if (this.elements.modal) {
      this.elements.modalTitle.textContent = title;
      this.elements.modalBody.innerHTML = content;
      this.elements.modal.classList.add('active');
    }
  },

  // Close modal
  closeModal() {
    if (this.elements.modal) {
      this.elements.modal.classList.remove('active');
    }
  },

  // Display book preview
  displayBookPreview(book) {
    if (!this.elements.bookPreview) return;

    const coverHtml = book.cover
      ? `<img src="${book.cover}" alt="Capa" class="book-cover-large">`
      : '<div class="book-cover-placeholder"><span>Sem capa</span></div>';

    this.elements.bookPreview.innerHTML = `
      <div class="book-preview-card">
        <div class="book-preview-cover">
          ${coverHtml}
        </div>
        <div class="book-preview-info">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-authors">${book.authors.join(', ') || 'Autor desconhecido'}</p>
          ${book.publishYear ? `<p class="book-year">Publicado: ${book.publishYear}</p>` : ''}
          ${book.description ? `<p class="book-description">${book.description.substring(0, 300)}${book.description.length > 300 ? '...' : ''}</p>` : ''}
          ${book.subjects.length > 0 ? `
            <div class="book-subjects">
              <strong>Assuntos:</strong>
              <div class="subject-tags">
                ${book.subjects.slice(0, 5).map(s => `<span class="tag">${s}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.elements.searchResults.classList.add('has-results');
  },

  // Display classification result
  displayClassification(classification) {
    if (this.elements.languageSelect) {
      this.elements.languageSelect.value = classification.language;
    }
    if (this.elements.categorySelect) {
      this.elements.categorySelect.value = classification.category;
    }
    if (this.elements.confidenceBar) {
      const percentage = Math.round(classification.confidence * 100);
      this.elements.confidenceBar.style.width = `${percentage}%`;
      this.elements.confidenceBar.className = 'confidence-fill';
      if (percentage >= 80) {
        this.elements.confidenceBar.classList.add('high');
      } else if (percentage >= 50) {
        this.elements.confidenceBar.classList.add('medium');
      } else {
        this.elements.confidenceBar.classList.add('low');
      }
    }
    if (this.elements.confidenceText) {
      this.elements.confidenceText.textContent =
        `${Math.round(classification.confidence * 100)}% de confiança`;
    }
    if (this.elements.classificationReasoning) {
      this.elements.classificationReasoning.textContent =
        classification.reasoning || '';
    }
  },

  // Clear search form
  clearSearch() {
    if (this.elements.isbnInput) {
      this.elements.isbnInput.value = '';
    }
    if (this.elements.bookPreview) {
      this.elements.bookPreview.innerHTML = '';
    }
    if (this.elements.searchResults) {
      this.elements.searchResults.classList.remove('has-results');
    }
    if (this.elements.notesInput) {
      this.elements.notesInput.value = '';
    }
    if (this.elements.classificationReasoning) {
      this.elements.classificationReasoning.textContent = '';
    }
  },

  // Render books list
  renderBooks(books, view = 'grid') {
    if (!this.elements.booksGrid) return;

    if (books.length === 0) {
      this.elements.booksGrid.innerHTML = `
        <div class="empty-state">
          <p>Nenhum livro encontrado.</p>
          <p>Comece adicionando livros na seção "Adicionar".</p>
        </div>
      `;
      return;
    }

    const booksHtml = books.map(book => this.createBookCard(book)).join('');
    this.elements.booksGrid.innerHTML = booksHtml;

    // Update total
    if (this.elements.totalBooks) {
      this.elements.totalBooks.textContent = books.length;
    }

    // Add event listeners for book actions
    this.elements.booksGrid.querySelectorAll('.book-card').forEach(card => {
      const bookId = card.dataset.bookId;

      card.querySelector('.edit-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        App.editBook(bookId);
      });

      card.querySelector('.delete-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        App.deleteBook(bookId);
      });

      card.addEventListener('click', () => {
        App.showBookDetails(bookId);
      });
    });
  },

  // Create book card HTML
  createBookCard(book) {
    const coverHtml = book.cover
      ? `<img src="${book.cover}" alt="Capa" class="book-cover">`
      : '<div class="book-cover-placeholder small"><span>Sem capa</span></div>';

    return `
      <div class="book-card" data-book-id="${book.id}">
        <div class="book-card-cover">
          ${coverHtml}
        </div>
        <div class="book-card-info">
          <h4 class="book-card-title">${book.title}</h4>
          <p class="book-card-authors">${book.authors.join(', ') || 'Autor desconhecido'}</p>
          <div class="book-card-tags">
            <span class="tag language">${book.language}</span>
            <span class="tag category">${book.category}</span>
          </div>
        </div>
        <div class="book-card-actions">
          <button class="btn-icon edit-btn" title="Editar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="btn-icon delete-btn" title="Excluir">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  },

  // Show edit modal
  showEditModal(book) {
    const languageOptions = this.languages.map(
      lang => `<option value="${lang.name}" ${lang.name === book.language ? 'selected' : ''}>${lang.name}</option>`
    ).join('');

    const categoryOptions = this.categories.map(
      cat => `<option value="${cat.name}" ${cat.name === book.category ? 'selected' : ''}>${cat.name}</option>`
    ).join('');

    const content = `
      <form id="edit-book-form" class="edit-form">
        <div class="form-group">
          <label for="edit-title">Título</label>
          <input type="text" id="edit-title" value="${book.title}" required>
        </div>
        <div class="form-group">
          <label for="edit-authors">Autores (separados por vírgula)</label>
          <input type="text" id="edit-authors" value="${book.authors.join(', ')}">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="edit-language">Idioma</label>
            <select id="edit-language">${languageOptions}</select>
          </div>
          <div class="form-group">
            <label for="edit-category">Categoria</label>
            <select id="edit-category">${categoryOptions}</select>
          </div>
        </div>
        <div class="form-group">
          <label for="edit-notes">Notas</label>
          <textarea id="edit-notes" rows="3">${book.notes || ''}</textarea>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="UI.closeModal()">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar</button>
        </div>
      </form>
    `;

    this.showModal('Editar Livro', content);

    // Handle form submission
    document.getElementById('edit-book-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const updates = {
        title: document.getElementById('edit-title').value,
        authors: document.getElementById('edit-authors').value.split(',').map(a => a.trim()).filter(a => a),
        language: document.getElementById('edit-language').value,
        category: document.getElementById('edit-category').value,
        notes: document.getElementById('edit-notes').value
      };
      App.saveBookEdit(book.id, updates);
    });
  },

  // Show book details modal
  showBookDetailsModal(book) {
    const coverHtml = book.cover
      ? `<img src="${book.cover}" alt="Capa" class="book-cover-modal">`
      : '<div class="book-cover-placeholder"><span>Sem capa</span></div>';

    const content = `
      <div class="book-details">
        <div class="book-details-header">
          ${coverHtml}
          <div class="book-details-info">
            <h3>${book.title}</h3>
            <p class="authors">${book.authors.join(', ') || 'Autor desconhecido'}</p>
            <div class="tags">
              <span class="tag language">${book.language}</span>
              <span class="tag category">${book.category}</span>
            </div>
          </div>
        </div>
        ${book.description ? `<div class="book-details-section"><h4>Descrição</h4><p>${book.description}</p></div>` : ''}
        ${book.subjects.length > 0 ? `
          <div class="book-details-section">
            <h4>Assuntos</h4>
            <div class="subject-tags">${book.subjects.map(s => `<span class="tag">${s}</span>`).join('')}</div>
          </div>
        ` : ''}
        ${book.notes ? `<div class="book-details-section"><h4>Notas</h4><p>${book.notes}</p></div>` : ''}
        <div class="book-details-section">
          <h4>Informações</h4>
          <p><strong>ISBN:</strong> ${book.isbn || 'N/A'}</p>
          <p><strong>Adicionado em:</strong> ${new Date(book.addedAt).toLocaleDateString('pt-BR')}</p>
          <p><strong>Confiança da classificação:</strong> ${Math.round(book.classificationConfidence * 100)}%</p>
        </div>
      </div>
    `;

    this.showModal('Detalhes do Livro', content);
  },

  // Show delete confirmation
  showDeleteConfirmation(book, onConfirm) {
    const content = `
      <div class="confirm-delete">
        <p>Tem certeza que deseja excluir o livro <strong>"${book.title}"</strong>?</p>
        <p class="warning">Esta ação não pode ser desfeita.</p>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="UI.closeModal()">Cancelar</button>
          <button type="button" class="btn btn-danger" id="confirm-delete-btn">Excluir</button>
        </div>
      </div>
    `;

    this.showModal('Confirmar Exclusão', content);

    document.getElementById('confirm-delete-btn').addEventListener('click', () => {
      onConfirm();
      this.closeModal();
    });
  },

  // Download file helper
  downloadFile(content, filename, type = 'application/json') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UI;
}
