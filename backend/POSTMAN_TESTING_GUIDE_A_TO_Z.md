# 🧪 Qodet API - Complete Postman Testing Guide (A to Z)

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Postman Setup](#postman-setup)
4. [Environment Configuration](#environment-configuration)
5. [Testing Workflow](#testing-workflow)
6. [Public Endpoints](#public-endpoints)
7. [Authentication Endpoints](#authentication-endpoints)
8. [Protected Endpoints](#protected-endpoints)
9. [Test Scripts & Automation](#test-scripts--automation)
10. [Database Verification](#database-verification)
11. [Error Scenarios](#error-scenarios)
12. [Best Practices](#best-practices)
13. [Troubleshooting](#troubleshooting)
14. [Quick Reference](#quick-reference)

---

## 📖 Introduction

This guide provides a complete A-to-Z walkthrough for testing the Qodet API using Postman. It covers every endpoint, request/response examples, test scripts, database verification, and troubleshooting.

**Base URL:** `http://localhost:5000/api/v1`

**API Version:** v1

---

## ✅ Prerequisites

### 1. Backend Server Running
```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ Email configuration detected
✅ Database connected successfully
🚀 Server running on port 5000
📍 Environment: development
🔗 API: http://localhost:5000/api/v1
```

### 2. Database Setup
```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed roles and permissions
npm run prisma:seed
```

### 3. Verify Database
```sql
-- Check roles exist
SELECT * FROM roles;
-- Expected: 4 roles (Super Admin, Client, Project Manager, Auditor)

-- Check permissions exist
SELECT COUNT(*) FROM permissions;
-- Expected: Multiple permissions

-- Check role-permission mappings
SELECT r.name, COUNT(rp.id) as permission_count
FROM roles r
LEFT JOIN role_permissions rp ON r.id = rp."roleId"
GROUP BY r.id, r.name;
```

### 4. Postman Installation
- Download from [postman.com](https://www.postman.com/downloads/)
- Version 10.0 or higher recommended

---

## 🔧 Postman Setup

### Step 1: Create New Collection

1. Open Postman
2. Click **New** → **Collection**
3. Name: `Qodet API - Complete Testing`
4. Description: `Complete A-Z testing guide for Qodet API`

### Step 2: Create Folders

Organize your collection with these folders:

```
Qodet API - Complete Testing
├── 📁 01. Public Endpoints
│   ├── Contact Form
│   └── Generate Estimate
├── 📁 02. Authentication
│   ├── Register
│   ├── Verify Email
│   ├── Login
│   ├── Forgot Password
│   ├── Reset Password
│   ├── Refresh Token
│   └── Logout
├── 📁 03. User Management
│   ├── Get Profile
│   └── Update Settings
├── 📁 04. Projects
│   ├── Create Project
│   └── Get All Projects
├── 📁 05. Finance
│   ├── Create Invoice
│   └── List Invoices
└── 📁 06. Content
    ├── List Blogs
    └── List Products
```

---

## 🌍 Environment Configuration

### Create Environment

1. Click **Environments** in left sidebar
2. Click **+** to create new environment
3. Name: `Qodet Local Development`

### Environment Variables

Add these variables:

| Variable | Initial Value | Current Value | Description |
|----------|--------------|---------------|-------------|
| `baseUrl` | `http://localhost:5000/api/v1` | `http://localhost:5000/api/v1` | Base API URL |
| `accessToken` | (empty) | (auto-populated) | JWT access token |
| `refreshToken` | (empty) | (auto-populated) | JWT refresh token |
| `userId` | (empty) | (auto-populated) | Current user ID |
| `projectId` | (empty) | (auto-populated) | Current project ID |
| `invoiceId` | (empty) | (auto-populated) | Current invoice ID |
| `threadId` | (empty) | (auto-populated) | Current thread ID |
| `testEmail` | `testuser@example.com` | `testuser@example.com` | Test email |
| `testPassword` | `SecurePassword123!` | `SecurePassword123!` | Test password |
| `otpCode` | (empty) | (auto-populated) | OTP code from console |

### Select Environment

- Make sure `Qodet Local Development` is selected in the top-right dropdown

---

## 🔄 Testing Workflow

### Recommended Testing Order

1. **Public Endpoints** (No auth required)
   - Contact Form
   - Generate Estimate

2. **Authentication Flow**
   - Register → Verify Email → Login
   - (Optional) Forgot Password → Reset Password

3. **Protected Endpoints** (Require auth token)
   - User Profile
   - Projects
   - Finance
   - Content

4. **Token Management**
   - Refresh Token
   - Logout

---

## 🌐 Public Endpoints

### 1. Contact Form

**Endpoint:** `POST {{baseUrl}}/public/contact`

**Description:** Submit contact form inquiry

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "contact@example.com",
  "name": "John Doe",
  "phone": "+1234567890",
  "subject": "Project Inquiry",
  "message": "I'm interested in your services. Can we schedule a call?"
}
```

**Minimal Request:**
```json
{
  "email": "contact@example.com"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "leadId": "550e8400-e29b-41d4-a716-446655440000",
    "message": "Thank you for contacting us. We will get back to you soon."
  },
  "message": "Contact form submitted successfully"
}
```

**Test Script:**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData.success).to.be.true;
});

pm.test("Response contains leadId", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('leadId');
    
    // Save leadId for future use
    if (jsonData.data.leadId) {
        pm.environment.set("leadId", jsonData.data.leadId);
    }
});
```

**Database Verification:**
```sql
-- Check leads table
SELECT 
    id,
    email,
    "userId",
    "createdAt"
FROM leads 
WHERE email = 'contact@example.com'
ORDER BY "createdAt" DESC 
LIMIT 1;

-- Check contact_inquiries table
SELECT 
    id,
    email,
    name,
    phone,
    subject,
    message,
    "isRead",
    "createdAt"
FROM contact_inquiries 
WHERE email = 'contact@example.com'
ORDER BY "createdAt" DESC 
LIMIT 1;
```

**Error Scenarios:**

| Scenario | Request | Expected Status | Expected Message |
|----------|---------|----------------|------------------|
| Missing email | `{}` | 400 | Validation error |
| Invalid email | `{"email": "invalid"}` | 400 | Invalid email format |

---

### 2. Generate Estimate

**Endpoint:** `POST {{baseUrl}}/public/estimate`

**Description:** Generate project cost estimate with PDF

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "config": {
    "complexity": 2,
    "features": ["authentication", "payment", "dashboard", "analytics"],
    "platform": "web",
    "email": "client@example.com",
    "timeline": "3 months"
  },
  "userId": null
}
```

**With Logged-in User:**
```json
{
  "config": {
    "complexity": 3,
    "features": ["authentication", "payment"],
    "platform": "mobile"
  },
  "userId": "{{userId}}"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "refCode": "Q-1001",
    "costLow": 2400,
    "costHigh": 3600,
    "pdfUrl": "https://s3.qodet.com/estimates/550e8400-e29b-41d4-a716-446655440000.pdf"
  },
  "message": "Estimate generated successfully"
}
```

**Test Script:**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response contains refCode", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('refCode');
    pm.expect(jsonData.data.refCode).to.match(/^Q-\d+$/);
    
    // Save refCode
    pm.environment.set("refCode", jsonData.data.refCode);
});

pm.test("Response contains cost range", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('costLow');
    pm.expect(jsonData.data).to.have.property('costHigh');
    pm.expect(jsonData.data.costLow).to.be.a('number');
    pm.expect(jsonData.data.costHigh).to.be.a('number');
    pm.expect(jsonData.data.costHigh).to.be.at.least(jsonData.data.costLow);
});
```

**Database Verification:**
```sql
-- Check estimates table
SELECT 
    id,
    "refCode",
    "userId",
    config,
    "costLow",
    "costHigh",
    "pdfUrl",
    "createdAt"
FROM estimates 
ORDER BY "createdAt" DESC 
LIMIT 1;

-- Expected:
-- - refCode format: Q-1001, Q-1002, etc.
-- - costLow and costHigh are calculated
-- - config contains the JSON request
```

**Error Scenarios:**

| Scenario | Request | Expected Status |
|----------|---------|----------------|
| Missing config | `{"userId": null}` | 400 |
| Invalid userId format | `{"config": {}, "userId": "invalid"}` | 400 |

---

## 🔐 Authentication Endpoints

### 3. Register User

**Endpoint:** `POST {{baseUrl}}/auth/register`

**Description:** Register a new user account

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "{{testEmail}}",
  "password": "{{testPassword}}",
  "fullName": "Test User",
  "companyName": "Test Company"
}
```

**Minimal Request:**
```json
{
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "fullName": "New User"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "testuser@example.com"
  },
  "message": "Registration successful. Please check your email for verification code."
}
```

**Test Script:**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response contains userId", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('userId');
    
    // Save userId for future requests
    pm.environment.set("userId", jsonData.data.userId);
});

pm.test("User is not verified yet", function () {
    // This will be verified in database check
    pm.expect(pm.response.json().data.email).to.be.a('string');
});
```

**Database Verification:**
```sql
-- Check user was created
SELECT 
    id,
    email,
    "fullName",
    "companyName",
    "roleId",
    "isVerified",
    "isActive",
    "passwordHash",
    "createdAt"
FROM users 
WHERE email = 'testuser@example.com';

-- Expected:
-- - New user with email
-- - passwordHash is hashed (not plain text)
-- - roleId points to 'client' role
-- - isVerified = false
-- - isActive = true

-- Check role assignment
SELECT 
    u.email,
    u."fullName",
    r.name as role_name,
    r.slug as role_slug
FROM users u
LEFT JOIN roles r ON u."roleId" = r.id
WHERE u.email = 'testuser@example.com';

-- Expected: role_name = 'Client', role_slug = 'client'

-- Check OTP was created for email verification
SELECT 
    email,
    code,
    type,
    "expiresAt",
    "createdAt"
FROM auth_verifications 
WHERE email = 'testuser@example.com' 
  AND type = 'verify_email'
ORDER BY "createdAt" DESC 
LIMIT 1;

-- Expected: 6-digit code, expires in 1 hour
```

**Error Scenarios:**

| Scenario | Request | Expected Status | Expected Message |
|----------|---------|----------------|------------------|
| Missing email | `{"password": "test", "fullName": "Test"}` | 400 | Email required |
| Invalid email | `{"email": "invalid", ...}` | 400 | Invalid email format |
| Weak password | `{"email": "test@test.com", "password": "123"}` | 400 | Password must be at least 8 characters |
| Duplicate email | Same email twice | 400/409 | Email already exists |

**Console Output:**
Check your backend console for OTP code:
```
==========================================
📧 EMAIL VERIFICATION OTP
==========================================
Email: testuser@example.com
OTP Code: 123456
Expires At: 2024-01-15T12:30:00.000Z
==========================================
```

---

### 4. Verify Email

**Endpoint:** `POST {{baseUrl}}/auth/verify-email`

**Alternative:** `GET {{baseUrl}}/auth/verify-email?email={{testEmail}}&code={{otpCode}}`

**Description:** Verify user email with OTP code

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "{{testEmail}}",
  "code": "{{otpCode}}"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "testuser@example.com",
    "isVerified": true
  },
  "message": "Email verified successfully"
}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Email is verified", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.isVerified).to.be.true;
});
```

**Database Verification:**
```sql
-- Check user is now verified
SELECT 
    email,
    "isVerified",
    "createdAt"
FROM users 
WHERE email = 'testuser@example.com';

-- Expected: isVerified = true

-- Check verification code was deleted
SELECT * FROM auth_verifications 
WHERE email = 'testuser@example.com' 
  AND type = 'verify_email';

-- Expected: No rows (code was deleted after use)
```

**Error Scenarios:**

| Scenario | Request | Expected Status | Expected Message |
|----------|---------|----------------|------------------|
| Invalid code | `{"email": "...", "code": "000000"}` | 400/404 | Invalid or expired code |
| Expired code | Code older than 1 hour | 400/404 | Invalid or expired code |
| Wrong email | `{"email": "wrong@email.com", "code": "..."}` | 400/404 | Invalid or expired code |

---

### 5. Login

**Endpoint:** `POST {{baseUrl}}/auth/login`

**Description:** Authenticate user and get access tokens

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "{{testEmail}}",
  "password": "{{testPassword}}"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "testuser@example.com",
      "fullName": "Test User",
      "companyName": "Test Company",
      "role": {
        "id": "role-id",
        "name": "Client",
        "slug": "client"
      },
      "isVerified": true,
      "isActive": true
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains access token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('accessToken');
    pm.expect(jsonData.data.accessToken).to.be.a('string');
    
    // Save tokens to environment
    pm.environment.set("accessToken", jsonData.data.accessToken);
    pm.environment.set("refreshToken", jsonData.data.refreshToken);
});

pm.test("Response contains user data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('user');
    pm.expect(jsonData.data.user).to.have.property('email');
    pm.expect(jsonData.data.user).to.have.property('role');
});

pm.test("User is verified", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.user.isVerified).to.be.true;
});
```

**Database Verification:**
```sql
-- Check refresh token was created
SELECT 
    id,
    "userId",
    token,
    "expiresAt",
    "createdAt"
FROM refresh_tokens 
WHERE "userId" = (
    SELECT id FROM users WHERE email = 'testuser@example.com'
)
ORDER BY "createdAt" DESC 
LIMIT 1;

-- Expected: New refresh token with expiration date
```

**Error Scenarios:**

| Scenario | Request | Expected Status | Expected Message |
|----------|---------|----------------|------------------|
| Wrong password | `{"email": "...", "password": "wrong"}` | 401 | Invalid credentials |
| Unverified email | User not verified | 403 | Email not verified |
| Inactive user | User isActive = false | 403 | Account is inactive |
| User not found | `{"email": "nonexistent@email.com"}` | 401 | Invalid credentials |

---

### 6. Forgot Password

**Endpoint:** `POST {{baseUrl}}/auth/forgot-password`

**Description:** Request password reset OTP code

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "{{testEmail}}"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": null,
  "message": "If an account exists with this email, a password reset link has been sent."
}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is successful", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
});
```

**Database Verification:**
```sql
-- Check OTP was created
SELECT 
    email,
    code,
    type,
    "expiresAt",
    "createdAt"
