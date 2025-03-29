# React + TypeScript + Vite

This project is the client-side of an e-commerce website built using modern web technologies. It provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Technologies Used

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

## Features

- **Product Listings**: Display a list of products with details.
- **Search and Filter**: Search for products and apply filters.
- **Shopping Cart**: Add, remove, and update items in the cart.
- **User Authentication**: Login and signup functionality.
- **Order Management**: Place and view orders.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## Environment Variables

The client requires the following environment variables to be set in a `.env` file:

- `VITE_SERVER_HOST`: The backend server host URL.

Refer to the `.env.sample` file for an example.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the `.env` file based on `.env.sample`.
4. Run the development server using `npm run dev`.

For more details, refer to the official documentation of the technologies used.
