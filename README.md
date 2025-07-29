# Inventory Management App (MERN)

A simple inventory management system with user authentication, product management, and a modern React + Tailwind CSS frontend.

## 🐳 Docker Setup (Recommended)

### Quick Start with Docker
1. **Build the Docker image:**
   ```bash
   docker build --no-cache -t inventory-app .
   ```

2. **Run the container:**
   ```bash
   docker run -p 5000:5000 inventory-app
   ```

3. **Access the application:**
   - **Frontend**: http://localhost:5000
   - **Backend API**: http://localhost:5000/api/v1

### Docker Commands
```bash
# Build the image
docker build --no-cache -t inventory-app .

# Run in foreground
docker run -p 5000:5000 inventory-app

# Run in background
docker run -d -p 5000:5000 inventory-app

# Run with custom name
docker run -d -p 5000:5000 --name inventory-container inventory-app

# View running containers
docker ps

# View logs
docker logs <container_id>

# Stop container
docker stop <container_id>
```

### Docker Features
- ✅ **Multi-stage build** for optimized production image
- ✅ **Static React build** served by Express backend
- ✅ **MongoDB integration** with proper environment setup
- ✅ **JWT authentication** with secure token handling
- ✅ **Responsive UI** with Tailwind CSS styling

---

## 🔄 Application Workflow

### User Journey Flow
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Landing Page  │───▶│   Login/Register│───▶│  Dashboard      │
│                 │    │                 │    │                 │
│ • Welcome       │    │ • JWT Auth      │    │ • Product List  │
│ • Navigation    │    │ • Form Validation│   │ • Add Products  │
│ • Call-to-Action│    │ • Error Handling│    │ • Update Qty    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Product List  │    │  Add Product    │    │  Update Product │
│                 │    │                 │    │                 │
│ • Pagination    │    │ • Form Input    │    │ • Quantity Edit │
│ • Search/Filter │    │ • Image URL     │    │ • Real-time     │
│ • Sort Options  │    │ • Validation    │    │ • API Update    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### System Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Landing   │  │   Login     │  │  Dashboard  │          │
│  │   Page      │  │   Form      │  │             │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│         │                │                │                   │
│         └────────────────┼────────────────┘                   │
│                          │                                    │
└──────────────────────────┼────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend (Node.js/Express)                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Auth      │  │   Products  │  │   Static    │          │
│  │   Routes    │  │   Routes    │  │   Files     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│         │                │                │                   │
│         └────────────────┼────────────────┘                   │
│                          │                                    │
└──────────────────────────┼────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Database (MongoDB)                      │
│  ┌─────────────┐  ┌─────────────┐                            │
│  │   Users     │  │   Products  │                            │
│  │   Collection│  │   Collection│                            │
│  └─────────────┘  └─────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

### API Request Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───▶│   Backend   │───▶│   JWT Auth  │───▶│  Database   │
│   (React)   │    │  (Express)  │    │  Middleware │    │ (MongoDB)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       ▲                   │                   │                   │
       │                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Response  │◀───│   Response  │◀───│   Response  │◀───│   Response  │
│   (JSON)    │    │   (JSON)    │    │   (JSON)    │    │   (Data)    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Authentication Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │───▶│   Login     │───▶│   JWT       │───▶│   Protected  │
│   Input     │    │   Form      │    │   Token     │    │   Routes     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Validation  │    │ bcrypt      │    │ Store in    │    │ Verify      │
│ (Frontend)  │    │ Compare     │    │ localStorage │    │ Token       │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Product Management Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Add       │───▶│   Form      │───▶│   API       │───▶│   Database  │
│   Product   │    │   Validation│    │   Request   │    │   Storage   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       ▲                   │                   │                   │
       │                   ▼                   ▼                   ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Success   │◀───│   Response  │◀───│   JWT       │◀───│   Product   │
│   Message   │    │   (JSON)    │    │   Auth      │    │   Created   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

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
- **Containerization:** Docker, Multi-stage builds

## Manual Setup Instructions

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
   PORT=
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

---

📸 API Testing Gallery
Need a quick look at how the APIs work? Check out the screenshots of tested endpoints via Postman:

➡️ Open Screenshot Folder on Google Drive https://drive.google.com/drive/folders/1K8nRj9Rl7aVaoqOulsg_vY6ra7yF-fWK?usp=drive_link

Includes:

✅ User Registration (/api/v1/register)

✅ User Login (/api/v1/login)

📦 Product Creation (/api/v1/products)

✏️ Quantity Update (/api/v1/products/:id/quantity)

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
