#!/bin/bash

# Full development environment startup script
# Usage: ./scripts/dev-full.sh

set -e

echo "Starting development environment..."

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if ! command -v bun &> /dev/null; then
    echo -e "${RED}Bun is not installed. Please install it first: https://bun.sh/${NC}"
    exit 1
fi

if ! pg_isready -q 2>/dev/null; then
    echo -e "${YELLOW}PostgreSQL doesn't appear to be running. Please start it first.${NC}"
    echo "   On macOS: brew services start postgresql"
    echo "   On Linux: sudo systemctl start postgresql"
fi

echo "Cleaning up existing processes..."
bun run kill:all 2>/dev/null || true

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    bun install
fi

echo "Generating Prisma client..."
if command -v doppler &> /dev/null && doppler run -- echo "test" &> /dev/null; then
    bun run db:generate
else
    echo -e "${YELLOW}Doppler not configured, using local DATABASE_URL${NC}"
    DATABASE_URL="${DATABASE_URL:-postgresql://localhost:5432/west_roxbury_zoning_local}" \
        bun --cwd packages/database db:generate
fi

echo ""
echo -e "${GREEN}Environment ready!${NC}"
echo ""
echo "Starting services..."
echo "  Web: http://localhost:3000"
echo "  API: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

if command -v doppler &> /dev/null && doppler run -- echo "test" &> /dev/null; then
    bun run dev:api & bun run dev:web & wait
else
    bun run dev:api:local & bun run dev:web:local & wait
fi
