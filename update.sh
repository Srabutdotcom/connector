#!/bin/bash
set -e

# Check for outdated dependencies
OUTDATED=$(deno outdated)

# Exit if no outdated dependencies, empty
if [[ -z "$OUTDATED" ]]; then
  echo "✅ All dependencies are already up to date. No action needed."
  exit 0
fi

# Read current version from deno.json
CURRENT_VERSION=$(grep '"version":' deno.json | head -1 | sed -E 's/.*"version": *"([^"]+)".*/\1/')
echo "Current Version ${CURRENT_VERSION}"

# Split into parts
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

# Bump version with patch max at 10
if [ "$PATCH" -lt 9 ]; then
  PATCH=$((PATCH + 1))
else
  PATCH=0
  MINOR=$((MINOR + 1))
fi

NEW_VERSION="${MAJOR}.${MINOR}.$((PATCH))"

# Update dependencies to latest versions
deno outdated --update --latest
echo "Updated to ${NEW_VERSION}"

# Call your commit script
./commit.sh "$NEW_VERSION" "update version dependencies"