FROM auth_verifications 
WHERE email = 'testuser@example.com' 
  AND type = 'reset_password'
ORDER BY "createdAt" DESC 
LIMIT 1;

-- Expected: 6-digit code, expires in 1 hour
```

**Console Output:**
Check your backend console for OTP code:
```
==========================================
🔐 PASSWORD RESET OTP
==========================================
Email: testuser@example.com
OTP Code: 654321
Expires At: 2024-01-15T13:30:00.000Z
==========================================
```

**Note:** Copy the OTP code from console and set it in environment variable `otpCode` for reset password request.

**Error Scenarios:**

| Scenario | Request | Expected Status | Expected Message |
|----------|---------|----------------|------------------|
| Invalid email | `{"email": "invalid"}` | 400 | Invalid email format |
| Rate limit | Too many requests | 429 | Too many requests |

---

### 7. Reset Password

**Endpoint:** `POST {{baseUrl}}/auth/reset-password`

**Description:** Reset password using OTP code

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "{{testEmail}}",
  "code": "{{otpCode}}",
  "newPassword": "NewSecurePassword123!"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": null,
  "message": "Password reset successful"
}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Password reset successful", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
    pm.expect(jsonData.message).to.include("successful");
});
```

**Database Verification:**
```sql
-- Check password was updated
SELECT 
    id,
    email,
    "passwordHash",
    "updatedAt"
FROM users 
WHERE email = 'testuser@example.com';

-- Expected: passwordHash is different from before

-- Check OTP was deleted
SELECT * FROM auth_verifications 
WHERE email = 'testuser@example.com' 
  AND type = 'reset_password';

-- Expected: No rows (code was deleted after use)
```

