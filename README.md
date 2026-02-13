# CORE Pilates - Système de Réservation

Une plateforme de gestion de réservation premium et moderne pour les studios de Pilates. Ce projet est un **monorepo** contenant à la fois le backend réactif Spring Boot et le frontend moderne en React.

---

## 🏗 Architecture du Projet

Ce projet suit une structure **Monorepo** :

- **/frontend** : Une application React haute performance propulsée par Vite et TypeScript.
- **/backend** : Une application Spring Boot réactive utilisant R2DBC et PostgreSQL, construite avec le framework JHipster.

---

## 🚀 Stack Technique

### Frontend
- **Framework** : [React 19](https://react.dev/)
- **Outil de Build** : [Vite](https://vitejs.dev/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Routage** : [React Router 7](https://reactrouter.com/)
- **Client API** : [Axios](https://axios-http.com/)

### Backend
- **Framework** : [Spring Boot 3.4.5](https://spring.io/projects/spring-boot)
- **Infrastructure** : [JHipster 8.11.0](https://www.jhipster.tech/)
- **Persistance** : PostgreSQL avec [Spring Data R2DBC](https://spring.io/projects/spring-data-r2dbc) (Réactif)
- **Migrations BDD** : [Liquibase](https://www.liquibase.org/)
- **Outil de Build** : [Maven](https://maven.apache.org/)
- **Version Java** : 17

---

## 🛠 Guide de Démarrage

### Prérequis
- **Node.js** : v22.15.0 ou supérieur
- **Java** : JDK 17
- **Docker** : Recommandé pour lancer la base de données PostgreSQL rapidement.

---

### 1. Démarrage Rapide (Script)

#### 🍎 macOS / 🐧 Linux
L'option la plus simple pour lancer le frontend et le backend simultanément :
```bash
./start-all.sh
```
*Cela ouvrira deux fenêtres de terminal séparées pour le back et le front.*

#### 🪟 Windows
Il n'y a pas de script automatique, veuillez suivre la méthode manuelle ci-dessous.

---

### 2. Démarrage Manuel

#### Étape 1 : Lancer la Base de Données (Optionnel si vous avez une BDD locale)
Si vous utilisez Docker :
```bash
cd backend
docker-compose -f src/main/docker/postgresql.yml up -d
```

#### Étape 2 : Lancer le Backend

**🍎 macOS / 🐧 Linux**
```bash
cd backend
./mvnw spring-boot:run
```

**🪟 Windows (Command Prompt)**
```cmd
cd backend
mvnw spring-boot:run
```
*Ou si vous n'avez pas mvnw configuré :*
```cmd
mvn spring-boot:run
```

#### Étape 3 : Lancer le Frontend

**🍎 macOS / 🐧 Linux**
```bash
cd frontend
npm install  # (seulement la première fois)
npm run dev
```

**🪟 Windows (Powershell / cmd)**
```cmd
cd frontend
npm install
npm run dev
```

---

## 👤 Comptes de Test

Une fois l'application lancée, vous pouvez vous connecter avec les identifiants suivants :

| Rôle | Login | Mot de passe |
|------|-------|--------------|
| **Admin** | `admin` | `admin` |
| **Utilisateur** | `user` | `user` |

> **Note** : L'inscription est également fonctionnelle pour créer de nouveaux comptes utilisateurs.

---

## 🎨 Fonctionnalités Principales

- **Interface Premium** : Design soigné inspiré du glassmorphism pour une expérience utilisateur haut de gamme.
- **Gestion des Réservations** : Planning interactif, système de crédits, et gestion des annulations (règle des 24h).
- **Backend Réactif** : Architecture API non-bloquante pour des performances optimales.
- **Authentification Sécurisée** : Gestion des rôles (Admin/User) et protection des endpoints.
- **Pages Légales** : CGV, Mentions Légales et Politique de Cookies intégrées.

---

## 📝 Licence

Ce projet est privé et destiné à un usage interne pour CORE Pilates.
