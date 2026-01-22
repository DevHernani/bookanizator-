# 📚 BookAnizator

Um catalogador de livros moderno e inteligente com classificação automática usando IA.

## ✨ Funcionalidades

### 📖 Busca e Catalogação
- **Busca por ISBN** - Busca automática de informações na Open Library
- **Busca por Título** - Encontre livros pelo nome
- **Scanner de Código de Barras** - Use a câmera para escanear ISBN
- **Adição Manual** - Adicione livros manualmente quando não encontrados

### 🤖 Classificação Inteligente
- **IA com Claude** - Classificação automática de idioma e categoria
- **10 Categorias** - Literatura, Filosofia, Ciência, Negócios, e mais
- **Múltiplos Idiomas** - Português, Inglês, Espanhol
- **Nível de Confiança** - Veja o quão confiante a IA está na classificação

### 🖼️ Gestão de Capas
- **Busca Automática** - Encontre capas automaticamente na Open Library
- **Adição Manual** - Adicione capas via URL com preview em tempo real
- **Preview Instantâneo** - Veja a capa antes de salvar

### 📊 Organização
- **Filtros Avançados** - Por idioma, categoria ou busca livre
- **Visualizações** - Grade ou lista
- **Notas Pessoais** - Adicione anotações aos seus livros
- **Exportação/Importação** - Backup em JSON

### 🤖 Organização Inteligente de Estante (NOVO!)
- **Análise por Foto** - Tire uma foto da sua estante
- **Sugestões com IA** - Receba múltiplas sugestões de organização
- **5 Tipos de Organização** - Por categoria, autor, cor, tamanho ou tema
- **Comparação com Biblioteca** - A IA considera seus livros cadastrados
- **Visual Atraente** - Sugestões para deixar a estante bonita e funcional

### 🔐 Privacidade
- **100% Local** - Todos os dados salvos no navegador
- **Sem Cadastro** - Não precisa criar conta
- **Código Aberto** - Totalmente transparente

## 🚀 Como Usar

### Online (GitHub Pages)
Acesse: `https://seu-usuario.github.io/bookanizator`

### Local
1. Clone o repositório
2. Abra `index.html` em um navegador moderno
3. Pronto! Não precisa instalar nada

## 🔧 Configuração (Opcional)

### API do Claude (para classificação automática)
1. Obtenha sua chave em: https://console.anthropic.com/
2. Vá em Configurações
3. Cole sua API key
4. Marque "Salvar API key localmente" (opcional)

**Nota:** Funciona sem API, mas a classificação será manual.

## 📱 Mobile

Totalmente responsivo! Funciona perfeitamente em:
- ✅ Smartphones
- ✅ Tablets
- ✅ Desktop

**Adicione à tela inicial** para usar como app nativo!

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **APIs**:
  - Open Library API (informações de livros)
  - Claude API (classificação IA - opcional)
  - HTML5 QR Code (scanner)
- **Armazenamento**: LocalStorage

## 📂 Estrutura do Projeto

```
BookAnizator/
├── index.html              # Página principal
├── import.html             # Importação de livros
├── update-covers.html      # Atualização de capas
├── css/
│   └── styles.css         # Estilos
├── js/
│   ├── app.js             # Lógica principal
│   ├── ui.js              # Interface do usuário
│   ├── api.js             # Integrações de API
│   └── storage.js         # Gerenciamento de dados
└── data/
    └── (dados do usuário)
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📄 Licença

MIT License - Sinta-se livre para usar, modificar e distribuir.

## 🙏 Créditos

- **Open Library** - Dados de livros
- **Anthropic Claude** - Classificação IA
- **html5-qrcode** - Scanner de código de barras

---

**Desenvolvido com ❤️ para amantes de livros**

📚 Organize sua biblioteca • 🤖 Classificação IA • 📱 Acesse de qualquer lugar
