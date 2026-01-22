# Atualizar BookAnizator no GitHub
# Execute este arquivo para enviar as mudanças

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   ATUALIZANDO BOOKANIZATOR NO GITHUB          " -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

cd C:\Users\Herna\BookAnizator

Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
git add .

Write-Host "Criando commit..." -ForegroundColor Yellow
git commit -m "Add: Organização de estante com IA por foto"

Write-Host "Enviando para GitHub..." -ForegroundColor Yellow
git push

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "          ✓ ATUALIZADO COM SUCESSO!            " -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Aguarde 1-2 minutos e acesse:" -ForegroundColor Cyan
Write-Host "https://devhernani.github.io/bookanizator-" -ForegroundColor Yellow
Write-Host ""
Write-Host "Nova funcionalidade: Organizar Estante com IA!" -ForegroundColor Green
Write-Host ""

pause
