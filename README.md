# Inventory Management App (MERN)

A simple inventory management system with user authentication, product management, and a modern React + Tailwind CSS frontend.

## Features
- User registration & login (JWT auth)
- Add, update, and list products
- Product quantity update
- Pagination for product list
- Responsive, modern UI (React + Tailwind)
- API docs (OpenAPI/Swagger)

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Frontend:** React, Tailwind CSS, Axios, React Router

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or Atlas)

### Backend Setup
1. `cd backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:5000` by default.

### Frontend Setup
1. `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm start
   ```
   The app runs on `http://localhost:3000` by default.

## API Documentation
- The backend exposes REST APIs for authentication and product management.
- See [API_DOCS.md](API_DOCS.md) for detailed OpenAPI/Swagger documentation.
- You can also use the provided Postman collection (`postman_collection.json`) for testing.

## Environment Variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT signing

## Testing APIs
- Use Postman or VSCode REST Client (`backend/test.http`) to test endpoints.
- Example endpoints:
  - `POST /api/v1/register` — Register user
  - `POST /api/v1/login` — Login, get JWT
  - `POST /api/v1/products` — Add product (auth required)
  - `PUT /api/v1/products/:id/quantity` — Update quantity (auth required)
  - `GET /api/v1/products` — List products (auth required)

## License
MIT 