**Error Scenarios:**

| Scenario | Request | Expected Status | Expected Message |
|----------|---------|----------------|------------------|
| Invalid code | `{"code": "000000"}` | 400/404 | Invalid or expired reset code |
| Weak password | `{"newPassword": "123"}` | 400 | Password must be at least 8 characters |
| Expired code | Code older than 1 hour | 400/404 | Invalid or expired reset code |

---

### 8. Refresh Token

**Endpoint:** `POST {{baseUrl}}/auth/refresh-token`

**Description:** Get new access token using refresh token

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "{{refreshToken}}"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Token refreshed successfully"
}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("New access token received", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('accessToken');
    
    // Update access token
    pm.environment.set("accessToken", jsonData.data.accessToken);
    
    // Update refresh token if new one provided
    if (jsonData.data.refreshToken) {
        pm.environment.set("refreshToken", jsonData.data.refreshToken);
    }
});
```

**Error Scenarios:**

| Scenario | Request | Expected Status | Expected Message |
|----------|---------|----------------|------------------|
| Invalid token | `{"refreshToken": "invalid"}` | 401 | Invalid refresh token |
| Expired token | Expired refresh token | 401 | Refresh token expired |

---

### 9. Logout

**Endpoint:** `POST {{baseUrl}}/auth/logout`

**Description:** Logout user and invalidate refresh token

**Headers:**
```
Authorization: Bearer {{accessToken}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "{{refreshToken}}"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": null,
  "message": "Logout successful"
}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Logout successful", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.be.true;
    
    // Clear tokens from environment
    pm.environment.unset("accessToken");
    pm.environment.unset("refreshToken");
});
```

**Database Verification:**
```sql
-- Check refresh token was deleted
SELECT * FROM refresh_tokens 
WHERE token = '{{refreshToken}}';

