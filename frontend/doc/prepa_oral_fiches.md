# 🎓 Préparation Oral : Questions & Réponses (Niveau M1)

Cette fiche contient les questions les plus probables d'un jury/professeur et les "réponses types" attendues pour montrer votre expertise technique et méthodologique.

---

## 🛠 I. Architecture & Choix Techniques

### Q1 : "Pourquoi avoir choisi React avec Vite plutôt que Create React App (CRA) ou Next.js ?"
**Réponse attendue :**
*   **Vite vs CRA :** Vite utilise les **ES Modules natifs** du navigateur pour le développement, ce qui rend le démarrage et le rafraîchissement (HMR) quasi instantanés, contrairement à CRA qui doit re-packager toute l'app via Webpack.
*   **Vite vs Next.js :** Notre projet est un **SPA (Single Page Application)**. Next.js aurait été utile pour le SEO (SSR), mais pour un outil de gestion interne (réservations), une SPA React classique est plus légère et répond parfaitement au besoin.

### Q2 : "Vous utilisez du CSS Modules. Quel est l'intérêt par rapport à du CSS classique ou du Tailwind ?"
**Réponse attendue :**
*   **Scoped CSS :** Le CSS Modules garantit que les styles d'un composant (ex: `PlanningPage.module.css`) ne fuitent pas sur les autres composants. Vite génère des noms de classes uniques à la compilation.
*   **Maintenance :** Contrairement au CSS global, on n'a pas peur de renommer une classe `.container`. Contrairement à Tailwind, on garde une séparation claire entre la structure (JSX) et le design (CSS).

---

## 🏗 II. Logique de Domaine (DDD)

### Q3 : "Expliquez-moi votre 'Ubiquitous Language'. Pourquoi est-ce important ?"
**Réponse attendue :**
C'est le langage commun entre nous (développeurs) et l'expert métier (le gérant du studio).
*   **Exemple :** On utilise `Booking` et non `Reservation` pour coller au code. Un `Event` est une session de cours spécifique.
*   **Importance :** Cela réduit les erreurs de compréhension. Si le prof demande "C'est quoi un Event ?", la réponse est : "C'est l'agrégat central qui définit un créneau, une capacité et un coach".

### Q4 : "Si je veux ajouter une règle : 'Un client ne peut réserver qu'un cours par jour', où mettriez-vous cette logique ?"
**Réponse attendue :**
*   **Frontend :** On l'ajoute pour l'UX (griser le bouton "Réserver" si une réservation existe déjà ce jour-là) pour éviter un appel API inutile.
*   **Backend (Crucial) :** La règle **doit** être implémentée dans la couche `Service` du backend. On ne fait jamais confiance au frontend pour les règles de sécurité ou d'intégrité des données.

---

## 🔄 III. Flux de Données & API

### Q5 : "Comment gérez-vous les appels asynchrones avec Axios ? Et si l'API tombe ?"
**Réponse attendue :**
*   **Gestion :** On utilise des fonctions `async/await` encapsulées dans des services (dossier `api/`).
*   **Erreurs :** On utilise des blocs `try/catch`. En cas d'erreur (500 ou réseau), on affiche une notification à l'utilisateur via un état local `error` ou un système de "Toast" pour éviter que l'utilisateur ne reste devant un écran inerte.

### Q6 : "C'est quoi un intercepteur Axios et est-ce que vous en utilisez ?"
**Réponse attendue :**
*   **Définition :** C'est une fonction qui s'exécute automatiquement avant chaque requête (requête) ou après chaque réponse (réponse).
*   **Cas d'usage :** On l'utilise pour injecter automatiquement le **Token JWT** dans les headers (Authorization) sans avoir à le refaire manuellement dans chaque fichier.

---

## 🐙 IV. Git & Workflow Collaboratif

### Q7 : "Pourquoi votre config Git force-t-elle le `pull.rebase = true` ?"
**Réponse attendue :**
*   **Historique Linéaire :** Au lieu de créer des "Merge Commits" (ces bulles qui croisent les lignes dans le graphe Git) à chaque pull, le rebase vient placer nos commits locaux **au-dessus** des commits distants.
*   **Clarté :** Ça rend l'historique beaucoup plus lisible et facilite le "debug" (ex: `git bisect`).

### Q8 : "Que contient votre `.gitignore` et pourquoi ?"
**Réponse attendue :**
*   `node_modules/` : Trop lourd, on les régénère avec `npm install`.
*   `.env` : Contient des secrets (clés API) qui ne doivent jamais être publics.
*   `dist/` ou `target/` : Ce sont des artefacts de compilation, pas du code source.

---

## ⚡ V. Questions "Bonus" (Niveau Expert)

### Q9 : "Si l'application devient très grosse (100+ pages), comment optimiseriez-vous le chargement ?"
**Réponse attendue :**
*   Utiliser le **Code Splitting** avec `React.lazy` et `Suspense`. Cela permet de ne charger le code d'une page que lorsque l'utilisateur clique dessus, au lieu de charger tout le bundle JS au démarrage.

### Q10 : "TypeScript est-il vraiment nécessaire pour un petit projet ?"
**Réponse attendue :**
*   Oui, car il agit comme une **documentation vivante**. Si je change la structure d'un `Account`, TypeScript va me signaler immédiatement toutes les lignes de code qui vont "casser" dans l'app avant même que je l'ouvre dans le navigateur. C'est un gain de temps énorme en équipe.
