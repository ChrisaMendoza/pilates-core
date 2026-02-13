# Détail des "Programmes" (Fichiers) du Backend

Ce document détaille chaque composant clé de ton backend avec son emplacement exact.

> **Note :** Tous les chemins sont relatifs au dossier racine du backend (`backend/src/main/java/com/pilates/booking/`).

---

## 1. Gestion des Utilisateurs (User Management)
Module de gestion des comptes, inscription et sécurité.

### 📂 Dossier : `domain/`
*   **`User.java`**
    *   *Chemin* : `domain/User.java`
    *   *Rôle* : L'objet représentant un utilisateur en BDD (table `jhi_user`). Contient email, nom, mot de passe hashé.

### 📂 Dossier : `web/rest/`
*   **`UserResource.java`**
    *   *Chemin* : `web/rest/UserResource.java`
    *   *Rôle* : API CRUD pour l'administrateur (créer, modifier, supprimer des utilisateurs).
*   **`AccountResource.java`**
    *   *Chemin* : `web/rest/AccountResource.java`
    *   *Rôle* : API pour l'utilisateur connecté (s'inscrire `register`, voir son profil `account`, changer de mot de passe).

### 📂 Dossier : `service/`
*   **`UserService.java`**
    *   *Chemin* : `service/UserService.java`
    *   *Rôle* : Logique complexe (activation de compte, envoi d'email, gestion cache).

### 📂 Dossier : `repository/`
*   **`UserRepository.java`**
    *   *Chemin* : `repository/UserRepository.java`
    *   *Rôle* : Requêtes SQL R2DBC. Ex: `findOneByEmail`.

---

## 2. Gestion des Événements / Cours (Event Management)
Le cœur de l'application : le planning.

### 📂 Dossier : `domain/`
*   **`Event.java`**
    *   *Chemin* : `domain/Event.java`
    *   *Rôle* : L'objet "Cours" planifié (date, coach, capacité).

### 📂 Dossier : `web/rest/`
*   **`EventResource.java`**
    *   *Chemin* : `web/rest/EventResource.java`
    *   *Rôle* : API pour afficher le planning et gérer les événements.

### 📂 Dossier : `service/`
*   **`EventService.java`**
    *   *Chemin* : `service/EventService.java` (Interface)
    *   *Chemin* : `service/impl/EventServiceImpl.java` (Implémentation - à vérifier dans le dossier `impl`)
    *   *Rôle* : Règles métier liées aux cours.

### 📂 Dossier : `repository/`
*   **`EventRepository.java`**
    *   *Chemin* : `repository/EventRepository.java`
    *   *Rôle* : Requêtes pour trouver les cours (par studio, date, etc.).

---

## 3. Gestion des Réservations (Booking Management)
Lien entre `User` et `Event`.

### 📂 Dossier : `domain/`
*   **`Booking.java`**
    *   *Chemin* : `domain/Booking.java`
    *   *Rôle* : L'objet réservation avec son statut (`CONFIRMED`, `CANCELLED`).

### 📂 Dossier : `web/rest/`
*   **`BookingResource.java`**
    *   *Chemin* : `web/rest/BookingResource.java`
    *   *Rôle* : API pour réserver/annuler un cours.

### 📂 Dossier : `service/`
*   **`BookingService.java`**
    *   *Chemin* : `service/BookingService.java`
    *   *Rôle* : Vérifie la disponibilité et crée la réservation.

### 📂 Dossier : `repository/`
*   **`BookingRepository.java`**
    *   *Chemin* : `repository/BookingRepository.java`
    *   *Rôle* : Accès BDD pour les réservations.

---

## 4. Données de Référence
Les objets statiques ou de configuration.

### 📂 Dossier : `domain/`
*   **`Studio.java`** : `domain/Studio.java` (Le lieu).
*   **`ClassType.java`** : `domain/ClassType.java` ( Le type de cours).
*   **`Pack.java`** : `domain/Pack.java` (Les forfaits de crédits).

### 📂 Dossier : `web/rest/`
*   **`StudioResource.java`**, **`ClassTypeResource.java`**, **`PackResource.java`**.
    *   *Rôle* : APIs pour gérer ces données (CRUD).

---

## 5. Configuration & Infrastructure
Les fichiers qui font tourner le tout.

### 📂 Dossier : `security/` (`src/main/java/com/pilates/booking/security/`)
*   **`SecurityJwtConfiguration.java`** (Probable sur JHipster récent) ou **`SecurityConfiguration.java`**
    *   *Rôle* : Configure les accès (qui a le droit de faire quoi) et le token JWT.

### 📂 Dossier : `config/` (`src/main/java/com/pilates/booking/config/`)
*   **`DatabaseConfiguration.java`**
    *   *Rôle* : Configure la connexion PostgreSQL Reactive (R2DBC).
*   **`WebConfigurer.java`**
    *   *Rôle* : Config Cors et WebFlux.

### 📂 Dossier : `resources/config/liquibase/` (`src/main/resources/config/liquibase/`)
*   **`master.xml`**
    *   *Rôle* : Le chef d'orchestre de la base de données. Liste tous les changements à appliquer.
*   **`changelog/`** (Dossier)
    *   *Contenu* : Les fichiers XML individuels (ex: `..._added_entity_Event.xml`) qui créent les tables.

---

### Mémo pour trouver facilement :

*   Si tu cherches une **API** (URL) -> `web/rest/`
*   Si tu cherches la **Logique** -> `service/`
*   Si tu cherches la **Base de Données** (SQL) -> `repository/`
*   Si tu cherches les **Objets** -> `domain/`
