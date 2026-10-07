# 💰 MERN Expense Tracker

A full-stack **expense tracking application** built with the MERN stack. Users can securely register and log in, manage their personal expenses, and view their spending data through a simple dashboard.

The project uses **JWT-based authentication**, protected API routes, MongoDB for persistent storage, and a React frontend communicating with an Express/Node.js backend.

---

## 🚀 Features

* 🔐 **JWT Authentication**

  * User registration and login
  * Password hashing with bcrypt
  * Token-based authentication
  * Protected routes

* 💸 **Expense Management**

  * Add expenses
  * View expenses
  * Update expenses
  * Delete expenses
  * Categorize expenses

* 📊 **Expense Dashboard**

  * View total spending
  * Track expenses by category
  * Monitor recent transactions

* 🛡️ **Secure Backend**

  * Protected API endpoints
  * Passwords stored as hashes
  * JWT middleware for authenticated requests

* 🌐 **REST API**

  * React frontend communicates with the Express backend through REST APIs

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

### Development Tools

* Git
* GitHub
* Postman
* VS Code

---

## 🏗️ Architecture

```text
React + Vite
     │
     │ HTTP / REST API
     ↓
Express.js + Node.js
     │
     ├── JWT Authentication
     ├── Auth Middleware
     ├── Expense Routes
     └── User Routes
     │
     ↓
Mongoose
     │
     ↓
MongoDB
```

---

## 📁 Project Structure

```text
expense-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication Flow

The application uses **JSON Web Tokens (JWT)** to authenticate users.

```text
User
 │
 ↓
Login / Register
 │
 ↓
Express API
 │
 ↓
Validate credentials
 │
 ↓
Generate JWT
 │
 ↓
Client stores token
 │
 ↓
Token attached to protected requests
 │
 ↓
JWT Middleware
 │
 ↓
Protected Controller
```

Protected endpoints verify the JWT before allowing access to user-specific expense data.

---

## 💾 Expense Categories

Expenses can be organized into categories such as:

* 🍔 Food
* 🚗 Transport
* 🛍️ Shopping
* 🏠 Bills
* 🎓 Education
* 🎬 Entertainment
* 💻 Technology
* 📦 Other

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd expense-tracker
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit `.env` files to GitHub.

Add them to `.gitignore`:

```text
.env
node_modules/
```

---

## ▶️ Running the Application

### Start the backend

```bash
cd server
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

Vite will provide the local frontend URL in the terminal.

---

## 🔌 Example API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Expenses

```http
GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

Protected expense routes require a valid JWT.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔒 Security

The application implements several basic security practices:

* Passwords are hashed using **bcrypt**
* Authentication uses **JWT**
* Protected routes require valid authentication
* User-specific expenses are associated with authenticated users
* Sensitive configuration is stored using environment variables

---

## 🧪 API Testing

The backend API can be tested using **Postman**.

Typical testing flow:

```text
Register User
     ↓
Login
     ↓
Receive JWT
     ↓
Add JWT to Authorization Header
     ↓
Access Protected Expense Routes
```

---

## 📌 Future Improvements

Possible future improvements include:

* 📈 Advanced spending analytics
* 📊 Interactive charts
* 🔎 Expense filtering and search
* 📅 Monthly/yearly reports
* 📤 CSV/PDF export
* 🌙 Dark mode
* 🔔 Budget alerts
* ☁️ Cloud deployment
* 📱 Responsive mobile UI

---

## 📚 What I Learned

This project helped strengthen my understanding of:

* Building REST APIs with Express
* Connecting Node.js applications to MongoDB
* Mongoose schemas and models
* JWT authentication
* Password hashing with bcrypt
* Protected API routes
* React frontend/backend integration
* HTTP requests with Axios
* Environment variables
* API testing with Postman
* Full-stack MERN application architecture

---

## 👩‍💻 Author

**Olivia Banerjee**

BTech CSE Student | Full-Stack Developer

Built with the **MERN stack**.
