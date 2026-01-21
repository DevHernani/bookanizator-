# 🚀 Como Publicar o BookAnizator no GitHub Pages

## Passo a Passo Completo

### 1️⃣ Criar Conta no GitHub (se não tiver)
1. Acesse: https://github.com
2. Clique em "Sign up"
3. Crie sua conta gratuita

---

### 2️⃣ Instalar Git no Windows
1. Baixe: https://git-scm.com/download/win
2. Instale com as opções padrão
3. Reinicie o terminal

---

### 3️⃣ Configurar Git (apenas primeira vez)
Abra o PowerShell ou CMD e execute:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

---

### 4️⃣ Criar Repositório no GitHub
1. Faça login no GitHub
2. Clique no "+" no canto superior direito
3. Selecione "New repository"
4. Nome: `bookanizator` (ou outro nome)
5. Marque: "Public"
6. NÃO marque "Add a README file"
7. Clique em "Create repository"

---

### 5️⃣ Publicar o Projeto

**Abra o PowerShell na pasta do projeto:**

```powershell
cd C:\Users\Herna\BookAnizator
```

**Execute os comandos:**

```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - BookAnizator"

# Adicionar o repositório remoto (SUBSTITUA com seu URL)
git remote add origin https://github.com/SEU-USUARIO/bookanizator.git

# Renomear branch para main
git branch -M main

# Enviar para o GitHub
git push -u origin main
```

**⚠️ IMPORTANTE:** Substitua `SEU-USUARIO` pelo seu nome de usuário do GitHub!

---

### 6️⃣ Ativar GitHub Pages

1. No seu repositório no GitHub, clique em "Settings"
2. No menu lateral, clique em "Pages"
3. Em "Source", selecione "main" branch
4. Clique em "Save"
5. Aguarde 1-2 minutos

**Pronto! Seu site estará em:**
```
https://SEU-USUARIO.github.io/bookanizator
```

---

## 📱 Acessar no Celular

Depois de publicado, basta abrir o navegador do celular e acessar:
```
https://SEU-USUARIO.github.io/bookanizator
```

**Adicionar à tela inicial:**
- **Android:** Menu → "Adicionar à tela inicial"
- **iOS:** Compartilhar → "Adicionar à tela de início"

---

## 🔄 Atualizar o Site (quando fizer mudanças)

```bash
cd C:\Users\Herna\BookAnizator
git add .
git commit -m "Descrição da mudança"
git push
```

Aguarde 1-2 minutos e o site será atualizado automaticamente!

---

## ❓ Problemas Comuns

### Erro: "git command not found"
- Instale o Git: https://git-scm.com/download/win
- Reinicie o terminal

### Erro: "Permission denied"
- Configure o email e nome no Git (passo 3)
- Ou use GitHub Desktop: https://desktop.github.com/

### Página 404
- Aguarde 2-3 minutos após ativar o GitHub Pages
- Verifique se o nome do repositório está correto

---

## 💡 Alternativa Rápida: GitHub Desktop (Interface Visual)

Se preferir não usar comandos:

1. Baixe: https://desktop.github.com/
2. Faça login com sua conta GitHub
3. Clique em "Add" → "Add existing repository"
4. Selecione a pasta `C:\Users\Herna\BookAnizator`
5. Clique em "Publish repository"
6. Marque "Public"
7. Ative GitHub Pages (passo 6)

---

## 🎯 Pronto para Começar?

Siga os passos acima e em poucos minutos seu BookAnizator estará online e acessível de qualquer celular! 📱✨
