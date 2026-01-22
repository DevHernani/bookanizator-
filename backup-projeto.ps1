# Script de Backup Automático do BookAnizator
# Execute periodicamente para criar backups

$projectPath = "C:\Users\Herna\BookAnizator"
$backupRoot = "C:\Users\Herna\Backups\BookAnizator"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$backupPath = "$backupRoot\BookAnizator-$timestamp"

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   BACKUP DO BOOKANIZATOR                      " -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Criar pasta de backups se não existir
if (-not (Test-Path $backupRoot)) {
    New-Item -ItemType Directory -Path $backupRoot | Out-Null
    Write-Host "✓ Pasta de backups criada" -ForegroundColor Green
}

# Copiar projeto
Write-Host "Copiando arquivos..." -ForegroundColor Yellow
Copy-Item -Path $projectPath -Destination $backupPath -Recurse

# Criar ZIP
Write-Host "Criando arquivo ZIP..." -ForegroundColor Yellow
$zipPath = "$backupRoot\BookAnizator-$timestamp.zip"
Compress-Archive -Path $backupPath -DestinationPath $zipPath

# Remover pasta temporária
Remove-Item -Path $backupPath -Recurse -Force

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "          ✓ BACKUP CONCLUÍDO!                  " -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backup salvo em:" -ForegroundColor Cyan
Write-Host $zipPath -ForegroundColor Yellow
Write-Host ""

# Mostrar tamanho
$size = (Get-Item $zipPath).Length / 1MB
Write-Host "Tamanho: $([math]::Round($size, 2)) MB" -ForegroundColor Gray
Write-Host ""

# Listar backups existentes
Write-Host "Backups anteriores:" -ForegroundColor Cyan
Get-ChildItem -Path $backupRoot -Filter "*.zip" |
    Sort-Object LastWriteTime -Descending |
    Select-Object Name, @{Name="Tamanho (MB)";Expression={[math]::Round($_.Length/1MB,2)}}, LastWriteTime |
    Format-Table

pause
