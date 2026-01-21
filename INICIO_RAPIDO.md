# 🚀 Início Rápido - BookAnizator no Celular

## Método Mais Fácil: Script Automático

### Passo 1: Criar Repositório no GitHub
1. Acesse: https://github.com/new
2. Nome: `bookanizator`
3. Marque: **Public**
4. Clique em "Create repository"
5. **Copie a URL** (exemplo: `https://github.com/seu-usuario/bookanizator.git`)

### Passo 2: Executar Script de Deploy
1. Clique com botão direito em `deploy.ps1`
2. Selecione "Executar com PowerShell"
3. Cole a URL do repositório quando solicitado
4. Aguarde o processo terminar

### Passo 3: Ativar GitHub Pages
1. No GitHub, vá em **Settings** do repositório
2. Clique em **Pages** no menu lateral
3. Em "Source", selecione **main** branch
4. Clique em **Save**
5. Aguarde 1-2 minutos

### Passo 4: Acessar no Celular
```
https://seu-usuario.github.io/bookanizator
```

**Adicione à tela inicial** e use como app! 📱

---

## ⚡ Comandos Manuais (Alternativa)

Se preferir fazer manualmente, abra o PowerShell:

```powershell
cd C:\Users\Herna\BookAnizator

git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU-USUARIO/bookanizator.git
git branch -M main
git push -u origin main
```

Depois ative o GitHub Pages (Passo 3 acima).

---

## 📱 Usar como App no Celular

### Android
1. Abra o site no Chrome
2. Menu (⋮) → "Adicionar à tela inicial"
3. Pronto! Ícone criado

### iOS
1. Abra o site no Safari
2. Compartilhar → "Adicionar à tela de início"
3. Pronto! Ícone criado

---

## 🔄 Atualizar Depois (quando fizer mudanças)

```powershell
cd C:\Users\Herna\BookAnizator
git add .
git commit -m "Atualização"
git push
```

Aguarde 1-2 minutos e as mudanças estarão online!

---

## ❓ Problemas?

### Git não encontrado
- Instale: https://git-scm.com/download/win
- Reinicie o terminal

### Erro de permissão
- Faça login no GitHub pelo navegador primeiro
- Ou use GitHub Desktop: https://desktop.github.com/

### Página 404
- Aguarde 2-3 minutos após ativar Pages
- Limpe o cache do navegador

---

**Dúvidas? Consulte o arquivo `DEPLOY_GITHUB_PAGES.md` para instruções detalhadas!**