-- Expected: No rows (token was deleted)
```

---

## 🔒 Protected Endpoints

All protected endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer {{accessToken}}
```

---

### 10. Get User Profile

**Endpoint:** `GET {{baseUrl}}/users/me`

**Description:** Get current authenticated user's profile

**Headers:**
```
Authorization: Bearer {{accessToken}}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "testuser@example.com",
    "fullName": "Test User",
    "companyName": "Test Company",
    "role": {
      "id": "role-id",
      "name": "Client",
      "slug": "client"
    },
    "isVerified": true,
    "isActive": true,
    "createdAt": "2024-01-15T10:00:00.000Z"
  },
  "message": "User profile retrieved successfully"
}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains user data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('email');
    pm.expect(jsonData.data).to.have.property('role');
});
```

**Error Scenarios:**

| Scenario | Expected Status | Expected Message |
|----------|----------------|------------------|
| No token | 401 | Unauthorized |
| Invalid token | 401 | Invalid token |
| Expired token | 401 | Token expired |

---

### 11. Update User Settings

**Endpoint:** `PUT {{baseUrl}}/users/settings`

**Description:** Update user settings

**Headers:**
```
Authorization: Bearer {{accessToken}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "notifications": true,
  "theme": "dark"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Settings updated"
  },
  "message": "Settings updated successfully"
}
```

