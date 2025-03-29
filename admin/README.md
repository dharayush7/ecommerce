# Admin Panel Documentation

This is the admin panel for the Perfume application, built using [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com).

## Features

- **Authentication**: Login, logout, password reset, and change password functionality.
- **User Management**: Manage admin users and their permissions.
- **Product Management**: Add, update, and manage products.
- **Category Management**: Add, update, and manage categories and tags.
- **Carousel Management**: Manage homepage carousels.
- **Media Upload**: Upload and manage media files using UploadThing.
- **Access Control**: Role-based access control for admin users.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Backend server running (refer to the [server documentation](../server/README.md))

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd admin
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env.local` file in the root directory and configure the following environment variables:

   ```bash
   SERVER_HOST= # Backend server host
   UPLOADTHING_TOKEN= # UploadThing API token
   UPLOADTHING_APP_ID= # UploadThing App ID
   UPLOAD_TOKEN= # Upload token
   ```

4. Start the development server:

   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

### Key Directories

- **`src/app`**: Contains Next.js pages and layouts.
- **`src/components`**: Reusable UI components.
- **`src/assets`**: Static assets like images.
- **`src/lib`**: Utility functions and types.
- **`src/hooks`**: Custom React hooks.
- **`src/services`**: API service functions for interacting with the backend.

---

## Features Overview

### Authentication

- **Login**: Admin users can log in using their email and password.
- **Logout**: Users can log out, clearing their session.
- **Password Reset**: Users can request a password reset and set a new password.
- **Verification**: OTP-based verification for secure login.

### User Management

- **Add Manager**: Add new admin users with specific permissions.
- **Update Manager**: Update manager details like name and email.
- **Update Permissions**: Modify permissions for existing managers.
- **Delete Manager**: Remove admin users.

### Product Management

- **Add Product**: Add new products with details like name, description, price, and categories.
- **Update Product**: Modify product details and media.
- **Change Status**: Toggle product availability (live/not live).
- **Delete Product**: Remove products from the system.

### Category Management

- **Add Category**: Create new categories or tags.
- **Update Category**: Modify category details.
- **View Categories**: List all categories with the number of associated products.

### Carousel Management

- **Add Carousel**: Add new carousel items with images and links.
- **Update Carousel**: Modify carousel details.
- **Delete Carousel**: Remove carousel items.

### Media Upload

- **Upload Media**: Upload images and videos using UploadThing.
- **Manage Media**: View and delete unused media files.

---

## Scripts

### Development

```bash
yarn dev
```

Starts the development server.

### Build

```bash
yarn build
```

Builds the application for production.

### Start

```bash
yarn start
```

Starts the production server.

### Lint

```bash
yarn lint
```

Runs ESLint to check for code quality issues.

---

## Tailwind CSS Configuration

The project uses Tailwind CSS for styling. The configuration file is located at:

```bash
src/app/globals.css
```

### Customizations

- **Custom Colors**: Defined using `oklch` color space.
- **Dark Mode**: Fully supported with custom variants.
- **Animations**: Includes `tailwindcss-animate` for smooth transitions.

---

## Environment Variables

| Variable             | Description                          |
| -------------------- | ------------------------------------ |
| `SERVER_HOST`        | Backend server host URL              |
| `UPLOADTHING_TOKEN`  | UploadThing API token                |
| `UPLOADTHING_APP_ID` | UploadThing App ID                   |
| `UPLOAD_TOKEN`       | Token for media upload authorization |

---

## Deployment

The easiest way to deploy the admin panel is using [Vercel](https://vercel.com).

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set the environment variables in the Vercel dashboard.
4. Deploy the application.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [UploadThing Documentation](https://uploadthing.com/docs)

---

## License

This project is licensed under the MIT License.
