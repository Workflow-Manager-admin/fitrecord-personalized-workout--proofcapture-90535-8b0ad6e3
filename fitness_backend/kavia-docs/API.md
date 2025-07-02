# Fitness Backend API Documentation

This document provides an up-to-date overview of all REST API endpoints implemented in the backend server of the fitness application. The API supports user authentication, personalized exercise recommendations, workout proof upload, workout history, and health checks. Where required, JWT-based authentication is enforced with a `Bearer` token in the `Authorization` header.

## Authentication

Most endpoints, except registration, login, and basic health checks, require a Bearer JWT token. To obtain a token, users must log in with their credentials.

---

## Authentication & User APIs

### Register User

**POST** `/auth/register`

Create a new user account and profile.

**Request Body (`application/json`):**
```json
{
  "username": "string",    // required, unique
  "password": "string",    // required
  "weight": 75,            // required, number (kg)
  "height": 170            // required, number (cm)
}
```

**Responses:**
- `201 Created` — Registration successful, returns `{ userId, username, message }`
- `400 Bad Request` — Validation error or username taken

Authentication: _None_

---

### Login

**POST** `/auth/login`

Authenticate a user and acquire a JWT.

**Request Body (`application/json`):**
```json
{
  "username": "string",
  "password": "string"
}
```

**Responses:**
- `200 OK` — Returns access token and user info:
  ```json
  {
    "token": "jwt-token-string",
    "user": { "userId": 1, "username": "name", "weight": 75, "height": 170 }
  }
  ```
- `401 Unauthorized` — Incorrect credentials

Authentication: _None_

---

### Get User Profile

**GET** `/auth/profile`

Get the authenticated user's profile info.

**Headers:**
- `Authorization: Bearer <token>`

**Responses:**
- `200 OK` — User info:
  ```json
  {
    "userId": 1,
    "username": "name",
    "weight": 75,
    "height": 170
  }
  ```
- `401 Unauthorized` — Invalid or missing token

Authentication: _Required_

---

## Profile APIs

### Update Profile

**PUT** `/profile`

Update the weight and/or height for the authenticated user.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body (`application/json`):**
```json
{
  "weight": 78,      // (optional) number (kg)
  "height": 172      // (optional) number (cm)
}
```

**Responses:**
- `200 OK` — `{ weight, height, message }`
- `400 Bad Request` — Profile not found or invalid input

Authentication: _Required_

---

## Exercise APIs

### Get Personalized Exercise Suggestion

**POST** `/exercise/suggest`

Returns a suggested workout routine based on the user's weight and height using basic BMI logic.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body (`application/json`):**
```json
{
  "weight": 75,      // required
  "height": 170      // required
}
```

**Responses:**
- `200 OK` — Returns an object like
  ```json
  {
    "bmi": 25.7,
    "suggestion": "Aerobic (running, cycling) and moderate resistance training"
  }
  ```
- `400 Bad Request` — Missing weight or height

Authentication: _Required_

---

## Workout APIs

### Log Workout Session

**POST** `/workout/log`

Log a workout session for the authenticated user. Optionally includes a file upload as proof.

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body (multipart/form-data):**
- `exercise` (string): Name/type of exercise performed (**required**)
- `proof` (file, binary): Image or video file as workout proof (optional)

**Responses:**
- `201 Created` — Session recorded, returns workout session details
- `400 Bad Request` — Invalid input or session not saved

Authentication: _Required_

---

### Get Workout History

**GET** `/workout/history`

Retrieve the authenticated user's workout history (up to 30 most recent sessions).

**Headers:**
- `Authorization: Bearer <token>`

**Responses:**
- `200 OK` — Returns an array of workout sessions, each like:
  ```json
  [
    {
      "id": 1,
      "date": "2024-06-07T12:00:00Z",
      "exercise": "Running",
      "proofFile": "/uploads/..."

    }
    // ...
  ]
  ```
- `401 Unauthorized` — Invalid token

Authentication: _Required_

---

## Health and Database Checks

### Service Health Check

**GET** `/`

Returns health status for the application and environment info.

**Responses:**
- `200 OK`
  ```json
  {
    "status": "ok",
    "message": "Service is healthy",
    "timestamp": "2024-06-07T09:43:00.000Z",
    "environment": "development"
  }
  ```

Authentication: _None_

---

### Database Health Check

**GET** `/db/health`

Checks database connectivity, read, and write status.

**Responses:**
- `200 OK`
  ```json
  {
    "status": "ok",
    "message": "DB is healthy",
    "timestamp": "2024-06-07T09:45:00.000Z"
  }
  ```
- `503 Service Unavailable`
  ```json
  {
    "status": "fail",
    "message": "DB writable check failed"
  }
  ```

Authentication: _None_

---

## Authentication/Authorization Schema

All authenticated endpoints require a Bearer token issued by `/auth/login`. Include it in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

If the token is missing or invalid, you will receive a `401 Unauthorized` or `403 Forbidden` response.

---

## Error Response Format

Most error responses are structured as follows:

```json
{
  "message": "Error description"
}
```

---

## File Uploads

For file uploads (workout proof), use multipart/form-data with the parameter name `proof`.

---

## OpenAPI/Swagger

Swagger UI is available at `/docs` at runtime. All endpoints described above are included in the generated OpenAPI spec.

---

## Summary Table of Endpoints

| Method | Path               | Auth      | Description                       |
|--------|--------------------|-----------|-----------------------------------|
| POST   | /auth/register     | No        | Register new user/profile         |
| POST   | /auth/login        | No        | User login, get JWT               |
| GET    | /auth/profile      | Yes       | Get own profile info              |
| PUT    | /profile           | Yes       | Update weight/height              |
| POST   | /exercise/suggest  | Yes       | Get exercise suggestion           |
| POST   | /workout/log       | Yes       | Log workout (with optional proof) |
| GET    | /workout/history   | Yes       | Get workout history               |
| GET    | /                  | No        | Service health check              |
| GET    | /db/health         | No        | Database health check             |


---

## Notes

- All times are in ISO 8601 format (UTC).
- JWT expires after 12 hours by default.
- Uploaded proof files are stored under `/uploads/`.

---

Task completed: Up-to-date API documentation matching all implemented backend routes, parameters, request/response bodies, and authentication requirements.
