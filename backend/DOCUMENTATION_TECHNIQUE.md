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

## 🧠 Mémo Réactif

Si vous voyez ces mots-clés dans le code :

*   **`Mono<T>`** : "Je te promets **0 ou 1** résultat (ex: chercher un utilisateur par ID)."
*   **`Flux<T>`** : "Je te promets **plusieurs** résultats (ex: liste des cours)."
*   **`.map()`** : "Transforme la donnée (ex: User -> UserDTO)."
*   **`.flatMap()`** : "Enchaîne avec une autre opération asynchrone (ex: Chercher User -> Puis chercher ses Réservations)."
