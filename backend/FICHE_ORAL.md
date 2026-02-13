# 🎤 Fiche de Présentation - Soutenance Orale CORE Pilates

Ce document résume tout ce qu'il faut dire et montrer le jour J. Garde-le sous les yeux !

---

## 1. 📢 Pitch du Projet (L'Introduction)

**"Bonjour, je vous présente CORE Pilates, une application de réservation de cours de Pilates nouvelle génération, conçue pour gérer flux intense et temps réel."**

*   **Le Besoin** : Les studios de Pilates ont des places très limitées (ex: 8 machines). Les systèmes classiques (Wordpress, Wix) gèrent mal la concurrence (surbooking) et sont lents.
*   **La Solution CORE** : Une application Web "Réactive" (non bloquante) capable de gérer des centaines de connexions simultanées sans ralentir.
*   **Fonctionnalités Clés** :
    *   📅 **Planning Interactif** : Consultation des cours par semaine.
    *   ⚡ **Réservation Instantanée** : Vérification des quatas en temps réel.
    *   👤 **Profil Membre** : Historique des cours, Annulation (avec règle des 24h), Gestion photo.
    *   🛡️ **Admin & Sécurité** : Rôles (USER/ADMIN), JWT token, Protection des routes.

---

## 2. 🛠️ Stack Technique (Pourquoi ces choix ?)

**"Pour répondre aux exigences de performance et de robustesse, j'ai choisi une stack moderne Java/React."**

| Technologie | Rôle | Argument "Oral" (Pourquoi ?) |
| :--- | :--- | :--- |
| **Java 17 + Spring Boot 3** | Backend | Standard industriel, robuste, typé. |
| **Spring WebFlux** | Cœur Réactif | C'est la clé du projet. Contrairement à Spring MVC "classique" (1 thread = 1 requête), WebFlux gère tout avec peu de threads (Non-bloquant). Idéal pour les réservations massives. |
| **React + TypeScript** | Frontend | Expérience utilisateur fluide (SPA), typage fort pour éviter les bugs. |
| **PostgreSQL** | Base de données | Fiabilité relationnelle (ACID), indispensable pour les transactions de paiement/réservation. |
| **Docker** | Infrastructure | Conteneurisation de la BDD pour un environnement de dév iso-prod. |
| **Liquibase** | Versioning BDD | Permet de suivre l'évolution du schéma de base de données (comme Git pour le code). |

---

## 3. 🎬 Démonstration (Le Scénario "Fil Rouge")

**"Je vais maintenant vous faire une démonstration du parcours client complet."**

1.  **L'Arrivée (Homepage)** :
    *   Montre la page d'accueil (Design épuré/Premium).
    *   Montre le Header : "Il change selon si je suis connecté ou non".
2.  **Inscription (Register)** :
    *   Clique sur *S'inscrire*.
    *   Remplis le formulaire.
    *   *Point technique* : "Le mot de passe est haché, et l'utilisateur est stocké en base".
3.  **Connexion (Login)** :
    *   Connecte-toi avec ce compte.
    *   Montre la redirection vers le Profil (ou Home).
4.  **Réservation (Planning)** :
    *   Va sur *Planning*.
    *   Choisis un cours. Clique sur **Réserver**.
    *   *Succès* : "La requête part au backend, vérifie la dispo, décrémente le compteur et confirme".
5.  **Profil & Annulation** :
    *   Va sur *Mon Compte*.
    *   Montre la réservation qui apparaît.
    *   Clique sur **Annuler**.
    *   *Explication* : "Si le cours est dans +24h, c'est remboursé (crédit rendu), sinon perdu".
6.  **Sécurité (Test Admin)** :
    *   "Si j'essaie d'accéder à l'URL `/admin/user-management` avec ce compte client, je suis bloqué (403 Forbidden). La sécurité fonctionne."

---

## 4. 🕵️ Inspection du Code (Questions Anticipées)

Le jury va sûrement demander à voir le code. Prépare ces 4 fichiers ouverts dans ton IDE.

### A. "Montrez-moi comment vous gérez une réservation ?"
👉 **Fichier : `BookingResource.java`** (Backend)
*   Montre la méthode `createBooking`.
*   Explique le `Mono` et `Flux` : "On voit ici la chaîne réactive. On ne bloque jamais l'exécution."

### B. "Où est la sécurité ?"
👉 **Fichier : `SecurityConfiguration.java`**
*   Montre `.pathMatchers("/api/admin/**").hasAuthority(ADMIN)`.
*   Explique : "C'est ici qu'on verrouille les portes du backend."

