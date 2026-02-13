#!/bin/bash

# Script pour lancer le Backend et le Frontend simultanément sur macOS
# Ce script doit être exécuté depuis la racine du projet pilates-core

# Obtenir le chemin du répertoire du script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "🚀 Lancement de l'écosystème Pilates..."

# 1. Lancer le Backend (Spring Boot) dans une nouvelle fenêtre Terminal
osascript -e "tell application \"Terminal\" to do script \"cd '$DIR/backend' && ./mvnw\""

# 2. Lancer le Frontend (React/Vite) dans une autre fenêtre Terminal
osascript -e "tell application \"Terminal\" to do script \"cd '$DIR/frontend' && npm run dev\""

echo "✅ Terminaux ouverts ! Le Backend et le Frontend sont en cours de démarrage."
