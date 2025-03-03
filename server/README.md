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
  "mobileNo": "1234567890"
}
```

**Response:**

```json
{
  "msg": "Otp sent successfully",
  "userId": "user-id"
}
```

#### POST /auth/verify

**Request:**

```json
{
  "otpCode": "123456",
  "userId": "user-id"
}
```

**Response:**

```json
{
  "sessionId": "session-id",
  "msg": "Logged in successful"
}
```