---

### 12. Create Project

**Endpoint:** `POST {{baseUrl}}/projects`

**Description:** Create a new project

**Headers:**
```
Authorization: Bearer {{accessToken}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "E-commerce Platform",
  "description": "Building a modern e-commerce platform with React and Node.js",
  "industry": "Retail",
  "type": "Web Application"
}
```

**Minimal Request:**
```json
{
  "name": "My New Project"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "E-commerce Platform",
    "description": "Building a modern e-commerce platform...",
    "industry": "Retail",
    "type": "Web Application",
    "status": "ON_TRACK",
    "userId": "user-id",
    "createdAt": "2024-01-15T10:00:00.000Z"
  },
  "message": "Project created successfully"
}
```

**Test Script:**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Project created with ID", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('id');
    
    // Save project ID
    pm.environment.set("projectId", jsonData.data.id);
});
```

**Database Verification:**
```sql
-- Check project was created
SELECT 
    id,
    name,
    description,
    industry,
    type,
    status,
    "userId",
    "createdAt"
FROM projects 
WHERE "userId" = '{{userId}}'
ORDER BY "createdAt" DESC 
LIMIT 1;

-- Expected: New project with user ID
```

---

### 13. Get All Projects

**Endpoint:** `GET {{baseUrl}}/projects`

**Description:** Get all projects for authenticated user

**Headers:**
```
Authorization: Bearer {{accessToken}}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "E-commerce Platform",
        "description": "...",
        "status": "ON_TRACK",
        "createdAt": "2024-01-15T10:00:00.000Z"
      }
    ],
    "total": 1
  },
  "message": "Projects retrieved successfully"
}
```

**Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains projects array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.have.property('projects');
    pm.expect(jsonData.data.projects).to.be.an('array');
});
```

