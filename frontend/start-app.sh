#!/bin/bash

# Script pour lancer le Backend et le Frontend en même temps sur macOS
# Emplacement : /Users/chrisamendoza/start-pilates.sh

echo "🚀 Lancement de l'écosystème Pilates..."

# 1. Lancer le Backend (JHipster/Spring Boot) dans une nouvelle fenêtre Terminal
osascript -e 'tell application "Terminal" to do script "cd ~/pilates-booking && ./mvnw"'

# 2. Lancer le Frontend (Vite/React) dans une autre fenêtre Terminal
osascript -e 'tell application "Terminal" to do script "cd ~/pilates-frontend && npm run dev"'

echo "✅ Terminals ouverts ! Le Backend et le Frontend sont en cours de démarrage."
