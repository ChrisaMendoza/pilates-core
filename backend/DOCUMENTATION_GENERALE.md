# Fiche Technique & Explication Backend - Projet Pilates

Ce document est conçu pour te donner toutes les clés pour présenter le backend de ton projet, même si ton expertise est principalement frontend ou si le code a été généré.

## 1. Carte d'Identité Technique (La "Tech Stack")

C'est la première chose que le prof va regarder. Voici les technologies utilisées :

*   **Langage** : Java (vers. 17). Standard robuste de l'industrie.
*   **Framework Principal** : **Spring Boot** (vers. 3.4.5). Le framework Java n°1 pour le web.
*   **Type d'Architecture** : **Monolithe Modulaire**. Le frontend (Angular) et le backend sont dans le même projet pour simplifier le déploiement, mais le backend est bien séparé logiquement.
*   **Particularité Majeure** : **Stack Réactive (WebFlux)**. Contrairement aux applis classiques "bloquantes", ton backend est asynchrone et non-bloquant. C'est très moderne et performant pour gérer beaucoup de connexions simultanées.
*   **Base de Données** : **PostgreSQL**. Une base de données relationnelle puissante et open-source.
*   **Accès aux Données** : **Spring Data R2DBC**. C'est la version "Réactive" de JPA/Hibernate. Elle permet de parler à la base de données de manière asynchrone.
*   **Gestion de Version BDD** : **Liquibase**. Permet de suivre les modifications de la structure de la base de données (ajout de tables, colonnes) comme du code.
*   **Générateur** : **JHipster** (vers. 8.11.0). Outil qui génère une structure de projet avec les meilleures pratiques de l'industrie (sécurité, tests, configuration).

---

## 2. Architecture Logicielle (Comment ça marche ?)

Ton backend est organisé en **couches**. Chaque couche a une responsabilité unique.

```mermaid
graph TD
    Client[Client (Frontend Angular)] -->|Requête HTTP REST| Controller[Controller / Resource]
    Controller -->|Appel Méthode| Service[Service Layer]
    Service -->|Appel Méthode| Repository[Repository Layer]
    Repository -->|SQL R2DBC| DB[(PostgreSQL Database)]

    subgraph Backend [Backend Spring Boot]
    Controller
    Service
    Repository
    end
```

### Détail des Couches :

1.  **Web / Resource (`com.pilates.booking.web.rest`)**
    *   **Rôle** : C'est la porte d'entrée. Reçoit les requêtes HTTP (GET, POST, PUT, DELETE) du frontend.
    *   **Fichiers** : `EventResource.java`, `UserResource.java`.
    *   **Concept Clé** : Retourne des objets `Mono<T>` (0 ou 1 résultat) ou `Flux<T>` (0 à N résultats). C'est la signature du code Réactif.
    
2.  **Service (`com.pilates.booking.service`)**
    *   **Rôle** : Contient la "Logique Métier". C'est ici qu'on met les règles (ex: vérifier qu'un cours n'est pas plein avant d'inscrire quelqu'un).
    *   **Fichiers** : `EventService.java` (Interface) et `EventServiceImpl.java` (Implémentation).
    *   **Note** : Souvent, il fait juste "passe-plat" vers le Repository si la logique est simple.

3.  **Repository (`com.pilates.booking.repository`)**
    *   **Rôle** : Parle à la base de données. Il contient les méthodes comme `save`, `findAll`, `findById`.
    *   **Fichiers** : `EventRepository.java`.
    *   **Technologie** : Utilise Spring Data R2DBC pour générer automatiquement les requêtes SQL.

4.  **Domain (`com.pilates.booking.domain`)**
    *   **Rôle** : Définit les objets de ton application (les Tables de la BDD).
    *   **Fichiers** : `Event.java`, `Booking.java`, `User.java`.
    *   **Annotations** : `@Table` (mappe la classe à une table BDD), `@Id` (clé primaire).

---

## 3. Le Modèle de Données (Tes Entités)

Voici les objets principaux que tu manipules :

*   **User** : L'utilisateur (client ou admin). Contient `email`, `nom`, `prenom`.
*   **Event** : Un cours planifié (ex: "Pilates Reformer le Lundi à 18h"). A une `capacity` (nb places), `startAt`, `endAt`.
*   **Booking** : Une réservation. Lie un `User` à un `Event`.
*   **Studio** : Le lieu physique.
*   **Pack / Subscription** : Pour gérer les paiements (non visible en détail dans les fichiers analysés mais présent dans le JDL).

---

## 4. Points Clés pour la Démo (Ce qu'il faut dire)

Si le prof te pose des questions, voici des réponses qui montrent que tu maîtrises ton sujet :

**Q: Pourquoi avoir utilisé JHipster ?**
> "Nous voulions une base solide et respectant les standards de l'industrie (Sécurité, Architecture en couches, Tests). JHipster nous a permis de générer cette structure rapidement pour nous concentrer sur la logique métier spécifique au Pilates (les réservations, le planning)."

**Q: C'est quoi "Reactive" / WebFlux ? Pourquoi pas le Spring classique ?**
> "C'est une architecture non-bloquante. Contrairement au modèle classique où chaque requête bloque un thread du serveur, ici tout est asynchrone. Cela permet de gérer beaucoup plus d'utilisateurs simultanés avec moins de ressources serveur. C'est l'avenir des applications Java haute performance."

**Q: Comment gérez-vous les mises à jour de la base de données ?**
> "Nous utilisons **Liquibase**. C'est un outil de 'version control' pour la base de données. Chaque modification de table est écrite dans un fichier XML/Changelog, ce qui permet à toute l'équipe d'avoir la même version de la base, et de déployer en production sans risque."

**Q: Comment est gérée la sécurité ?**
> "Via Spring Security. L'architecture est 'Stateless' (sans état), utilisant probablement des tokens JWT (JSON Web Tokens) pour l'authentification. Le frontend envoie le token à chaque requête."

## 5. Où trouver le code ?

Si tu dois montrer du code, va ici :
*   **Les API (Controllers)** : `src/main/java/com/pilates/booking/web/rest/` (ex: `EventResource.java`)
*   **Les Objets (Domain)** : `src/main/java/com/pilates/booking/domain/`
*   **La Config BDD** : `src/main/resources/config/liquibase/master.xml`

---

**Résumé en une phrase pour l'intro :**
"Notre backend est une application **Spring Boot Réactive** générée avec **JHipster**, utilisant une base **PostgreSQL** et une architecture en couches claire pour garantir performance et maintenabilité."
