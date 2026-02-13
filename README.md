# 🧘‍♀️ CORE Pilates - Plateforme de Réservation Premium

Bienvenue sur le dépôt officiel de **CORE Pilates**, une application de gestion de studio de Pilates nouvelle génération. Ce projet est conçu pour offrir une expérience utilisateur fluide, réactive et haut de gamme, tant pour les clients que pour les administrateurs.

---

## 🌟 Vision du Projet

L'objectif de CORE Pilates est de moderniser la réservation de séances de sport en résolvant les problèmes courants des systèmes traditionnels :
*   **Concurrence** : Gestion des réservations simultanées sans surbooking grâce à une architecture non-bloquante.
*   **Performance** : Temps de réponse ultra-rapide (< 100ms).
*   **Expérience Client** : Interface intuitive, design "Glassmorphism" épuré et feedbacks immédiats.

---

## 🏗 Architecture & Stack Technique

Ce projet est un **Monorepo** structuré pour séparer clairement les responsabilités tout en facilitant le développement local.

### 🎨 Frontend (`/frontend`)
Une Single Page Application (SPA) moderne et typée.
*   **Framework** : [React 19](https://react.dev/)
*   **Langage** : [TypeScript](https://www.typescriptlang.org/) (Strict mode)
*   **Build & Dev Server** : [Vite](https://vitejs.dev/) (HMR instantané)
*   **État Global** : Context API & Hooks personnalisés (`useAuth`, etc.)
*   **Styles** : CSS Modules avec variables CSS (Design System complet)
*   **Communication** : [Axios](https://axios-http.com/) avec intercepteurs pour JWT

### ⚙️ Backend (`/backend`)
Une API RESTful réactive, robuste et sécurisée.
*   **Core** : [Java 17](https://openjdk.org/projects/jdk/17/) & [Spring Boot 3.4.5](https://spring.io/projects/spring-boot)
*   **Paradigme** : Programmation Réactive avec [Spring WebFlux](https://docs.spring.io/spring-framework/reference/web/webflux.html) (Project Reactor)
*   **Base de Données** : [PostgreSQL](https://www.postgresql.org/) avec pilote R2DBC (Reactive Relational Database Connectivity)
*   **Versioning BDD** : [Liquibase](https://www.liquibase.org/) pour les migrations de schéma
*   **Sécurité** : Spring Security & JWT (JSON Web Tokens) stateless
*   **Outil de Build** : Maven

---

## 🚀 Fonctionnalités Clés

### Pôle Client
*   **🔐 Authentification Hybride** : Connexion/Inscription sécurisée, gestion de session JWT persistante.
*   **📅 Planning Interactif** : Vue calendrier dynamique, filtres par coach/niveau, indicateurs de disponibilité ("Il reste 2 places", "COMPLET").
*   **💳 Système de Crédits** : Achat de packs ou abonnements, débit automatique à la réservation.
*   **👤 Espace Membre** : Historique des cours, gestion de profil, upload d'avatar.
*   **⚡ Réservation & Annulation** : Action instantanée avec règle métier (remboursement si annulation > 24h).

### Pôle Administration
*   **👥 Gestion des Utilisateurs** : Liste complète, activation/désactivation de comptes, suppression (GDPR).
*   **📊 Tableau de Bord** : (À venir) Statistiques d'occupation.
*   **🛠 Configuration du Studio** : Gestion des salles et des équipements.

---

## 🛠 Guide d'Installation & Démarrage

### Prérequis
Assurez-vous d'avoir installé :
*   **Java JDK 17**
*   **Node.js** (v18 ou supérieur)
*   **Docker Desktop** (pour la base de données)

### 1. Clonage du Projet
```bash
git clone https://github.com/votre-repo/pilates-core.git
cd pilates-core
```

### 2. Démarrage Rapide (Script Automatisé)
Pour macOS et Linux, un script lance tout l'environnement en une commande :
```bash
./start-all.sh
```
*Ce script lance le conteneur Docker PostgreSQL, le Backend (Spring Boot) et le Frontend (Vite) dans des terminaux séparés.*

---

### 3. Démarrage Manuel (Pas à pas)

#### A. Base de Données
Lancez PostgreSQL via Docker Compose :
```bash
cd backend
docker-compose -f src/main/docker/postgresql.yml up -d
```

#### B. Backend (API)
Dans un nouveau terminal :
```bash
cd backend
./mvnw spring-boot:run
```
*Le serveur démarrera sur http://localhost:8080*

#### C. Frontend (Client)
Dans un autre terminal :
```bash
cd frontend
npm install  # Première fois uniquement
npm run dev
```
*L'application sera accessible sur http://localhost:5173*

---

## 📚 Documentation API (Swagger)

Le backend expose une documentation OpenAPI v3 interactive (Swagger UI).
Une fois le backend lancé, accédez à :

👉 **http://localhost:8080/webflux/swagger-ui.html**

Vous pourrez y tester tous les endpoints (Auth, Booking, Event...) directement depuis votre navigateur.

---

## 🧪 Tests & Qualité

### Backend
Exécuter les tests unitaires et d'intégration :
```bash
cd backend
./mvnw test
```

### Frontend
Linter le code pour vérifier la qualité TypeScript :
```bash
cd frontend
npm run lint
```

---

## 📂 Structure du Projet

```
pilates-core/
├── backend/                 # API Spring Boot
│   ├── src/main/java/       # Code source Java (Controllers, Services...)
│   ├── src/main/resources/  # Config (application.yml), Liquibase, Templates mails
│   └── pom.xml              # Dépendances Maven
├── frontend/                # Application React
│   ├── src/
│   │   ├── api/             # Appels HTTP (Axios)
│   │   ├── assets/          # Images, Fontes
│   │   ├── auth/            # Context d'authentification
│   │   ├── components/      # Composants réutilisables (Navbar, Footer...)
│   │   ├── pages/           # Pages principales (Planning, Login...)
│   │   └── types/           # Définitions TypeScript
│   └── package.json         # Dépendances Node
└── README.md                # Ce fichier
```

---

## 👤 Auteurs

Projet développé par **Chrisa Mendoza**.
*Étudiant en développement Fullstack - Projet de fin d'année.*

© 2026 CORE Pilates. Tous droits réservés.
