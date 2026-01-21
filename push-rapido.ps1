# Script Rápido de Push para GitHub
# BookAnizator - DevHernani

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   ENVIANDO BOOKANIZATOR PARA GITHUB           " -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# URL do seu repositório
$repoUrl = "https://github.com/DevHernani/bookanizator-.git"

# Verificar Git
try {
    git --version | Out-Null
} catch {
    Write-Host "✗ Git não instalado!" -ForegroundColor Red
    Write-Host "Baixe em: https://git-scm.com/download/win" -ForegroundColor Yellow
    pause
    exit
}

# Configurar Git (se necessário)
$userName = git config user.name
if (-not $userName) {
    Write-Host "Configurando Git..." -ForegroundColor Yellow
    $name = Read-Host "Seu nome"
    $email = Read-Host "Seu email"

    git config --global user.name "$name"
    git config --global user.email "$email"
}

Write-Host ""
Write-Host "Processando..." -ForegroundColor Yellow
Write-Host ""

# Comandos Git
try {
    # Init (se necessário)
    if (-not (Test-Path ".git")) {
        git init
        Write-Host "✓ Repositório inicializado" -ForegroundColor Green
    }

    # Add
    git add .
    Write-Host "✓ Arquivos adicionados" -ForegroundColor Green

    # Commit
    git commit -m "First commit - BookAnizator"
    Write-Host "✓ Commit criado" -ForegroundColor Green

    # Branch
    git branch -M main
    Write-Host "✓ Branch main" -ForegroundColor Green

    # Remote (remover se já existir)
    $existingRemote = git remote get-url origin 2>$null
    if ($existingRemote) {
        git remote remove origin
    }
    git remote add origin $repoUrl
    Write-Host "✓ Remote configurado" -ForegroundColor Green

    Write-Host ""
    Write-Host "Enviando para GitHub..." -ForegroundColor Cyan
    Write-Host ""

    # Push
    git push -u origin main

    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "          ✓ SUCESSO!                           " -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximo passo:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Acesse: https://github.com/DevHernani/bookanizator-" -ForegroundColor White
    Write-Host "2. Clique em Settings → Pages" -ForegroundColor White
    Write-Host "3. Source → main branch → Save" -ForegroundColor White
    Write-Host ""
    Write-Host "Seu site estará em:" -ForegroundColor Cyan
    Write-Host "https://devhernani.github.io/bookanizator-" -ForegroundColor Yellow
    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "✗ Erro ao enviar" -ForegroundColor Red
    Write-Host ""
    Write-Host "Se pedir autenticação:" -ForegroundColor Yellow
    Write-Host "- Use seu TOKEN do GitHub (não a senha)" -ForegroundColor White
    Write-Host "- Crie em: Settings → Developer settings → Personal access tokens" -ForegroundColor White
    Write-Host ""
}

pause
