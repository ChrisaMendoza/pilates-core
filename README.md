# CORE Pilates - Booking System

A premium, state-of-the-art booking management platform for Pilates studios. This project is a monorepo containing both the reactive Spring Boot backend and the modern React frontend.

## 🏗 Project Architecture

This project follows a **Monorepo** structure:

- **/frontend**: A high-performance React application powered by Vite and TypeScript.
- **/backend**: A reactive Spring Boot application utilizing R2DBC and PostgreSQL, built with the JHipster framework.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **API Client**: [Axios](https://axios-http.com/)

### Backend
- **Framework**: [Spring Boot 3.4.5](https://spring.io/projects/spring-boot)
- **Infrastructure**: [JHipster 8.11.0](https://www.jhipster.tech/)
- **Persistence**: PostgreSQL with [Spring Data R2DBC](https://spring.io/projects/spring-data-r2dbc) (Reactive)
- **Database Migrations**: [Liquibase](https://www.liquibase.org/)
- **Build Tool**: [Maven](https://maven.apache.org/)
- **Java Version**: 17

---

## 🛠 Getting Started

### Quick Start (macOS)
L'option la plus simple pour lancer le frontend et le backend simultanément :
```bash
./start-all.sh
```
*Cela ouvrira deux fenêtres de terminal séparées.*

### Configuration Manuelle

#### Prérequis
- **Node.js**: v22.15.0 ou supérieur
- **Java**: JDK 17
- **Docker**: Pour la base de données PostgreSQL (optionnel)

#### Lancement Backend
1. `cd backend`
2. `./mvnw`

#### Lancement Frontend
1. `cd frontend`
2. `npm install` (la première fois)
3. `npm run dev`

---

## 🎨 Features
- **Premium UI**: Modern, glassmorphism-inspired design for a premium user experience.
- **Booking Management**: Seamless scheduling for Pilates sessions.
- **Reactive Backend**: High-performance, non-blocking API architecture.
- **User Authentication**: Secure role-based access control.

---

## 📝 License
This project is private and for internal use by CORE Pilates.
