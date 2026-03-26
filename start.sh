#!/bin/bash

echo ""
echo "╔══════════════════════════════════════╗"
echo "║        RELT — Relevamiento IT        ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado."
    echo "   Instalalo desde: https://www.docker.com/get-started"
    exit 1
fi

# Crear .env si no existe
if [ ! -f .env ]; then
    echo "⚙️  Creando archivo .env por primera vez..."
    cp .env.example .env
    SECRET=$(python3 -c "import secrets; print(secrets.token_hex(32))")
    sed -i "s/cambia-esta-clave-en-produccion-32chars/$SECRET/" .env
    echo "✅ Clave secreta generada automáticamente."
fi

echo "🚀 Levantando RELT..."
echo ""
docker compose up --build -d

echo ""
echo "✅ RELT está corriendo en: http://localhost"
echo "   Para detenerlo: docker compose down"
echo ""
