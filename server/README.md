# Perfume Server Documentation

## Create Admin Script

The `createAdmin.js` script is used to create an initial admin user in the database.

### Usage

Run the script using Node.js:

```bash
npm run create-admin
```

### Input

The script will prompt for the following inputs:

- **Fullname**: The full name of the admin user.
- **Email**: The email address of the admin user.
- **Mobile No.**: The mobile number of the admin user.
- **Password**: The password for the admin user.

### Example

```bash
Fullname: John Doe
Email: john.doe@example.com
Mobile No.: 1234567890
Password: ******
```

## Clear Upload Script

The `clearupload.js` script is used to delete unused media files from the bucket.

### Usage

Run the script using Node.js:

```bash
npm run clear-upload
```

### Description

This script fetches media files from the bucket and the database, compares them, and deletes the unused media files from the bucket.

### Example

```bash
Fetching medias in bucket...
Fetching medias in database...
Sorting medias...
Deleting medias...
Unused media file deleted.
```

## API Endpoints

### Admin Authentication Routes

#### POST /admin/auth/login

**Request:**

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "msg": "Otp sent successfully",
  "userId": "user-id"
}
```

#### POST /admin/auth/verification

**Request:**

```json
{
  "otp": "123456",
  "userId": "user-id"
}
```

**Response:**

```json
{
  "sessionId": "session-id",
  "permission": ["ADMIN"],
  "msg": "Logged in successful"
}
```

#### POST /admin/auth/resend

**Request:**

```json
{
  "userId": "user-id"
}
```

**Response:**

```json
{
  "msg": "Otp resend successfully"
}
```

#### POST /admin/auth/forget-password

**Request:**

```json
{
  "email": "admin@example.com"
}
```

**Response:**

```json
{
  "restSessionId": "rest-session-id",
  "msg": "OTP send successfully"
}
```

#### POST /admin/auth/verify-opts

**Request:**

Headers:

```json
{
  "Authorization": "Bearer rest-session-id"
}
```

Body:

```json
{
  "emailOtp": "123456",
  "mobileOtp": "654321"
}
```

**Response:**

```json
{
  "msg": "OTP verified"
}
```

#### POST /admin/auth/change-password

**Request:**

Headers:

```json
{
  "Authorization": "Bearer rest-session-id"
}
```

Body:

```json
{
  "password": "newpassword123"
}
```

**Response:**

```json
{
  "msg": "password changed"
}
```

### Admin Manager Routes

These routes are protected by the `adminMiddleware`.

#### GET /admin/maneger/get

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

**Response:**

```json
{
  "msg": "Maneger fetch",
  "data": [
    {
      "email": "manager@example.com",
      "isOwner": true,
      "permission": ["ADMIN"],
      "name": "Manager Name"
    }
  ]
}
```

#### POST /admin/maneger/add

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

Body:

```json
{
  "name": "New Manager",
  "email": "new.manager@example.com",
  "mobileNo": "1234567890",
  "password": "password123",
  "admin": true,
  "product": true,
  "order": true,
  "payment": true,
  "customer": true,
  "site": true
}
```

**Response:**

```json
{
  "msg": "Maneger created successfully",
  "data": {
    "email": "new.manager@example.com",
    "isOwner": true,
    "permission": ["ADMIN", "PRODUCT", "ORDER", "PAYMENT", "CUSTOMER", "SITE"],
    "name": "New Manager"
  }
}
```

#### POST /admin/maneger/update

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

Body:

```json
{
  "oldemail": "old.manager@example.com",
  "name": "Updated Manager",
  "email": "updated.manager@example.com"
}
```

**Response:**

```json
{
  "msg": "Maneger updated successfully",
  "data": {
    "email": "updated.manager@example.com",
    "isOwner": true,
    "permission": ["ADMIN"],
    "name": "Updated Manager"
  }
}
```

#### POST /admin/maneger/permission/update

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

Body:

```json
{
  "email": "manager@example.com",
  "admin": true,
  "product": true,
  "order": true,
  "payment": true,
  "customer": true,
  "site": true
}
```

**Response:**

```json
{
  "msg": "Permision updated successfully",
  "data": {
    "email": "manager@example.com",
    "isOwner": true,
    "permission": ["ADMIN", "PRODUCT", "ORDER", "PAYMENT", "CUSTOMER", "SITE"],
    "name": "Manager Name"
  }
}
```

#### DELETE /admin/maneger/delete

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

Body:

```json
{
  "email": "manager@example.com"
}
```

**Response:**

```json
{
  "msg": "deleted successfully",
  "data": {
    "email": "manager@example.com",
    "isOwner": true,
    "permission": ["ADMIN"],
    "name": "Manager Name"
  }
}
```

### Admin Product Routes

These routes are protected by the `adminMiddleware`.

#### POST /admin/product/add

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

Body:

```json
{
  "name": "New Product",
  "description": "Product description",
  "description2": "Additional description",
  "description3": "More details",
  "points": ["Point 1", "Point 2"],
  "maxPrice": 100.0,
  "selPrice": 80.0,
  "fragrence": "Floral",
  "strength": "Strong",
  "preference": "Unisex",
  "sustainable": "Yes",
  "type": "Perfume",
  "idealFor": "Everyone",
  "quantity": 50,
  "category": ["category-id"],
  "images": ["image-id-1", "image-id-2"]
}
```

**Response:**

```json
{
  "msg": "Product added",
  "data": {
    "id": "product-id",
    "name": "New Product",
    "description": "Product description",
    "description2": "Additional description",
    "description3": "More details",
    "points": ["Point 1", "Point 2"],
    "maxPrice": 100.0,
    "selPrice": 80.0,
    "fragrence": "Floral",
    "strength": "Strong",
    "preference": "Unisex",
    "sustainable": "Yes",
    "type": "Perfume",
    "idealFor": "Everyone",
    "quantity": 50,
    "category": ["category-id"],
    "images": ["image-id-1", "image-id-2"]
  }
}
```

#### GET /admin/product/get

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

**Response:**

```json
{
  "msg": "Product fetched",
  "data": [
    {
      "id": "product-id",
      "name": "Product Name",
      "description": "Product description",
      "description2": "Additional description",
      "description3": "More details",
      "points": ["Point 1", "Point 2"],
      "maxPrice": 100.0,
      "selPrice": 80.0,
      "fragrence": "Floral",
      "strength": "Strong",
      "preference": "Unisex",
      "sustainable": "Yes",
      "type": "Perfume",
      "idealFor": "Everyone",
      "quantity": 50,
      "category": ["category-id"],
      "images": ["image-id-1", "image-id-2"]
    }
  ]
}
```

#### GET /admin/product/get/:id

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

**Response:**

```json
{
  "msg": "Product fetched",
  "data": {
    "id": "product-id",
    "name": "Product Name",
    "description": "Product description",
    "description2": "Additional description",
    "description3": "More details",
    "points": ["Point 1", "Point 2"],
    "maxPrice": 100.0,
    "selPrice": 80.0,
    "fragrence": "Floral",
    "strength": "Strong",
    "preference": "Unisex",
    "sustainable": "Yes",
    "type": "Perfume",
    "idealFor": "Everyone",
    "quantity": 50,
    "category": ["category-id"],
    "images": ["image-id-1", "image-id-2"]
  }
}
```

#### GET /admin/product/change-status/:id

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

Query Parameters:

```json
{
  "status": "true"
}
```

**Response:**

```json
{
  "msg": "Status updated"
}
```

#### POST /admin/product/update

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

Body:

```json
{
  "id": "product-id",
  "name": "Updated Product",
  "description": "Updated description",
  "description2": "Updated additional description",
  "description3": "Updated more details",
  "points": ["Updated Point 1", "Updated Point 2"],
  "maxPrice": 120.0,
  "selPrice": 90.0,
  "fragrence": "Woody",
  "strength": "Medium",
  "preference": "Male",
  "sustainable": "No",
  "type": "Cologne",
  "idealFor": "Men",
  "quantity": 100,
  "category": ["updated-category-id"]
}
```

**Response:**

```json
{
  "msg": "Product updated"
}
```

#### POST /admin/product/update-media

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

Body:

```json
{
  "productId": "product-id",
  "image": ["new-image-id-1", "new-image-id-2"]
}
```

**Response:**

```json
{
  "msg": "Product image updated"
}
```

### Admin Category Routes

These routes are protected by the `adminMiddleware`.

#### POST /admin/category/create

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

Body:

```json
{
  "name": "New Category",
  "desc": "Category description",
  "isTag": true
}
```

**Response:**

```json
{
  "msg": "category created sucessfully"
}
```

#### POST /admin/category/update

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

Body:

```json
{
  "id": "category-id",
  "name": "Updated Category",
  "desc": "Updated description",
  "isTag": true
}
```

**Response:**

```json
{
  "msg": "category updated sucessfully"
}
```

#### GET /admin/category/get

**Request:**

Headers:

```json
{
  "Authorization": "Bearer session-id"
}
```

**Response:**

```json
{
  "msg": "Categories fetched",
  "data": [
    {
      "id": "category-id",
      "name": "Category Name",
      "description": "Category description",
      "isTag": true,
      "createdAt": "2023-10-01T00:00:00.000Z",
      "updatedAt": "2023-10-01T00:00:00.000Z",
      "count": 10
    }
  ]
}
```

### Admin Upload Routes

These routes are protected by the `uploadMiddleware`.

#### POST /admin/upload

**Request:**

Headers:

```json
{
  "Authorization": "Bearer upload-token"
}
```

Body:

```json
{
  "url": "https://example.com/image.jpg"
}
```

**Response:**

```json
{
  "msg": "Media uploaded",
  "data": {
    "mediaId": "media-id"
  }
}
```

#### GET /admin/upload/unused/get

**Request:**

Headers:

```json
{
  "Authorization": "Bearer upload-token"
}
```

**Response:**

```json
{
  "msg": "Unused media fetched",
  "date": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
}
```

#### GET /admin/upload/unused/delete

**Request:**

Headers:

```json
{
  "Authorization": "Bearer upload-token"
}
```

**Response:**

```json
{
  "msg": "Deleted"
}
```

### Middleware

#### Admin Middleware

- **File:** `src/middleware/admin.middleware.ts`
- **Description:** Middleware to protect admin routes.
- **Function:** Checks if the request has a valid session and sets the `req.admin` object with admin details.

### User Authentication Routes

#### POST /auth/login

**Request:**

```json
{
  "uid": "hEctsZMga5aoYq5zBIhbu8uu6uQ2",
  "mobileNo": "1234567890"
}
```

**Response:**

```json
{
  "msg": "Authenticate",
  "userId": "user-id"
}
```

### Profile Routes

#### GET /profile/get

**Request:**

Headers:

```json
{
  "Authorization": "Bearer user-uid"
}
```

**Response**

```json
{
  "msg": "User fetched",
  "data": {
    "mobileNo": "mobile-number",
    "name": "user-name",
    "email": "user-email"
  }
}
```

#### POST /profile/update

**Request:**

Headers:

```json
{
  "Authorization": "Bearer user-uid"
}
```

Body:

```json
{
  "msg": "profile updated"
}
```

**Response**

```json
{
  "msg": "User fetched",
  "data": {
    "mobileNo": "mobile-number",
    "name": "user-name",
    "email": "user-email"
  }
}
```

### Product Routes

#### GET /product/get

**Request:**

**Response:**

```json
{
  "msg": "Product fetched",
  "data": [
    {
      "id": "peoduct-id",
      "name": "Product Name",
      "sellPrice": 80.0,
      "maxPrice": 100.0,
      "categories": [
        {
          "id": "category-id",
          "name": "Category Name"
        }
      ],
      "tags": [
        {
          "id": "tag-id",
          "name": "Tag Name"
        }
      ]
    }
  ]
}
```

### Category Routes

#### GET /category/get

**Request:**

**Response:**

```json
{
  "msg": "Categories fetched",
  "data": [
    {
      "id": "category-id",
      "name": "Category Name"
    }
  ]
}
```

### Tag Routes

#### GET /tag/get

**Request:**

**Response:**

```json
{
  "msg": "Tag fetched",
  "data": [
    {
      "id": "tag-id",
      "name": "Tag Name"
    }
  ]
}
```

### Cart Routes

#### POST /cart/add/

**Request:**

Headers:

```json
{
  "Authorization": "Bearer user-uid"
}
```

Body:

```json
{
  "productId": "product-id",
  "qyt": 3
}
```

**Response:**

```json
{
  "msg": "Cart updated"
}
```

#### GET /cart/get/

**Request:**

Headers:

```json
{
  "Authorization": "Bearer user-uid"
}
```

**Response:**

```json
{
  "msg": "Cart fetched",
  "data": [
    {
      "productId": "product-id",
      "quantity": 2,
      "product": {
        "name": "Product Name"
      }
    }
  ]
}
```

#### GET /cart/increase/

**Request:**

Headers:

```json
{
  "Authorization": "Bearer user-uid"
}
```

Body:

```json
{
  "id": "product-id"
}
```

**Response:**

```json
{
  "msg": "Cart update"
}
```

#### GET /cart/decrease/

**Request:**

Headers:

```json
{
  "Authorization": "Bearer user-uid"
}
```

Body:

```json
{
  "id": "product-id"
}
```

**Response:**

```json
{
  "msg": "Cart update"
}
```

#### POST /cart/remove/

**Request:**

Headers:

```json
{
  "Authorization": "Bearer user-uid"
}
```

Body:

```json
{
  "productId": "product-id"
}
```

**Response:**

```json
{
  "msg": "Cart update"
}
```

#### User Middleware

- **File:** `src/middleware/user.middleware.ts`
- **Description:** Middleware to protect user routes.
- **Function:** Checks if the request has a valid uid and sets the `req.user` object with user details.
