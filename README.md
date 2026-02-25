ITD110 Lab Exercise 2 – Student Management System (Redis)

A high-performance CRUD application using a Node.js/Express backend integrated with a Redis key-value store and a modern Vanilla JavaScript frontend.

Features
- Full CRUD Support: Complete implementation for creating, reading, updating, and deleting student records.
- Middleware Challenge: Custom Express.js middleware function that acts as a pre-save validator to ensure GPA integrity (1.0–5.0) and data sanitization.
- Persistent Key-Value Storage: Uses Redis Hashes for structured student profiles and Redis Sets for efficient record indexing.
- Real-time UI Feedback: Frontend status indicators for loading, success, and validation error handling.

Tech Stack
- Backend: Node.js, Express.js
- Database: Redis (In-memory Key-Value Store) + Redis Insight (Visualization)
- Frontend: HTML5, CSS3 (Glassmorphism UI), Vanilla JavaScript
- Dependencies: redis client, uuid for unique identifiers, cors, dotenv

Setup (Local) Prerequisites
- Node.js (LTS version) installed.
- Redis Server running locally (Default Port: 6379).

Backend 
cd backend
npm install
npm run dev

API Test http://localhost:3000/api/students
