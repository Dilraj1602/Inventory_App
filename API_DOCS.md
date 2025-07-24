# Inventory Management API Documentation

## Base URL
`http://localhost:5000/api/v1`

---

## Authentication

### Register
- **Endpoint:** `POST /register`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `201 Created` on success
  - `400` on validation error

### Login
- **Endpoint:** `POST /login`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK` with `{ "token": "JWT_TOKEN" }` on success
  - `401` on invalid credentials

---

## Products (Auth: Bearer JWT required)

### Add Product
- **Endpoint:** `POST /products`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "string",
    "type": "string",
    "sku": "string",
    "image_url": "string",
    "description": "string",
    "quantity": 0,
    "price": 0
  }
  ```
- **Response:**
  - `201 Created` with `{ "id": "product_id", "message": "Product added successfully." }`
  - `400` on validation error

### Update Product Quantity
- **Endpoint:** `PUT /products/:id/quantity`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "quantity": 0
  }
  ```
- **Response:**
  - `200 OK` with updated product info or confirmation
  - `404` if product not found

### Get Products (Paginated)
- **Endpoint:** `GET /products?page=1&limit=8`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - `200 OK` with
    ```json
    {
      "products": [ ... ],
      "page": 1,
      "pages": 5
    }
    ```

---

## Error Responses
- All errors return `{ "message": "error description" }` and appropriate HTTP status code.

---

## Auth
- All `/products` endpoints require `Authorization: Bearer <token>` header.
- Register and login do not require auth. 