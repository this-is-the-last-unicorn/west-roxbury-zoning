#!/usr/bin/env bash

# Build with Version
#
# Creates a .version.json file with git info before running the build command.
# This version info is used by Sentry for release tracking.
#
# Usage:
#   ./scripts/build-with-version.sh npm run build
#   ./scripts/build-with-version.sh bun run build
#
# The .version.json file contains:
# - version: Git tag (e.g., v0.1.0) or commit hash
# - commit: Short commit hash
# - buildTime: ISO timestamp of build

set -e

# Get version from git tag or commit
VERSION=$(git describe --tags --always 2>/dev/null || echo "dev")

# Get short commit hash
COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")

# Get build timestamp
BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Create version file in workspace root
cat > .version.json << EOF
{
  "version": "$VERSION",
  "commit": "$COMMIT",
  "buildTime": "$BUILD_TIME"
}
EOF

echo "📦 Version info created: $VERSION ($COMMIT)"

# Run the actual build command
exec "$@"
