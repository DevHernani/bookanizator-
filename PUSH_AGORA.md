# 🚀 Push para o GitHub - AGORA!

Seu repositório está criado! Agora vamos enviar o código.

## Execute estes comandos no PowerShell:

```powershell
# 1. Navegue até a pasta
cd C:\Users\Herna\BookAnizator

# 2. Inicialize o repositório (se ainda não fez)
git init

# 3. Adicione todos os arquivos
git add .

# 4. Faça o primeiro commit
git commit -m "first commit"

# 5. Renomeie a branch para main
git branch -M main

# 6. Adicione o remote (COPIE da sua tela do GitHub)
git remote add origin https://github.com/DevHernani/bookanizator-.git

# 7. Envie para o GitHub
git push -u origin main
```

## Se der erro de autenticação:

O GitHub não aceita mais senha. Você precisa usar um **Personal Access Token**.

### Criar Token:

1. GitHub → Settings (seu perfil) → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Marque: `repo` (todas as opções)
5. Generate token
6. **COPIE O TOKEN** (você não verá novamente!)

### Usar o Token:

Quando pedir senha, cole o **TOKEN** (não a senha do GitHub).

Ou configure para não pedir sempre:

```powershell
git config --global credential.helper wincred
```

---

## ✅ Depois do Push:

Ative o GitHub Pages:

1. Repositório → **Settings**
2. Menu lateral → **Pages**
3. Source → **main** branch
4. **Save**

Aguarde 1-2 minutos e acesse:
```
https://devhernani.github.io/bookanizator-
```

🎉 Pronto! Agora pode acessar do celular!
