#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

REGISTRY="ghcr.io"

# Check if GitHub username is provided, default to 'imjustnon'
ACTOR="${1:-imjustnon}"
# Convert actor to lowercase as required by Docker registry
ACTOR=$(echo "$ACTOR" | tr '[:upper:]' '[:lower:]')

echo "========================================"
echo " Make sure you are logged into $REGISTRY"
echo " Example: echo \$GH_PAT | docker login $REGISTRY -u $ACTOR --password-stdin"
echo "========================================"
echo ""
echo "Starting build and push process for actor: $ACTOR"
echo "Registry: $REGISTRY"
echo ""

# Ensure we have a buildx builder that supports multi-platform builds
if ! docker buildx ls | grep -q "local-builder"; then
  echo "Creating new Docker buildx builder 'local-builder'..."
  docker buildx create --name local-builder --use
else
  echo "Using existing Docker buildx builder 'local-builder'..."
  docker buildx use local-builder
fi

# Apps to build based on the CI workflows
APPS=("api" "mentor" "web")

for APP in "${APPS[@]}"; do
  IMAGE_NAME="$REGISTRY/$ACTOR/whoami-$APP:latest"
  
  echo ""
  echo "----------------------------------------"
  echo " Building and Pushing: $IMAGE_NAME"
  echo " Context: ."
  echo " Dockerfile: apps/$APP/Dockerfile"
  echo " Platforms: linux/amd64,linux/arm64"
  echo "----------------------------------------"
  
  docker buildx build \
    --platform linux/amd64,linux/arm64 \
    --push \
    -t "$IMAGE_NAME" \
    -f "apps/$APP/Dockerfile" \
    .
    
  echo "[OK] Successfully built and pushed $APP"
done

echo ""
echo "========================================"
echo " All images built and pushed successfully!"
echo "========================================"