---

### 14. Create Invoice

**Endpoint:** `POST {{baseUrl}}/finance/invoices`

**Description:** Create a new invoice

**Headers:**
```
Authorization: Bearer {{accessToken}}
Content-Type: application/json
```

**Request Body:**
```json
{
  "projectId": "{{projectId}}",
  "amount": 5000.00,
  "dueDate": "2024-02-15",
  "description": "Q1 Development Services"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "message": "Invoice created"
  },
  "message": "Invoice created successfully"
}
```

---

### 15. List Invoices

**Endpoint:** `GET {{baseUrl}}/finance/invoices`

**Description:** Get all invoices for authenticated user

**Headers:**
```
Authorization: Bearer {{accessToken}}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "invoices": [],
    "total": 0
  },
  "message": "Invoices retrieved successfully"
}
```

---

### 16. List Blogs

**Endpoint:** `GET {{baseUrl}}/content/blogs`

**Description:** Get list of blog posts

**Headers:** (No authentication required)

**Expected Response (200):**
```json
{
  "message": "List blog posts"
}
```

---

### 17. List Products

**Endpoint:** `GET {{baseUrl}}/content/products`

**Description:** Get list of products

**Headers:** (No authentication required)

**Expected Response (200):**
```json
{
  "message": "List products"
}
```

---

## 🤖 Test Scripts & Automation

### Collection-Level Test Script

Add this to your collection's **Pre-request Script**:

```javascript
// Set base URL if not set
if (!pm.environment.get("baseUrl")) {
    pm.environment.set("baseUrl", "http://localhost:5000/api/v1");
}

// Log request details
console.log("Request:", pm.request.method, pm.request.url);
```

Add this to your collection's **Tests**:

```javascript
// Global response time check
pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

// Global response format check
pm.test("Response has correct structure", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData).to.have.property('message');
});
```

### Automated Test Flow

Create a **Collection Runner** script:

1. Click on collection → **Run**
2. Select requests in order:
   - Register
   - Verify Email (manual OTP entry)
   - Login
   - Get Profile
   - Create Project
   - Get All Projects
3. Click **Run Qodet API - Complete Testing**

### Environment Variable Auto-Population

**Login Test Script (Enhanced):**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Auto-save tokens
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.data && jsonData.data.accessToken) {
        pm.environment.set("accessToken", jsonData.data.accessToken);
        pm.environment.set("refreshToken", jsonData.data.refreshToken);
        pm.environment.set("userId", jsonData.data.user.id);
        console.log("✅ Tokens saved to environment");
    }
}
```

---

## 🗄️ Database Verification

### Quick Verification Queries

**Check User Registration:**
```sql
SELECT 
    u.id,
    u.email,
    u."fullName",
    u."isVerified",
    r.name as role_name