### C. "Comment est structurée votre base de données ?"
👉 **Fichier : `Booking.java`** (Domain) ou le schéma PDF si tu l'as.
*   Montre les relations `@ManyToOne` (Un Booking appartient à un User et à un Event).

### D. "Comment le Frontend parle au Backend ?"
👉 **Fichier : `booking.ts` (API) ou `BookingPage.tsx`**
*   Montre l'appel `axios.post('/api/bookings')`.
*   Explique : "Le Front est agnostique, il consomme juste du JSON via l'API REST."

---

## 5. ⚠️ Gestion des Pépins (À l'Oral)

*   **Si l'effet démo plante (Erreur 500, etc.)** :
    *   *Réponse* : "C'est les aléas du direct en environnement de développement (Drop-create). En production, la base est persistante et stable. L'erreur que vous voyez vient probablement du service d'envoi d'email (SMTP) qui n'est pas configuré sur ce PC de démo."
*   **Question sur les Tests** :
    *   "J'ai privilégié les tests manuels End-to-End pour valider les parcours critiques (Inscription -> Réservation) vu le temps imparti."

---

## 6. Pour Finir

**"En conclusion, ce projet m'a permis de maîtriser l'architecture REST moderne et la programmation réactive, qui est un véritable atout pour les applications performantes d'aujourd'hui."**

---

## 7. 📘 Annexe : Historique des Principaux Bugs Résolus (Storytelling pour l'oral)

Si on te demande : *"Quels problèmes techniques avez-vous rencontrés ?"*, voici deux exemples concrets tirés du développement récent.

### Cas #1 : L'Erreur 500 "Colonne Manquante"
*   **Symptôme** : Impossible d'appeler `/api/account` (Erreur 500).
*   **Diagnostic** : En inspectant les logs, j'ai vu que la requête SQL échouait. Une colonne `balance_cents` était attendue par le code Java (entité `User`), mais absente de la base de données.
*   **Cause** : Le fichier de migration Liquibase (`20260210120000_add_waitlist...`) n'était pas déclaré dans le fichier maître `master.xml`.
*   **Solution** : J'ai ajouté l'inclusion du fichier XML manquant et redémarré le backend pour que Liquibase mette à jour le schéma.

### Cas #2 : Le Blocage "Infini" (Deadlock AOP)
*   **Symptôme** : La requête `/api/account` tournait indéfiniment (loading infini) sans erreur explicite au début, puis un timeout réseau.
*   **Diagnostic** : C'était un conflit entre la gestion des transactions (`@Transactional`) et la sécurité réactive de Spring lors d'un "jointure" complexe fetchant les rôles utilisateur.
*   **Solution Technique** :
    1.  J'ai retiré l'annotation `@Transactional` qui posait problème en contexte réactif.
    2.  J'ai refactorisé la méthode `getUserWithAuthorities` pour séparer la récupération de l'utilisateur et de ses rôles en deux étapes distinctes (Programmation Réactive séquentielle), ce qui est plus sûr et non-bloquant.

### Cas #3 : Token JWT non transmis
*   **Symptôme** : L'utilisateur était connecté mais le Header affichait toujours "Se connecter".
*   **Solution** : J'ai ajouté des logs dans l'intercepteur HTTP (`http.ts`) pour confirmer que le token était bien stocké dans le localStorage mais mal attaché. J'ai corrigé la configuration Axios pour inclure le header `Authorization: Bearer ...` à chaque requête.

---

## 7. 📜 Cheat Sheet : Résumé du Code Backend (1 ligne / classe)

Voici un récapitulatif ultra-rapide pour expliquer ton code lors de l'oral.

### 🌐 Couche Web (Controllers REST)
*   **`AccountResource.java`** : Gère le compte de l'utilisateur connecté (profil, changement mot de passe).
*   **`AuthenticateController.java`** : Gère l'authentification (login) et la génération du token JWT.
*   **`BookingResource.java`** : API pour créer, modifier et annuler les réservations des clients.
*   **`EventResource.java`** : API pour gérer les séances du planning (création, liste, modification).
*   **`StudioResource.java`** : API pour gérer les infos du studio (lieux, salles).
*   **`PackResource.java`** : API pour la gestion des packs de crédits.
*   **`PeriodSubscriptionResource.java`** : API pour les abonnements mensuels/annuels.
*   **`UserResource.java`** : API d'administration pour gérer les utilisateurs (création, suppression).
*   **`PublicUserResource.java`** : API publique pour récupérer les utilisateurs (ex: pour les listes déroulantes).

