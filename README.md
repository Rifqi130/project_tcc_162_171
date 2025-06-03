# 📚 Hogwarts Library API Documentation

Base URL:  
```
http://localhost:5001
```

---

## Table of Contents

- [User API](#user-api)
- [Book API](#book-api)
- [Admin API](#admin-api)
- [Error Response](#error-response)

---

## User API

### GET `/users`
Get all users/members.
- **Response:**
    ```json
    [
      { "id": 1, "name": "Harry", "asrama": "Gryffindor" },
      ...
    ]
    ```

### GET `/users/:id`
Get user/member by ID.
- **Response:**
    ```json
    { "id": 1, "name": "Harry", "asrama": "Gryffindor" }
    ```

### POST `/users`
Create a new user/member.
- **Body:**
    ```json
    {
      "name": "Hermione",
      "asrama": "Gryffindor"
    }
    ```
- **Response:**
    ```json
    { "msg": "User Created" }
    ```

### PATCH `/users/:id`
Update user/member data.
- **Body:**
    ```json
    {
      "name": "Hermione Granger",
      "asrama": "Gryffindor"
    }
    ```
- **Response:**
    ```json
    { "msg": "User Updated" }
    ```

### DELETE `/users/:id`
Delete a user/member.
- **Response:**
    ```json
    { "msg": "User Deleted" }
    ```

---

## Book API

### GET `/books`
Get all books.
- **Response:**
    ```json
    [
      { "id": 1, "judul": "Sihir Ampuh", "tahun_terbit": "1927 SM" },
      ...
    ]
    ```

### GET `/books/:id`
Get book by ID.
- **Response:**
    ```json
    { "id": 1, "judul": "Sihir Ampuh", "tahun_terbit": "1927 SM" }
    ```

### POST `/books`
Create a new book.
- **Body:**
    ```json
    {
      "judul": "Sihir Ampuh",
      "tahun_terbit": "1927 SM"
    }
    ```
- **Response:**
    ```json
    { "msg": "Book Created" }
    ```

### PATCH `/books/:id`
Update book data.
- **Body:**
    ```json
    {
      "judul": "Sihir Ampuh Updated",
      "tahun_terbit": "1927 SM"
    }
    ```
- **Response:**
    ```json
    { "msg": "Book Updated" }
    ```

### DELETE `/books/:id`
Delete a book.
- **Response:**
    ```json
    { "msg": "Book Deleted" }
    ```

---

## Admin API

### POST `/admins/login`
Admin login.
- **Body:**
    ```json
    {
      "name": "admin",
      "password": "admin123"
    }
    ```
- **Response (success):**
    ```json
    { "msg": "Login success" }
    ```
- **Response (fail):**
    ```json
    { "error": "Username or password incorrect" }
    ```

### GET `/admins`
Get all admins.
- **Response:**
    ```json
    [
      { "id": 1, "name": "admin", "password": "admin123" },
      ...
    ]
    ```

### GET `/admins/:id`
Get admin by ID.
- **Response:**
    ```json
    { "id": 1, "name": "admin", "password": "admin123" }
    ```

### POST `/admins`
Create a new admin.
- **Body:**
    ```json
    {
      "name": "admin2",
      "password": "password"
    }
    ```
- **Response:**
    ```json
    { "msg": "Admin Created" }
    ```

### PATCH `/admins/:id`
Update admin data.
- **Body:**
    ```json
    {
      "name": "admin2",
      "password": "newpassword"
    }
    ```
- **Response:**
    ```json
    { "msg": "Admin Updated" }
    ```

### DELETE `/admins/:id`
Delete an admin.
- **Response:**
    ```json
    { "msg": "Admin Deleted" }
    ```

---

## Error Response

If a server error occurs:
```json
{ "error": "Internal Server Error" }
```

---

**Notes:**
- All endpoints use and return JSON.
- Admin login does not use token/session, only returns success or error.
- For testing, you can use the provided `request.rest` file in the backend folder.
