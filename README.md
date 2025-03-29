# Perfume Application Documentation

This repository contains the codebase for the Perfume application, including the backend server, admin panel, and client application.

---

## Table of Contents

1. [Server](#server)
   - [Features](#server-features)
   - [Setup](#server-setup)
   - [API Endpoints](#server-api-endpoints)
2. [Admin Panel](#admin-panel)
   - [Features](#admin-panel-features)
   - [Setup](#admin-panel-setup)
   - [Project Structure](#admin-panel-project-structure)
3. [Client](#client)
   - [Features](#client-features)
   - [Setup](#client-setup)
   - [Technologies Used](#client-technologies-used)

---

## Server

### Server Features

- **Authentication**: Admin and user authentication with OTP-based login.
- **User Management**: Manage admin users and their permissions.
- **Product Management**: Add, update, and manage products.
- **Category Management**: Add, update, and manage categories and tags.
- **Carousel Management**: Manage homepage carousels.
- **Cart Management**: Add, update, and remove items from the cart.
- **Media Management**: Upload and delete unused media files.

### Server Setup

1. Install dependencies:

   ```bash
   cd server
   npm install
   ```

2. Configure environment variables in `.env`:

   ```bash
   DATABASE_URL= # Database connection string
   JWT_SECRET= # Secret for JWT
   ```

3. Run the server:

   ```bash
   npm start
   ```

### Server API Endpoints

Refer to the [Server README](./server/README.md) for detailed API documentation.

---

## Admin Panel

### Admin Panel Features

- **Authentication**: Login, logout, password reset, and OTP-based verification.
- **User Management**: Add, update, and delete admin users with role-based permissions.
- **Product Management**: Add, update, and manage products and their media.
- **Category Management**: Add, update, and view categories and tags.
- **Carousel Management**: Add, update, and delete carousel items.
- **Media Upload**: Upload and manage media files using UploadThing.

### Admin Panel Setup

1. Install dependencies:

   ```bash
   cd admin
   yarn install
   ```

2. Configure environment variables in `.env.local`:

   ```bash
   SERVER_HOST= # Backend server host
   UPLOADTHING_TOKEN= # UploadThing API token
   UPLOADTHING_APP_ID= # UploadThing App ID
   UPLOAD_TOKEN= # Upload token
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Panel Project Structure

- **`src/app`**: Contains Next.js pages and layouts.
- **`src/components`**: Reusable UI components.
- **`src/assets`**: Static assets like images.
- **`src/lib`**: Utility functions and types.
- **`src/hooks`**: Custom React hooks.
- **`src/services`**: API service functions for interacting with the backend.

---

## Client

### Client Features

- **Product Listings**: Display a list of products with details.
- **Search and Filter**: Search for products and apply filters.
- **Shopping Cart**: Add, remove, and update items in the cart.
- **User Authentication**: Login and signup functionality.
- **Order Management**: Place and view orders.
- **Responsive Design**: Optimized for both desktop and mobile devices.

### Client Setup

1. Install dependencies:

   ```bash
   cd client
   npm install
   ```

2. Configure environment variables in `.env`:

   ```bash
   REACT_APP_SERVER_HOST= # Backend server host
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Client Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Vite**: A fast build tool and development server.
- **React Router**: For handling client-side routing.
- **Axios**: For making HTTP requests to the backend server.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Redux Toolkit**: For state management.
- **React Query**: For data fetching and caching.
- **ESLint**: For linting and maintaining code quality.
- **Prettier**: For code formatting.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [UploadThing Documentation](https://uploadthing.com/docs)

---

## License

This project is licensed under the MIT License.
