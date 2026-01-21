# Script de Deploy do BookAnizator para GitHub Pages
# Execute este script para publicar automaticamente

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   BOOKANIZATOR - Deploy para GitHub Pages    " -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se Git está instalado
try {
    git --version | Out-Null
    Write-Host "✓ Git encontrado" -ForegroundColor Green
} catch {
    Write-Host "✗ Git não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, instale o Git primeiro:" -ForegroundColor Yellow
    Write-Host "https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

Write-Host ""

# Verificar se já está configurado
$gitConfig = git config user.name
if (-not $gitConfig) {
    Write-Host "Configuração do Git necessária:" -ForegroundColor Yellow
    Write-Host ""
    $userName = Read-Host "Digite seu nome"
    $userEmail = Read-Host "Digite seu email"

    git config --global user.name "$userName"
    git config --global user.email "$userEmail"

    Write-Host "✓ Git configurado" -ForegroundColor Green
}

Write-Host ""

# Perguntar URL do repositório
Write-Host "Qual é a URL do seu repositório GitHub?" -ForegroundColor Yellow
Write-Host "Exemplo: https://github.com/seu-usuario/bookanizator.git" -ForegroundColor Gray
Write-Host ""
$repoUrl = Read-Host "URL do repositório"

if (-not $repoUrl) {
    Write-Host "✗ URL não fornecida. Abortando..." -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "Iniciando deploy..." -ForegroundColor Cyan
Write-Host ""

# Verificar se já é um repositório Git
if (Test-Path ".git") {
    Write-Host "✓ Repositório Git já existe" -ForegroundColor Green
} else {
    Write-Host "Inicializando repositório Git..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Repositório inicializado" -ForegroundColor Green
}

Write-Host ""

# Adicionar arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
git add .

Write-Host "✓ Arquivos adicionados" -ForegroundColor Green
Write-Host ""

# Commit
$commitMsg = Read-Host "Mensagem do commit (Enter para 'Update BookAnizator')"
if (-not $commitMsg) {
    $commitMsg = "Update BookAnizator"
}

git commit -m "$commitMsg"
Write-Host "✓ Commit criado" -ForegroundColor Green
Write-Host ""

# Verificar se remote já existe
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "Remote 'origin' já existe. Removendo..." -ForegroundColor Yellow
    git remote remove origin
}

# Adicionar remote
git remote add origin $repoUrl
Write-Host "✓ Remote adicionado" -ForegroundColor Green
Write-Host ""

# Renomear branch para main
git branch -M main
Write-Host "✓ Branch renomeada para 'main'" -ForegroundColor Green
Write-Host ""

# Push
Write-Host "Enviando para GitHub..." -ForegroundColor Yellow
Write-Host ""

try {
    git push -u origin main
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "          ✓ DEPLOY CONCLUÍDO COM SUCESSO!      " -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos passos:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Acesse seu repositório no GitHub" -ForegroundColor White
    Write-Host "2. Vá em Settings → Pages" -ForegroundColor White
    Write-Host "3. Em 'Source', selecione 'main' branch" -ForegroundColor White
    Write-Host "4. Clique em 'Save'" -ForegroundColor White
    Write-Host "5. Aguarde 1-2 minutos" -ForegroundColor White
    Write-Host ""

    # Extrair username do URL
    if ($repoUrl -match 'github\.com[:/]([^/]+)/') {
        $username = $matches[1]
        $repoName = ($repoUrl -split '/')[-1] -replace '\.git$', ''
        $siteUrl = "https://$username.github.io/$repoName"

        Write-Host "Seu site estará disponível em:" -ForegroundColor Cyan
        Write-Host $siteUrl -ForegroundColor Yellow
    }

    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "✗ Erro ao enviar para GitHub" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possíveis soluções:" -ForegroundColor Yellow
    Write-Host "1. Verifique se a URL do repositório está correta" -ForegroundColor White
    Write-Host "2. Verifique se você tem permissão no repositório" -ForegroundColor White
    Write-Host "3. Tente fazer login no GitHub primeiro" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
pause
