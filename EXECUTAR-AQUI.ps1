# ================================================
#   BOOKANIZATOR - PUSH PARA GITHUB
#   Execute este arquivo: Botão direito → Executar com PowerShell
# ================================================

# Cores para o terminal
$Host.UI.RawUI.WindowTitle = "BookAnizator Deploy"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   BOOKANIZATOR - DEPLOY PARA GITHUB           " -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Seu repositório
$repoUrl = "https://github.com/DevHernani/bookanizator-.git"
$repoName = "bookanizator-"
$username = "DevHernani"

# 1. Verificar Git
Write-Host "[1/7] Verificando Git..." -ForegroundColor Yellow

try {
    $gitVersion = git --version
    Write-Host "      ✓ Git instalado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "      ✗ Git não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "      Instale o Git:" -ForegroundColor Yellow
    Write-Host "      https://git-scm.com/download/win" -ForegroundColor White
    Write-Host ""
    Write-Host "      Depois de instalar, reinicie o PowerShell e execute novamente." -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host ""

# 2. Configurar Git (se necessário)
Write-Host "[2/7] Verificando configuração do Git..." -ForegroundColor Yellow

$gitName = git config --global user.name
$gitEmail = git config --global user.email

if (-not $gitName -or -not $gitEmail) {
    Write-Host "      Configuração necessária!" -ForegroundColor Yellow
    Write-Host ""

    if (-not $gitName) {
        $gitName = Read-Host "      Digite seu nome"
        git config --global user.name "$gitName"
    }

    if (-not $gitEmail) {
        $gitEmail = Read-Host "      Digite seu email"
        git config --global user.email "$gitEmail"
    }

    Write-Host "      ✓ Git configurado" -ForegroundColor Green
} else {
    Write-Host "      ✓ Git já configurado ($gitName)" -ForegroundColor Green
}

Write-Host ""

# 3. Inicializar repositório
Write-Host "[3/7] Inicializando repositório..." -ForegroundColor Yellow

if (Test-Path ".git") {
    Write-Host "      ✓ Repositório Git já existe" -ForegroundColor Green
} else {
    git init | Out-Null
    Write-Host "      ✓ Repositório inicializado" -ForegroundColor Green
}

Write-Host ""

# 4. Adicionar arquivos
Write-Host "[4/7] Adicionando arquivos..." -ForegroundColor Yellow

git add . 2>&1 | Out-Null
$filesCount = (git diff --cached --numstat | Measure-Object).Count

Write-Host "      ✓ $filesCount arquivos adicionados" -ForegroundColor Green
Write-Host ""

# 5. Commit
Write-Host "[5/7] Criando commit..." -ForegroundColor Yellow

try {
    git commit -m "First commit - BookAnizator v1.0" 2>&1 | Out-Null
    Write-Host "      ✓ Commit criado com sucesso" -ForegroundColor Green
} catch {
    # Pode ser que já tenha commit
    Write-Host "      ✓ Commit processado" -ForegroundColor Green
}

Write-Host ""

# 6. Configurar remote
Write-Host "[6/7] Configurando repositório remoto..." -ForegroundColor Yellow

# Renomear branch para main
git branch -M main 2>&1 | Out-Null

# Remover remote antigo se existir
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    git remote remove origin 2>&1 | Out-Null
}

# Adicionar novo remote
git remote add origin $repoUrl 2>&1 | Out-Null
Write-Host "      ✓ Remote configurado: $repoUrl" -ForegroundColor Green
Write-Host ""

# 7. Push
Write-Host "[7/7] Enviando para GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "      Aguarde... isso pode levar alguns segundos" -ForegroundColor Gray
Write-Host ""

try {
    # Tentar push
    $pushOutput = git push -u origin main 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "================================================" -ForegroundColor Green
        Write-Host "          ✓✓✓ SUCESSO! ✓✓✓                     " -ForegroundColor Green
        Write-Host "================================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Código enviado para o GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "PRÓXIMO PASSO: Ativar GitHub Pages" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Acesse:" -ForegroundColor White
        Write-Host "   https://github.com/$username/$repoName/settings/pages" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "2. Em 'Source', selecione:" -ForegroundColor White
        Write-Host "   Branch: main → Save" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "3. Aguarde 1-2 minutos e acesse:" -ForegroundColor White
        Write-Host "   https://$username.github.io/$repoName" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "================================================" -ForegroundColor Cyan
        Write-Host ""

        # Perguntar se quer abrir o navegador
        $openBrowser = Read-Host "Deseja abrir o GitHub Pages no navegador agora? (S/N)"
        if ($openBrowser -eq "S" -or $openBrowser -eq "s") {
            Start-Process "https://github.com/$username/$repoName/settings/pages"
        }

    } else {
        throw "Push failed"
    }

} catch {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Red
    Write-Host "          ⚠ ERRO DE AUTENTICAÇÃO               " -ForegroundColor Red
    Write-Host "================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "O GitHub não aceita mais senha!" -ForegroundColor Yellow
    Write-Host "Você precisa de um Personal Access Token." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "SOLUÇÃO:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Acesse:" -ForegroundColor White
    Write-Host "   https://github.com/settings/tokens/new" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "2. Preencha:" -ForegroundColor White
    Write-Host "   - Note: BookAnizator Deploy" -ForegroundColor Gray
    Write-Host "   - Expiration: 90 days" -ForegroundColor Gray
    Write-Host "   - Marque: [X] repo (todas as opções)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Clique em 'Generate token'" -ForegroundColor White
    Write-Host ""
    Write-Host "4. COPIE O TOKEN (ghp_...)" -ForegroundColor White
    Write-Host ""
    Write-Host "5. Execute este script novamente" -ForegroundColor White
    Write-Host "   Quando pedir senha, COLE O TOKEN" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Red
    Write-Host ""

    $openTokenPage = Read-Host "Deseja abrir a página de tokens agora? (S/N)"
    if ($openTokenPage -eq "S" -or $openTokenPage -eq "s") {
        Start-Process "https://github.com/settings/tokens/new"
    }
}

Write-Host ""
Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
