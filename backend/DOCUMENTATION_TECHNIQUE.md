# Documentation Technique Détaillée - CORE Pilates

## 🎯 Objectif
Ce document est destiné aux développeurs. Il plonge dans le code source, explique les patterns utilisés et fournit des exemples concrets pour comprendre la puissance de la stack **Réactive**.

---

## 1. 📂 Structure du Code (Où chercher ?)

Tous le code source Java se trouve dans : `src/main/java/com/pilates/booking/`

| Package | Contenu | Exemple de fichier |
| :--- | :--- | :--- |
| `config` | Configuration de Spring (BDD, Sécurité, WebFlux). | `SecurityConfiguration.java` |
| `domain` | Les Entités JPA (Tables BDD). | `User.java`, `Event.java` |
| `repository` | Interfaces d'accès aux données (R2DBC). | `UserRepository.java` |
| `service` | Logique Métier. | `UserService.java` |
| `web.rest` | Controllers API (Endpoints HTTP). | `UserResource.java` |
| `security` | Gestion de l'authentification. | `DomainUserDetailsService.java` |

---

## 2. 💻 Exemples de Code & Patterns (La "Performance")

L'application utilise le paradigme **Réactif**. Voici comment lire et comprendre le code.

### A. Le Repository Réactif (Spring Data R2DBC)
Au lieu de retourner une `List<User>`, on retourne un `Flux<User>` (Flux de données) ou un `Mono<User>` (0 ou 1 donnée).

**Fichier :** `repository/UserRepository.java`

```java
@Repository
public interface UserRepository extends ReactiveCrudRepository<User, Long> {

    // 🚀 Performance :
    // Cette méthode ne bloque pas. Elle retourne une "Promesse" (Mono)
    // que la donnée arrivera plus tard.
    Mono<User> findOneByEmailIgnoreCase(String email);

    Mono<User> findOneByLogin(String login);
    
    // Flux = Stream de plusieurs éléments
    Flux<User> findAllByActivatedIsTrue();
}
```

### B. Le Service Réactif (Chaining d'opérations)
Dans le monde réactif, on "enchaîne" les opérations comme un pipeline de traitement.

**Exemple : Créer une réservation (Logique simplifiée)**

```java
public Mono<BookingDTO> createBooking(BookingDTO bookingDTO) {
    return bookingRepository.findByEventId(bookingDTO.getEventId())
        // 1. Compter les inscrits existants
        .count()
        // 2. Vérifier la capacité (Logique Métier)
        .flatMap(currentCount -> {
            if (currentCount >= 20) {
                return Mono.error(new EventFullException()); // ❌ Erreur si plein
            }
            // 3. Sinon, on sauvegarde
            Booking booking = bookingMapper.toEntity(bookingDTO);
            return bookingRepository.save(booking);
        })
        // 4. On convertit le résultat en DTO pour le frontend
        .map(bookingMapper::toDto);
}
```

> **💡 Pourquoi c'est performant ?**
> Entre l'étape 1 et 2, si la base de données met 50ms à répondre, le thread CPU est libéré pour traiter la requête d'un autre utilisateur. Aucun temps d'attente CPU.

### C. Le Controller REST (Endpoint)
Les controllers reçoivent et retournent des types réactifs.

**Fichier :** `web/rest/UserResource.java`

```java
@GetMapping("/users/{login}")
public Mono<ResponseEntity<UserDTO>> getUser(@PathVariable String login) {
    return userService.getUserWithAuthoritiesByLogin(login) // Retourne Mono<User>
        .map(UserDTO::new)  // Transforme User -> UserDTO
        .map(userDTO -> ResponseEntity.ok().body(userDTO)) // Enveloppe dans HTTP 200 OK
        .defaultIfEmpty(ResponseEntity.notFound().build()); // Si vide -> HTTP 404 Not Found
}
```

---

## 3. 🛡 Gestion des Erreurs (Global Exception Handling)

Nous ne faisons pas de `try-catch` partout. Nous utilisons un **`@ControllerAdvice`** qui intercepte toutes les erreurs et renvoie une réponse JSON propre.

**Exemple de réponse d'erreur (JSON) :**
```json
{
  "type": "https://www.jhipster.tech/problem/email-already-used",
  "title": "Email already used",
  "status": 409,
  "detail": "Cet email est déjà associé à un compte."
}
```