FROM users u
LEFT JOIN roles r ON u."roleId" = r.id
WHERE u.email = 'testuser@example.com';
```

**Check OTP Codes:**
```sql
-- All active OTPs
SELECT 
    email,
    code,
    type,
    "expiresAt",
    "createdAt",
    CASE 
        WHEN "expiresAt" > NOW() THEN 'Active'
        ELSE 'Expired'
    END as status
FROM auth_verifications
WHERE "expiresAt" > NOW()
ORDER BY "createdAt" DESC;
```

**Check Refresh Tokens:**
```sql
SELECT 
    rt.id,
    u.email,
    rt."expiresAt",
    rt."createdAt",
    CASE 
        WHEN rt."expiresAt" > NOW() THEN 'Active'
        ELSE 'Expired'
    END as status
FROM refresh_tokens rt
JOIN users u ON rt."userId" = u.id
ORDER BY rt."createdAt" DESC
LIMIT 10;
```

**Check Projects:**
```sql
SELECT 
    p.id,
    p.name,
    p.status,
    u.email as owner_email,
    p."createdAt"
FROM projects p
JOIN users u ON p."userId" = u.id
ORDER BY p."createdAt" DESC;
```

**Check Leads:**
```sql
SELECT 
    l.id,
    l.email,
    u.email as linked_user_email,
    l."createdAt"
FROM leads l
LEFT JOIN users u ON l."userId" = u.id
ORDER BY l."createdAt" DESC
LIMIT 10;
```

**Check Estimates:**
```sql
SELECT 
    e.id,
    e."refCode",
    e."costLow",
    e."costHigh",
    u.email as user_email,
    e."createdAt"
FROM estimates e
LEFT JOIN users u ON e."userId" = u.id
ORDER BY e."createdAt" DESC
LIMIT 10;
```

---

## ❌ Error Scenarios

### Common Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "data": null,
  "message": "Validation error",
  "errors": [
    "Email is required",
    "Password must be at least 8 characters"
  ]
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "data": null,
  "message": "Unauthorized",
  "errors": ["Invalid credentials"]
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "data": null,
  "message": "Forbidden",
  "errors": ["Email not verified"]
}
```

**404 Not Found:**
```json
{
  "success": false,
  "data": null,
  "message": "Not found",
  "errors": ["Resource not found"]
}
```

**429 Too Many Requests:**
```json
{
  "success": false,
  "data": null,
  "message": "Too many requests",
  "errors": ["Rate limit exceeded"]
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "data": null,
  "message": "Internal server error",
  "errors": ["An unexpected error occurred"]
}
```

### Testing Error Scenarios

Create separate requests for error testing:

1. **Invalid Email Format**
   - Request: `{"email": "invalid-email"}`
   - Expected: 400 with validation error

2. **Missing Required Fields**
   - Request: `{}`
   - Expected: 400 with field-specific errors

3. **Unauthorized Access**
   - Request: Protected endpoint without token
   - Expected: 401 Unauthorized

4. **Invalid Token**
   - Request: Protected endpoint with invalid token
   - Expected: 401 Invalid token

5. **Expired Token**
   - Request: Protected endpoint with expired token
   - Expected: 401 Token expired

---

## 💡 Best Practices

### 1. Environment Management
- Use separate environments for dev/staging/prod
- Never commit tokens to version control
- Use variables for all dynamic values

### 2. Request Organization
- Group related requests in folders
- Use descriptive names for requests
- Add descriptions to each request

### 3. Test Scripts
- Write tests for every request
- Test both success and error scenarios
- Use descriptive test names

### 4. Documentation
- Add request descriptions
- Document expected responses
- Include example requests

### 5. Security
- Never share access tokens
- Use environment variables for sensitive data
- Clear tokens after testing

