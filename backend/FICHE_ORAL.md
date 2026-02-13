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