**Code Java (`web/rest/errors/ExceptionTranslator.java`) :**
```java
@ExceptionHandler
public Mono<ResponseEntity<Problem>> handleEmailAlreadyUsedException(EmailAlreadyUsedException ex, ServerWebExchange request) {
    Problem problem = Problem.builder()
        .withStatus(Status.CONFLICT) // HTTP 409
        .withTitle("Email already used")
        .build();
    return create(ex, problem, request);
}
```

---

## 4. 🗄 Modèle de Données (Schema)

Les entités suivent une structure relationnelle classique mais optimisée.

### Entité User (`domain/User.java`)
*   `id` (PK)
*   `login` (Unique, Indexé pour la rapidité de recherche)
*   `password_hash` (Jamais retourné au frontend)
*   `first_name`, `last_name`, `email`
*   `activated` (Boolean)

### Entité Event (`domain/Event.java`)
*   `id` (PK)
*   `start_at` (Timestamp)
*   `end_at` (Timestamp)
*   `coach_name`
*   **Relations** : Lié à `Studio` et `ClassType`.

---

## 5. 🚀 Meilleures Pratiques Appliquées

1.  **DTO Pattern** : Nous n'exposons jamais les entités (`User`, `Event`) directement au frontend. Nous utilisons des **DTO** (Data Transfer Objects) pour filtrer les données (ex: ne jamais envoyer le mot de passe).
2.  **Stateless Security** : Pas de session serveur. Tout passe par le Token JWT.
3.  **Liquibase** : Tout changement de BDD est versionné.
4.  **Tests d'Intégration** : Le projet contient des tests qui lancent un vrai contexte Spring pour valider que tout fonctionne ensemble.

---

## 6. 🧠 Comprendre le "Réactif" (Simple & Clair)

C'est LE point fort technique du projet. Mais qu'est-ce que ça veut dire ?

**Imaginez un restaurant :**

*   **Approche Classique (Bloquante)** :
    *   Le serveur prend votre commande.
    *   Il va en cuisine et **attend planté devant le chef** jusqu'à ce que le plat soit prêt.
    *   Pendant ce temps, **il ne sert personne d'autre**.
    *   *Résultat* : Il faut 100 serveurs pour 100 clients. C'est lent et coûteux.

*   **Approche Réactive (Non-Bloquante - Notre Projet)** :
    *   Le serveur prend votre commande et la donne en cuisine.
    *   **Immédiatement**, il retourne en salle prendre la commande d'une autre table.
    *   Quand votre plat est prêt, le chef sonne, et le serveur vous l'apporte.
    *   *Résultat* : **1 seul serveur peut gérer 100 clients en même temps.** C'est ultra-rapide et efficace.

---

### Mots-Clés du Code (Pour briller à l'oral)

*   **`Mono<T>`** : "C'est une promesse de 0 ou 1 résultat" (ex: "Je te promets de te trouver *un* utilisateur").
*   **`Flux<T>`** : "C'est une promesse de plusieurs résultats" (ex: "Je te promets une *liste* de cours").
*   **Non-Bloquant** : "Le serveur (thread) ne reste jamais inactif à attendre la base de données."

---

## 7. Scénarios d'Exécution (Questions Type Oral)

Cette section répond à la question : *"Que se passe-t-il exactement quand je clique sur ce bouton ?"*

### 7.1. Authentification (Login)
**Action** : L'utilisateur saisit ses identifiants et clique sur **"Se connecter"**.

1.  **Frontend (`LoginPage.tsx`)** :
    *   La fonction `onSubmit` appelle `login(username, password)` (dans `api/auth.ts`).
    *   Une requête HTTP est envoyée : `POST /api/authenticate`.
2.  **API / Controller (`AuthenticateController.java`)** :
    *   La méthode `authorize()` reçoit la requête.
    *   Elle délègue l'authentification au `ReactiveAuthenticationManager`.
3.  **Sécurité (Spring Security)** :
    *   Vérifie que le login et le mot de passe correspondent (hachage bcrypt).
4.  **Création du Token** :
    *   Si succès, `createToken()` génère un **JWT (JSON Web Token)** contenant les droits de l'utilisateur.
5.  **Réponse** :
    *   Le JWT est renvoyé au frontend qui le stocke (localStorage/sessionStorage) pour les futures requêtes.

### 7.2. Inscription (Register)
**Action** : L'utilisateur remplit le formulaire et clique sur **"S'inscrire"**.