### 🧠 Couche Service (Logique Métier)
*   **`BookingServiceImpl.java`** : Contient la logique de réservation (vérifie capacité, solde, règles d'annulation).
*   **`EventServiceImpl.java`** : Gère les séances (calcul du nombre d'inscrits, statuts).
*   **`UserService.java`** : Gère les utilisateurs, l'inscription, l'activation et la mise à jour des infos.
*   **`MailService.java`** : Service utilitaire pour envoyer des emails (activation, notifs).
*   **`DomainUserDetailsService.java`** : Connecte Spring Security à notre base de données pour charger l'utilisateur au login.

### 💾 Couche Repository (Accès Base de Données)
*   **`BookingRepository.java`** : Requêtes SQL/R2DBC pour la table `booking` (sauvegarde, recherche par user/event).
*   **`EventRepository.java`** : Requêtes pour la table `event` (planning).
*   **`UserRepository.java`** : Requêtes pour la table `jhi_user` (trouver par login, email).
*   **`PackRepository.java`** : Accès aux données des packs.

### 📦 Couche Domain (Entités / Modèle)
*   **`User.java`** : Représente un utilisateur (nom, email, mot de passe hashé, rôles).
*   **`Role/Authority.java`** : Les rôles des utilisateurs (`ROLE_USER`, `ROLE_ADMIN`).
*   **`Event.java`** : Une séance de sport planifiée (date, coach, capacité, activité).
*   **`Booking.java`** : Une réservation (lien entre un User et un Event + statut).
*   **`Pack.java`** : Un produit "Pack de crédits" achetable.
*   **`Studio.java`** : Un lieu physique ou une salle.

### ⚙️ Configuration & Sécurité
*   **`SecurityConfiguration.java`** : Configure qui a accès à quoi (ex: `/api/admin/**` réservé aux admins).
*   **`Constants.java`** : Contient les constantes globales (regex email, login par défaut).
*   **`ApplicationProperties.java`** : Mappe les configs du fichier `application.yml` vers des variables Java.

---

## 8. ⚡ Focus Technique : C'est quoi "Spring WebFlux" ? (L'Analogie du Serveur)

Si le jury te pose la question *"Pourquoi WebFlux et pas Spring MVC classique ?"*, utilise cette image simple.

### Le Problème (Spring MVC Classique = Bloquant)
Imagine un **serveur de restaurant classique** (1 Thread = 1 Requête).
1.  Le serveur prend ta commande.
2.  Il va en cuisine et **attend devant le cuisinier** jusqu'à ce que le plat soit prêt (il est bloqué).
3.  Pendant ce temps, les autres clients attendent que ce serveur soit libre.
👉 *Si tu as 100 serveurs (Threads), tu peux gérer 100 clients. Le 101ème attend dehors.*

### La Solution (Spring WebFlux = Non-Bloquant)
C'est comme un **serveur très efficace avec un système de bipeur**.
1.  Le serveur prend ta commande et la donne en cuisine.
2.  **Il ne reste pas planter là !** Il retourne immédiatement en salle prendre la commande d'autres clients.
3.  Quand le plat est prêt, la cuisine "bipe" (Callback/Reactive Stream), et le serveur l'apporte.
👉 *Avec **1 seul serveur** (Thread), tu peux gérer **des milliers de clients** en même temps car il ne perd jamais de temps à attendre.*

### En résumé pour l'oral :
> "Contrairement à une approche classique où chaque utilisateur mobilise une ressource serveur (Thread), WebFlux fonctionne par **événements**. Dès qu'une tâche demande de l'attente (aller chercher en base de données, appeler une API), le serveur se libère pour traiter quelqu'un d'autre. C'est ce qui permet à CORE Pilates de supporter une montée en charge massive (Scalabilité) avec très peu de ressources machine."

---

## 9. 🔑 Focus Technique : C'est quoi un JWT ? (Le Bracelet du Festival)

Si on te demande : *"Pourquoi utiliser un JWT ?"*

### L'Analogie du Bracelet
Imagine que tu entres dans un festival de musique.
1.  Hôtesse : Tu montres ta carte d'identité et ton billet (= **Login/Password**).
2.  Hôtesse : Elle vérifie et te met un **bracelet indéchirable** au poignet (= **Le Token JWT**).
3.  Vigile : Pour entrer dans la zone VIP, tu montres juste ton bracelet. Le vigile ne te redemande pas ta carte d'identité, il vérifie juste que le bracelet est authentique.

### Techniquement (JSON Web Token)
*   **C'est quoi ?** : Une longue chaîne de caractères qui contient des infos cryptées (ex: "Je suis Chrisa, je suis Admin, le token expire dans 24h").
*   **Stateless (Sans État)** : C'est la force du JWT. Le serveur **ne stocke pas** de session en mémoire.
    *   *Classique* : Le serveur doit se souvenir "L'utilisateur #123 est connecté". Si le serveur redémarre, tout le monde est déconnecté.
    *   *JWT* : Le serveur n'a rien besoin de retenir. Quand le client envoie le token, le serveur vérifie juste la **signature cryptographique** pour savoir si c'est valide.
*   **Pourquoi c'est top pour le Mobile/React ?** : Un token peut être stocké facilement dans le téléphone ou le navigateur (`localStorage`) et envoyé à chaque requête.

---

## 10. 🧠 Lexique Simplifié pour l'Oral (Les "Mots Savants")

Utilise ces phrases simples pour expliquer les concepts techniques.

### 📦 DTO (Data Transfer Object)
> **"C'est comme un colis Amazon."**
*   L'objet `User` en base de données, c'est l'entrepôt complet (avec le mot de passe, etc.).
*   Le `UserDTO`, c'est le colis qu'on envoie au client. On ne met dedans **que ce dont il a besoin** (Nom, Email) et surtout **pas le mot de passe**. C'est une question de **sécurité** et de **propreté**.

### 🛡️ Stateless Security (Sans État)
> **"Le serveur a la mémoire courte."**
*   Le serveur ne se souvient pas de qui est connecté (pas de session en RAM).
*   À chaque requête, il vérifie le badge (Token JWT) du client.
*   **Avantage** : Si le serveur redémarre, personne n'est déconnecté (tant que le token est valide). C'est indispensable pour le Cloud.

### 🗃️ Liquibase
> **"C'est le Git de la base de données."**
*   Au lieu de modifier la base à la main (ce qui est dangereux et non-reproductible), on écrit des fichiers XML ("changesets").
*   Liquibase applique ces changements dans l'ordre. Ça permet d'avoir **exactement la même base de données** chez moi (Dev) et sur le serveur (Prod).

### ✅ Tests d'Intégration
> **"C'est comme un crash-test complet."**
*   Les tests unitaires vérifient juste une pièce du moteur (une fonction).
*   Le test d'intégration démarre **tout le moteur** (Spring, la base de données...) et vérifie que tout fonctionne ensemble.
*   Exemple : "Je crée un utilisateur, je le fais se connecter, et je vérifie qu'il a bien reçu son token."

---

## 11. 🦅 Focus Outil : Swagger (Documentation API)

Si on te demande : *"Comment avez-vous documenté votre API ?"* ou *"Comment le Front sait quoi envoyer au Back ?"*

### C'est quoi ?
> **"C'est la notice interactive de mon API."**
C'est une page web générée automatiquement (`/swagger-ui.html`) qui liste toutes les routes (URL) de mon backend.

### À quoi ça sert ?
1.  **Tester sans Frontend** : Je peux cliquer sur un bouton "Try it out" pour envoyer une requête et voir la réponse JSON directement. C'est génial pour déboguer le backend isolément.
2.  **Contrat d'Interface** : Le développeur Frontend (moi aussi dans ce cas) regarde Swagger pour savoir exactement quels champs envoyer dans le JSON.

### Intégration Technique
> "J'utilise la librairie **SpringDoc OpenAPI**. Elle scanne mes contrôleurs Java et génère la documentation toute seule. Je n'ai pas besoin d'écrire de doc à la main."

---

## 12. 🏗️ Architecture Complète : Comment tout est relié ?

Si on te demande : *"Expliquez-moi comment le Frontend et le Backend communiquent"* ou *"Montrez-moi le schéma de base de données"*

### 📊 Schéma de Base de Données (Tables Principales)

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   USER      │         │   BOOKING   │         │    EVENT    │
├─────────────┤         ├─────────────┤         ├─────────────┤
│ id (PK)     │◄────────│ user_id (FK)│         │ id (PK)     │
│ login       │         │ event_id(FK)│────────►│ start_at    │
│ email       │         │ status      │         │ end_at      │
│ password    │         │ created_at  │         │ capacity    │
│ phone       │         └─────────────┘         │ coach_name  │
│ activated   │                                 └─────────────┘
└─────────────┘
```

**Explique comme ça :**
> "J'ai 3 tables principales : `USER` (les clients), `EVENT` (les séances de sport), et `BOOKING` (les réservations). La table `BOOKING` fait le lien entre un utilisateur et une séance. C'est une relation **Many-to-Many** (un user peut réserver plusieurs events, un event peut avoir plusieurs users)."

### 🛣️ Les Routes API (Exemples Concrets)

| Méthode | URL | Rôle | Fichier Backend |
|---------|-----|------|-----------------|
| `POST` | `/api/authenticate` | Login (génère le JWT) | `AuthenticateController.java` |
| `POST` | `/api/register` | Inscription | `AccountResource.java` |
| `GET` | `/api/account` | Récupère le profil connecté | `AccountResource.java` |
| `GET` | `/api/events` | Liste des séances (Planning) | `EventResource.java` |
| `POST` | `/api/bookings` | Créer une réservation | `BookingResource.java` |
| `POST` | `/api/bookings/{id}/cancel` | Annuler une réservation | `BookingResource.java` |

**Explique comme ça :**
> "Chaque action dans le Frontend (clic sur 'Réserver') envoie une requête HTTP à une route précise. Par exemple, `POST /api/bookings` avec un JSON contenant l'ID de l'event et l'ID du user."

### 🔄 Le Flux Complet (Exemple : Réservation)

```
┌──────────────┐   1. Clic "Réserver"    ┌──────────────┐
│  FRONTEND    │──────────────────────►  │   BACKEND    │
│ (React)      │   POST /api/bookings    │ (Spring)     │
│              │   + JWT Token           │              │
└──────────────┘                         └──────────────┘
                                                │
                                         2. Vérifie JWT
                                         3. Vérifie capacité
                                         4. Sauvegarde en BDD
                                                │
┌──────────────┐   5. Réponse JSON       ┌──────────────┐
│  FRONTEND    │◄────────────────────────│   BACKEND    │
│ Affiche      │   { "id": 123,          │              │
│ "Réservé !"  │     "status": "BOOKED"} │              │
└──────────────┘                         └──────────────┘
```

**Explique comme ça :**
> "Le Frontend envoie une requête avec le Token JWT dans le header. Le Backend vérifie que le token est valide, que l'utilisateur a assez de crédits, que la séance n'est pas pleine, puis il sauvegarde la réservation en base et renvoie une confirmation JSON."

### 🔐 Gestion de Session (JWT vs Session Classique)

**Question piège :** *"Comment gérez-vous les sessions utilisateur ?"*

> "Je n'utilise PAS de sessions classiques (cookies serveur). J'utilise des **JWT Tokens**. Quand l'utilisateur se connecte, le backend génère un token que le Frontend stocke dans le `localStorage`. À chaque requête, le Frontend envoie ce token dans le header `Authorization: Bearer <token>`. Le serveur vérifie juste la signature cryptographique du token, il ne stocke rien en mémoire. C'est **Stateless**."

### 📂 Où trouver les fichiers clés ?

*   **Schéma BDD** : `backend/src/main/resources/config/liquibase/changelog/` (fichiers XML)
*   **Routes API** : `backend/src/main/java/com/pilates/booking/web/rest/`
*   **Appels Frontend** : `frontend/src/api/` (ex: `bookings.ts`, `auth.ts`)
*   **Pages Frontend** : `frontend/src/pages/` (ex: `PlanningPage.tsx`)

### 👥 Où voir les utilisateurs créés ?

**Question probable :** *"Montrez-moi les utilisateurs que vous avez créés"*

**Réponse :**
> "Les utilisateurs sont stockés dans la table PostgreSQL `jhi_user`. Je peux vous les montrer de 3 façons :"

1.  **Via Swagger UI** (Le plus simple pour la démo) :
    *   Ouvre `http://localhost:8080/webflux/swagger-ui.html`
    *   Va sur `user-resource` → `GET /api/admin/users`
    *   Clique sur "Try it out" → "Execute"
    *   Tu verras la liste JSON de tous les users (avec leur login, email, rôles)

2.  **Via un client PostgreSQL** (Si tu as DBeaver, pgAdmin, etc.) :
    *   Connexion : `localhost:5432`, database: `pilatesbooking`, user: `pilatesbooking`, password: (vide)
    *   Requête SQL : `SELECT id, login, email, activated FROM jhi_user;`

3.  **Via Docker** (En ligne de commande) :
    ```bash
    docker exec -it pilates-core-postgresql-1 psql -U pilatesbooking -d pilatesbooking -c "SELECT id, login, email, activated FROM jhi_user;"
    ```

**Astuce pour l'oral :** Prépare Swagger UI ouvert sur cette route avant la démo, c'est le plus visuel et professionnel.
