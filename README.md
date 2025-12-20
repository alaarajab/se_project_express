# WTWR (What to Wear?): Back End

This back-end project focuses on creating a secure and fully functional server for the WTWR (What to Wear?) application. Throughout this project, I gained a deeper understanding of working with databases, implementing security best practices, and deploying web applications to a remote server.

Across multiple sprints, I built a complete RESTful API with user authentication, authorization, request validation, centralized error handling, logging, and full cloud deployment. The ultimate goal was to create a production-ready back-end server that securely supports the WTWR client application.

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
- **celebrate / Joi** – Validation of inbound request data
- **Winston** – Request and error logging
- **PM2** – Process manager for running the server in production
- **nginx** – Reverse proxy and static file server
- **Certbot / SSL** – HTTPS encryption


## Running the Project

npm run start – Launches the server on localhost:3001

npm run dev – Launches the server with hot reload enabled

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
  
## Previous Project Pitch Video (sprint 13)

Check out [this video](https://youtu.be/dCtKzAeNHj8), where I describe my
project and some challenges I faced while building it.

**Sprint 15 (Project 15) – Advanced Middleware & Cloud Deployment**

- In Sprint 15, I focused on making the WTWR back end production-ready by improving reliability, security, and deployment:
- Centralized Error Handling – Implemented a single global error-handling middleware with custom error classes for different HTTP status codes (400, 401, 403, 404, 409, 500), ensuring consistent and meaningful error responses.
- Request Validation Middleware – Added validation for request bodies and parameters using celebrate, Joi, and validator to prevent invalid data from reaching controllers.
- Logging – Implemented request and error logging using Winston, with logs stored in separate files for requests and errors. Log files are excluded from the Git repository.
- Crash Recovery – Added a /crash-test route to verify server stability and automatic recovery.
- Cloud Deployment – Deployed the back-end server to a Google Cloud virtual machine.
- Process Management – Used PM2 to keep the Node.js application running continuously and automatically restart it on failure.
- Reverse Proxy Configuration – Configured nginx to route requests from public URLs to the Node.js server.
- Secure Communication – Enabled HTTPS using SSL certificates issued with Certbot.
- Environment Variables – Stored sensitive data such as JWT secrets and database credentials securely in a .env file.
- Domain & Subdomains – Registered and configured subdomains for both the frontend and backend.
- Frontend Integration – Uploaded the frontend to the server and configured nginx to serve it and communicate with the deployed API.
- Production Readiness – Verified that the application works correctly in both development and production environments without crashing.

## Final Project Pitch Video (sprint 15)

Check out [this video](https://youtu.be/_YzA7rw7LWk), where I describe my
project and some challenges I faced while building it.

## Links

- [Frontend Repository](https://github.com/alaarajab/se_project_react)

- [Deployment](https://wtwr-wtwr.jumpingcrab.com/)
