# 🎨 DevScribe Client

A modern, responsive, and feature-rich blogging platform frontend built with **React**, **TypeScript**, and **Tailwind CSS**. This application offers a seamless user experience with support for internationalization (i18n), dark mode, and rich content creation.

## 🚀 Features

### 🌟 Core Experience
*   **Responsive Design**: Fully responsive UI/UX designed for mobile, tablet, and desktop.
*   **Internationalization (i18n)**: Full support for **English** and **Arabic** (RTL support included).
*   **Infinite Scroll**: Seamless browsing experience on the blogs listing page.
*   **Skeleton Loading**: Smooth loading states for a polished feel.

### 🔐 Authentication & Profile
*   **Secure Auth**: Login and Signup with JWT-based cookie authentication.
*   **Role-Based Dashboards**: Distinct views/features for **Admins** and **Authors**.
*   **Profile Management**: Update details, change passwords, and view personal blog history.
*   **Admin Tools**: Dedicated User Management tab for administrators to view and manage users.

### 📝 Content Creation & Interaction
*   **Rich Text Editor**: Integrated **React Quill** for writing beautiful blogs with formatting.
*   **Interactive Engagement**:
    *   **Like & Comment**: users must be **logged in** to like or comment on posts, driving community engagement.
    *   **Share**: Built-in functionality to easily share blog posts via link copying.
*   **Comment Moderation**:
    *   **Blog Authors**: Have full rights to delete *any* comment on their own blog posts.
    *   **Commenters**: Can delete their own comments.
*   **Smart Search**: Real-time debounce search for finding blogs by title, tag, or author.
*   **Tagging System**: Organize blogs with custom tags.

## 🛠️ Tech Stack

*   **Framework**: [React](https://react.dev/) (Vite)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Routing**: [React Router DOM](https://reactrouter.com/)
*   **Internationalization**: [i18next](https://www.i18next.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **HTTP Client**: [Axios](https://axios-http.com/)

## 📂 Project Structure

```bash
src/
├── assets/         # Static assets (images, fonts)
├── components/     # Reusable UI components
│   ├── blogs/      # Blog-related components (Card, Search)
│   ├── comments/   # Comment section and items
│   ├── modals/     # Global modals (Auth, Confirmation)
│   └── profile/    # Profile and User management components
├── hooks/          # Custom React hooks (useDebounce, useInfiniteBlogs)
├── layouts/        # Layout wrappers (MainLayout)
├── locales/        # i18n translation JSON files (en/ar)
├── pages/          # Application pages (Home, Login, BlogDetail, etc.)
├── redux/          # Redux slices and store configuration
├── services/       # API service functions
├── utils/          # Helper functions
├── App.tsx         # Main App component with Routes
└── i18n.ts         # i18next configuration
```

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/taniyakamboj15/blog-app.git
    cd blog-app/client
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    Create a `.env` file in the root of `client/` (if needed for API URL):
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

## 🧠 Logic Flow

1.  **Authentication**:
    *   On load, the app checks for an existing session via HTTP-only cookies.
    *   Redux state is updated with `userInfo`.
    *   Protected routes (`/create-blog`, `/dashboard`) redirect unauthenticated users to Login.

2.  **Infinite Scroll**:
    *   `useInfiniteBlogs` hook fetches data in pages.
    *   `IntersectionObserver` detects when the user scrolls to the bottom.
    *   New data is appended to the existing list without duplicating entries.

3.  **Refactoring & Optimization**:
    *   Translations are strictly separated into `locales/` folder.
    *   Components are modular (e.g., `UserList`, `BlogCard`) to ensure reusability.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
