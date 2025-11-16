.PHONY: help install dev build start clean lint deploy serve

# Default target - show help
help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Run development server"
	@echo "  make build      - Build static site for production"
	@echo "  make serve      - Serve production build locally (requires build first)"
	@echo "  make start      - Alias for serve"
	@echo "  make clean      - Remove build artifacts"
	@echo "  make lint       - Run ESLint"
	@echo "  make deploy     - Build and deploy to GitHub Pages"

# Install dependencies
install:
	npm install

# Run development server
dev:
	npm run dev

# Build for production (static export)
build:
	npm run build

# Serve production build locally
serve: build
	@echo "Serving production build from 'out' directory..."
	npx serve@latest out

# Alias for serve (since next start doesn't work with static export)
start: serve

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf out
	rm -rf node_modules/.cache

# Run linter
lint:
	npm run lint || npx next lint

# Deploy to GitHub Pages
deploy:
	npm run deploy

# Quick start (install and run dev)
quickstart: install dev