1.  **Frontend (`RegisterPage.tsx`)** :
    *   La fonction `onSubmit` appelle `register(formData)` (dans `api/auth.ts`).
    *   Requête HTTP : `POST /api/register`.
2.  **API / Controller (`AccountResource.java`)** :
    *   La méthode `registerAccount()` valide les données (ex: format email, longueur mot de passe).
    *   Appelle `UserService.registerUser()`.
3.  **Service (`UserService.java`)** :
    *   Vérifie si l'email ou le login existe déjà.
    *   Hache le mot de passe.
    *   Prépare l'entité `User`.
4.  **Base de Données (`UserRepository`)** :
    *   `save()` insère le nouvel utilisateur en base (SQL `INSERT INTO jhi_user ...`).

### 7.3. Réservation d'un cours (Booking)
**Action** : L'utilisateur clique sur **"Réserver"** sur le planning.

1.  **Frontend (`PlanningPage.tsx`)** :
    *   Le bouton déclenche `handleBooking`.
    *   Appelle l'API : `api/bookings.ts` (`createBooking`).
    *   Requête HTTP : `POST /api/bookings`.
2.  **API / Controller (`BookingResource.java`)** :
    *   La méthode `createBooking()` reçoit l'objet `Booking`.
    *   Vérifie que l'ID est null (car c'est une création).
3.  **Service (`BookingService.java`)** :
    *   Appelle la méthode `save()`.
    *   *Logique métier potentielle* : Vérification du solde de crédits, places disponibles, etc.
4.  **Base de Données (`BookingRepository`)** :
    *   `save()` persiste la réservation en base (SQL `INSERT INTO booking ...`).

### 7.4. Annulation d'une réservation (Cancel Booking)
**Action** : L'utilisateur clique sur **"Annuler"** dans son profil.

1.  **Frontend (`ProfilePage.tsx`)** :
    *   Le bouton déclenche `handleCancelBooking`.
    *   Vérification côté client : Est-ce que le cours est dans moins de 24h ? (Si oui, alerte).
    *   Appelle l'API : `api/bookings.ts` (`cancelBooking`).
    *   Requête HTTP : `POST /api/bookings/{id}/cancel`.
2.  **API / Controller (`BookingResource.java`)** :
    *   Endpoint : `@PostMapping("/{id}/cancel")`.
    *   Appelle `BookingService.cancel(id)`.
3.  **Service (`BookingService.java`)** :
    *   Récupère la réservation.
    *   Vérifie les règles métier (pénalités, remboursement crédits).
    *   Supprime ou met à jour le statut de la réservation.
    *   Libère la place pour un autre utilisateur.

### 7.5. Consultation du Profil (View Profile)
**Action** : L'utilisateur accède à la page **"Mon Profil"**.

1.  **Frontend (`ProfilePage.tsx`)** :
    *   Au chargement (`useEffect`), le composant demande les infos.
    *   Appelle `api/account.ts` (`getAccount`).
    *   Appelle `api/bookings.ts` (`myBookings`) pour l'historique.
    *   Requêtes HTTP : `GET /api/account` et `GET /api/bookings`.
2.  **API / Controller (`AccountResource.java` & `BookingResource.java`)** :
    *   `getAccount()` : Récupère l'utilisateur connecté via le Token JWT.
    *   `getAllBookings()` : Récupère les réservations liées à cet utilisateur.
3.  **Base de Données** :
    *   `SELECT * FROM jhi_user WHERE login = ...`
    *   `SELECT * FROM booking WHERE user_id = ...`

### 7.6. (Admin) Gestion des Utilisateurs
**Action** : L'admin veut voir la liste des utilisateurs.
*(Note : Cette fonctionnalité est actuellement accessible via API uniquement, pas encore d'écran dédié).*

1.  **API / Controller (`UserResource.java`)** :
    *   Endpoint : `GET /api/admin/users`.
    *   **Sécurité** : L'annotation `@PreAuthorize("hasAuthority('ROLE_ADMIN')")` vérifie que le JWT contient le rôle ADMIN.
    *   Si l'utilisateur est un simple client -> **403 Forbidden** (Accès Interdit).
    *   Si l'utilisateur est Admin -> **200 OK** + Liste JSON.
2.  **Service (`UserService.java`)** :
    *   `getAllManagedUsers()` retourne une liste paginée (ex: page 1, 20 utilisateurs).
