#!/bin/bash

# Doppler project setup for Last Unicorn projects
# Creates a Doppler project with standard environments: dev, dev_personal, preview, prd
#
# Usage:
#   ./scripts/setup-doppler.sh <project-name> [database-url]
#
# Examples:
#   ./scripts/setup-doppler.sh my-app
#   ./scripts/setup-doppler.sh my-app "postgresql://localhost:5432/my_app_local"

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

PROJECT_NAME="${1}"
DATABASE_URL="${2}"

if [ -z "$PROJECT_NAME" ]; then
    echo -e "${RED}Usage: ./scripts/setup-doppler.sh <project-name> [database-url]${NC}"
    echo ""
    echo "  project-name   Doppler project name (kebab-case, e.g. my-cool-app)"
    echo "  database-url   Optional DATABASE_URL to set in dev config"
    echo "                 Default: postgresql://localhost:5432/<project_name_underscored>_local"
    exit 1
fi

if ! command -v doppler &> /dev/null; then
    echo -e "${RED}❌ Doppler CLI not installed.${NC}"
    echo "   Install: brew install dopplerhq/cli/doppler"
    echo "   Then:    doppler login"
    exit 1
fi

if ! doppler whoami &> /dev/null 2>&1; then
    echo -e "${RED}❌ Not logged into Doppler. Run: doppler login${NC}"
    exit 1
fi

# Derive default DATABASE_URL from project name if not provided
if [ -z "$DATABASE_URL" ]; then
    DB_NAME=$(echo "$PROJECT_NAME" | tr '-' '_')
    DATABASE_URL="postgresql://localhost:5432/${DB_NAME}_local"
fi

echo -e "${CYAN}🔐 Setting up Doppler project: ${PROJECT_NAME}${NC}"
echo ""

# Check if project already exists
if doppler projects --json 2>/dev/null | grep -q "\"id\":\"${PROJECT_NAME}\""; then
    echo -e "${YELLOW}⚠️  Project '${PROJECT_NAME}' already exists in Doppler${NC}"
    echo ""
    read -p "Link this directory to the existing project? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
else
    echo "📦 Creating project..."
    doppler projects create "$PROJECT_NAME" --description "Last Unicorn: ${PROJECT_NAME}" > /dev/null
    echo -e "${GREEN}   ✓ Project created${NC}"

    # Doppler creates dev, stg, prd by default. Remove stg, add preview.
    echo "🔧 Configuring environments..."

    echo "   Removing default 'stg' environment..."
    doppler environments delete stg --project "$PROJECT_NAME" --yes > /dev/null 2>&1 || true

    echo "   Creating 'preview' environment..."
    doppler environments create preview "Preview" --project "$PROJECT_NAME" > /dev/null
    echo -e "${GREEN}   ✓ Environments: dev, dev_personal, preview, prd${NC}"

    # Set initial DATABASE_URL in dev config
    echo ""
    echo "🗄️  Setting DATABASE_URL in dev config..."
    doppler secrets set DATABASE_URL "$DATABASE_URL" --project "$PROJECT_NAME" --config dev > /dev/null
    echo -e "${GREEN}   ✓ DATABASE_URL = ${DATABASE_URL}${NC}"
fi

# Link this directory to the project
echo ""
echo "🔗 Linking directory to Doppler project..."
doppler setup --project "$PROJECT_NAME" --config dev --no-interactive > /dev/null
echo -e "${GREEN}   ✓ Linked to ${PROJECT_NAME}/dev${NC}"

# Verify
echo ""
echo -e "${GREEN}✅ Doppler setup complete!${NC}"
echo ""
echo "Environments:"
doppler environments --project "$PROJECT_NAME" 2>/dev/null | tail -n +3
echo ""
echo -e "${CYAN}Next steps:${NC}"
echo "  • Add more secrets:      doppler secrets set KEY=value"
echo "  • Open Doppler dashboard: doppler open"
echo "  • Use personal overrides: doppler setup --config dev_personal"
echo "  • Run with secrets:       doppler run -- bun run dev"
echo ""
echo -e "${YELLOW}Tip: Other team members just need to run:${NC}"
echo "  doppler setup --project ${PROJECT_NAME} --config dev"
