# WTWR (What to Wear?): Back End

This back-end project focuses on creating a secure and fully functional server for the WTWR (What to Wear?) application. I gained a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. In this phase, I implemented authorization, user authentication, and route protection to ensure data security. The ultimate goal was to build a complete server with a robust API and user authorization system.

## Tech Stack / Libraries

- **Node.js** – JavaScript runtime for server-side development
- **Express** – Web framework for routing and middleware
- **MongoDB** – NoSQL database for storing users and clothing items
- **Mongoose** – ODM for MongoDB, used for schema definition and queries
- **bcryptjs** – For hashing and comparing passwords securely
- **jsonwebtoken (JWT)** – For generating and verifying user authentication tokens
- **Validator** – Library to validate strings (e.g., URLs)
- **Nodemon** – Development tool for hot reloading
- **CORS** – Middleware to enable secure cross-origin requests
- **ESLint** – Code linting to enforce best practices
- **Jest / Supertest** – Testing framework for API endpoints

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing my code, I updated the sprint.txt file in the root folder. This file indicates which Postman collection to use for testing, ensuring that the tests correspond to the correct sprint (e.g., Sprint 12 or Sprint 13).

### Key Features Implemented

**Sprint 12 (Project 12) – Initial Back-End Setup**

- In Sprint 12, I set up the foundational back end for the WTWR application, focusing on server structure, database integration, and basic resource management:
- Express Server Setup – Organized the project with dedicated folders for routes, controllers, models, and utilities.
- MongoDB Integration – Connected to a MongoDB database to store users and clothing items.
- User Management – Implemented routes and controllers to create and fetch users, with validation for name and avatar fields.
- Clothing Items Management – Enabled creating, fetching, and deleting clothing items. Each item is linked to a user via a temporary hardcoded ID.
- Error Handling – Standardized responses for client errors (400), not found resources (404), and server errors (500).
- Data Validation – Ensured required fields are present and URLs for avatars and item images are valid.
- Temporary Authorization – Added middleware with a hardcoded user ID to simulate item ownership.
- Development Tools – Integrated ESLint (Airbnb style), Prettier, and nodemon for hot reload.
- Testing – Used Postman to verify API endpoints.

**Sprint 13 (Project 13) – Authentication & Authorization**

- Sprint 13 focused on securing the server with authentication and route protection:
- User Authentication – Created /signup and /signin routes with password hashing. Duplicate emails are prevented with a 409 Conflict response. Passwords are hidden in responses.
- JWT Authorization – Implemented middleware to protect routes by verifying JWT tokens. The payload is attached to req.user for secure access.
- Current User Profile – Added GET /users/me to fetch the logged-in user and PATCH /users/me to allow updates to name and avatar only.
- Clothing Items Management – Users can only delete items they own (403 Forbidden if not the owner). Added like/unlike functionality using $addToSet and $pull.
- Route Protection – Only /signup, /signin, and GET /items are publicly accessible. All other routes require valid JWTs.
- Enhanced Error Handling – 401 Unauthorized for missing or invalid tokens; validation and conflict errors handled properly.
- CORS Enabled – To allow requests from the client to the server.
- Testing – Postman collection updated to test authentication, authorization, and protected routes.

## Project Pitch Video

Check out [this video](ADD_LINK_HERE), where I describe my
project and some challenges I faced while building it.
