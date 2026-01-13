# 🛠️ DevScribe Server

The robust backend API for the DevScribe blogging platform. Built with **Node.js**, **Express**, and **MongoDB**, it provides secure authentication, advanced query capabilities, and role-based access control.

## 🚀 Features

### 🔐 Security & Auth
*   **JWT Authentication**: Secure, stateless authentication using JSON Web Tokens stored in **HTTP-only cookies**.
*   **RBAC (Role-Based Access Control)**:
    *   **Admin**: Full access to manage all users and contents.
    *   **Author**: Manage own profile and blogs.
*   **Password Hashing**: Bcrypt encryption for user passwords.
*   **Security Headers**: Helmet integration for HTTP header protection.

### 💾 Data Management
*   **MongoDB & Mongoose**: Flexible schema modeling with Mongoose.
*   **Seeder Script**: Built-in script using `@faker-js/faker` to populate the database with realistic dummy data for testing.
*   **Pagination & Filtering**: Optimized API endpoints supporting pagination, search (Regex), and language filtering.

### 🔌 API Capabilities
*   **CRUD Operations**: Full Create, Read, Update, Delete support for Blogs and Comments.
*   **Social Interactions**:
    *   **Likes**: Toggle endpoint protected by Auth middleware.
    *   **Comments**: Support for nested discussions.
    *   **Sharing**: Logic to generate shareable links (frontend integration).
*   **Granular Permissions**:
    *   **Comment Deletion**: Middleware logic checks if the requester is the *Comment Author* OR the *Blog Owner*.
    *   **Interaction Security**: Unauthenticated users can read but cannot perform write actions (Like/Comment).
*   **Deep Linking**: Search blogs by title, tags, or author username.
*   **Internationalization Support**: Backend storage and retrieval support for multi-language content.

## 🛠️ Tech Stack

*   **Runtime**: [Node.js](https://nodejs.org/)
*   **Framework**: [Express.js](https://expressjs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/)
*   **ODM**: [Mongoose](https://mongoosejs.com/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Validation**: [Zod](https://zod.dev/)
*   **Data Seeding**: [@faker-js/faker](https://fakerjs.dev/)

## 📂 Project Structure

```bash
src/
├── config/         # Database connection logic
├── controllers/    # Request handlers (Auth, Blog, Comment)
├── middleware/     # Custom middleware (Auth protection, Error handling)
├── models/         # Mongoose Schemas (User, Blog, Comment)
├── routes/         # API Routes definition
├── schemas/        # Zod validation schemas
├── services/       # Business logic (optional layer)
├── utils/          # Utility functions
├── index.ts        # Entry point
└── seeder.ts       # Database population script
```

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16+)
*   MongoDB (Local or Atlas)

### Installation

1.  Navigate to server directory:
    ```bash
    cd blog-app/server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment:
    Create a `.env` file:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    NODE_ENV=development
    ```

4.  Run the Server:
    *   **Development**: `npm run dev`
    *   **Production Build**: `npm run build && npm start`

### 🌱 Database Seeding

To quickly populate your database with test data:

```bash
# Generate 10 users and 50 blogs
npm run seed

# ⚠️ Wipe all data
npm run seed -- -d
```

## 🧠 Key Logic Flows

1.  **Blog Creation**:
    *   Endpoint checks for valid JWT.
    *   Validates input using Zod schemas.
    *   Saves rich-text content and tags to MongoDB.
    *   Associates author ID from the verified token.

2.  **Search & Pagination**:
    *   `getBlogs` controller accepts `page`, `limit`, `search`, and `language` query params.
    *   Standardizes search input into a Regex for case-insensitive matching across Title, Tags, and Author Username.

3.  **Authorization Middleware**:
    *   `protect`: Verifies JWT presence and validity.
    *   `authorize('admin')`: Ensures the authenticated user has the 'admin' role before allowing access to sensitive routes (e.g., Delete User).

## 🤝 Contributing

Contributions are welcome! Please ensure you verify your changes with the existing linter configurations.
