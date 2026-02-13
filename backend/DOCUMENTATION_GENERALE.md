# Documentation Générale du Backend - CORE Pilates

## 📚 Introduction

Ce document présente l'architecture et les choix techniques du backend de l'application CORE Pilates. Il est conçu pour expliquer **pourquoi** et **comment** nous avons construit une application performante, scalable et sécurisée.

---

## 1. 🏗 Architecture et Stack Technique

### Philosophie du Projet
Le backend est construit selon une architecture **Monolithe Modulaire** basée sur **Spring Boot**. Nous avons choisi une approche **Réactive** (Reactive Programming) pour garantir une haute performance sous forte charge.

### La Stack Technique ("Tech Stack")

| Composant | Technologie | Version | Pourquoi ce choix ? |
| :--- | :--- | :--- | :--- |
| **Langage** | Java | 17 LTS | Robustesse, typage fort, standard industriel. |
| **Framework** | Spring Boot | 3.4.5 | Facilité de configuration, écosystème riche. |
| **Paradigme** | **WebFlux / Reactor** | - | **Performance**. Gestion non-bloquante des requêtes (Asynchrone). |
| **Base de Données** | PostgreSQL | 16+ | Fiabilité, relationnel, support JSON. |
| **Accès Données** | Spring Data R2DBC | - | Driver **réactif** pour PostgreSQL (ne bloque pas les threads). |
| **Sécurité** | Spring Security | - | Authentification JWT Stateless (Sans état). |
| **Migrations** | Liquibase | - | Versionning du schéma de base de données (Infrastructure as Code). |
| **Build** | Maven | - | Gestion des dépendances standard Java. |

---

## 2. ⚡️ Pourquoi une Architecture "Réactive" ?

C'est le point fort de ce projet. Contrairement aux applications Java classiques (Spring MVC) qui utilisent un modèle "1 Thread par Requête", notre backend utilise **Spring WebFlux** (Netty).

### Comparaison :
*   **Classique (Bloquant)** : Si une requête doit attendre 200ms la base de données, le thread du serveur est bloqué pendant 200ms. Avec 1000 utilisateurs, le serveur s'écroule.
*   **Réactif (Non-Bloquant - Notre choix)** : Le thread lance la requête BDD et **se libère immédiatement** pour traiter une autre requête client. Quand la BDD répond, un thread reprend le travail.

✅ **Résultat** : Avec peu de ressources (CPU/RAM), on peut gérer des milliers de connexions simultanées (C'est le modèle utilisé par Netflix, Uber, etc.).

---

## 3. 🧩 Organisation du Code (Architecture en Couches)

Le code est structuré pour séparer les responsabilités :

```mermaid
graph TD
    Client[Client (Frontend)] -->|JSON / HTTP| Controller[Web / REST Layer]
    Controller -->|DTO| Service[Service Layer]
    Service -->|Entity| Repository[Repository Layer]
    Repository -->|SQL| Database[(PostgreSQL)]
```

1.  **Web / REST (`web.rest`)** : Reçoit la requête HTTP. Ne contient **aucune** logique métier. Valide juste les entrées.
2.  **Service (`service`)** : Le cerveau. Applique les règles métier (ex: "Un utilisateur ne peut pas réserver s'il n'a plus de crédits").
3.  **Repository (`repository`)** : Le data access. Parle à la base de données.
4.  **Domain (`domain`)** : Les objets purs (Les tables de la BDD).

---

## 4. 🔄 Workflow de Développement

### A. Gestion de la Base de Données (Liquibase)
Nous ne modifions jamais la base de données à la main.
1.  On crée un fichier XML (Changelog) décrivant le changement (ex: `createTable`).
2.  Au démarrage, l'application applique automatiquement les changements manquants.
3.  Cela garantit que **Production** et **Développement** sont toujours synchronisés.

### B. Sécurité (JWT)
L'API est "Stateless" (Sans état).
1.  L'utilisateur se connecte (`/api/authenticate`).
2.  Le serveur vérifie le mot de passe et génère un **Token JWT** signé cryptographiquement.
3.  Le frontend stocke ce token et l'envoie dans le header `Authorization: Bearer <token>` de chaque requête suivante.
4.  Le serveur vérifie la signature du token pour autoriser l'accès.

---

## 5. 🗣 Points Clés pour la Démo

Si on vous demande de "vendre" la partie technique :

1.  **Performance** : "Nous avons choisi l'approche Réactive avec Spring WebFlux et R2DBC. Cela nous permet de gérer une charge élevée avec une empreinte mémoire minimale, en évitant le blocage des threads I/O."
2.  **Robustesse** : "Le typage fort de Java et l'architecture en couches stricte rendent le code maintenable et testable."
3.  **Modernité** : "L'utilisation de PostgreSQL avec R2DBC montre une maîtrise des standards modernes d'accès aux données en Java."
4.  **Sécurité** : "L'utilisation de JWT permet une architecture totalement découplée entre le frontend et le backend, facilitant le passage à l'échelle (Horizontal Scaling)."

---

## 6. Commandes Utiles

*   **Lancer l'app** : `./mvnw spring-boot:run`
*   **Lancer les tests** : `./mvnw verify`
*   **Nettoyer le projet** : `./mvnw clean`