### 6. Performance
- Test response times
- Monitor rate limits
- Test concurrent requests

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to server"

**Solution:**
1. Verify backend server is running: `npm run dev`
2. Check port 5000 is not in use
3. Verify baseUrl in environment: `http://localhost:5000/api/v1`

### Issue: "401 Unauthorized"

**Solution:**
1. Check if token is set in environment
2. Verify token is not expired
3. Try logging in again to get new token
4. Check Authorization header format: `Bearer {{accessToken}}`

### Issue: "400 Validation Error"

**Solution:**
1. Check request body matches schema
2. Verify all required fields are present
3. Check data types (string, number, etc.)
4. Review validator schemas in code

### Issue: "Database errors"

**Solution:**
1. Verify database is running
2. Check migrations are applied: `npx prisma migrate dev`
3. Verify Prisma client is generated: `npx prisma generate`
4. Check database connection string in `.env`

### Issue: "OTP code not working"

**Solution:**
1. Check backend console for OTP code
2. Verify code hasn't expired (1 hour limit)
3. Check email matches exactly
4. Verify code type (verify_email vs reset_password)

### Issue: "Rate limit exceeded"

**Solution:**
1. Wait for rate limit window to reset
2. Check rate limit settings in code
3. Use different test email if needed
4. Reduce request frequency

### Issue: "Token expired"

**Solution:**
1. Use refresh token endpoint to get new access token
2. Or login again to get new tokens
3. Check token expiration time in JWT config

---

## 📚 Quick Reference

### Base URLs
- **Local:** `http://localhost:5000/api/v1`
- **Staging:** `https://api-staging.qodet.com/api/v1`
- **Production:** `https://api.qodet.com/api/v1`

### Authentication Flow
1. Register → Get OTP in console
2. Verify Email → Use OTP code
3. Login → Get access & refresh tokens
4. Use access token for protected endpoints
5. Refresh token when expired

### Common Headers
```
Content-Type: application/json
Authorization: Bearer {{accessToken}}
```

### Response Times
- Public endpoints: < 500ms
- Auth endpoints: < 1000ms
- Protected endpoints: < 2000ms

### Rate Limits
- Auth endpoints: 5 requests/minute
- Public endpoints: 10 requests/minute
- Protected endpoints: 100 requests/minute

### Token Expiration
- Access Token: 15 minutes (default)
- Refresh Token: 7 days (default)
- OTP Codes: 1 hour

---

## 📝 Testing Checklist

### Pre-Testing
- [ ] Backend server running
- [ ] Database connected
- [ ] Migrations applied
- [ ] Seed data loaded
- [ ] Postman environment configured
- [ ] Collection imported

### Public Endpoints
- [ ] Contact form submission
- [ ] Generate estimate
- [ ] Database verification

### Authentication
- [ ] User registration
- [ ] Email verification
- [ ] User login
- [ ] Forgot password
- [ ] Reset password
- [ ] Refresh token
- [ ] Logout

### Protected Endpoints
- [ ] Get user profile
- [ ] Update settings
- [ ] Create project
- [ ] Get all projects
- [ ] Create invoice
- [ ] List invoices

### Error Scenarios
- [ ] Invalid email format
- [ ] Missing required fields
- [ ] Unauthorized access
- [ ] Invalid tokens
- [ ] Rate limit exceeded

### Database Verification
- [ ] User created correctly
- [ ] OTP codes generated
- [ ] Tokens stored
- [ ] Projects linked to users
- [ ] Leads created

---

## 🎯 Conclusion

This guide covers all aspects of testing the Qodet API with Postman. Follow the workflow, use the test scripts, and verify results in the database. For issues, refer to the troubleshooting section.

**Happy Testing! 🚀**

---

## 📞 Support

For issues or questions:
1. Check backend console logs
2. Review database queries
3. Verify environment variables
4. Check API documentation

---

**Last Updated:** 2024-01-15
**Version:** 1.0.0
**API Version:** v1

