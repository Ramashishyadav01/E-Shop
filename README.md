<div align="center">

# 🛒 E-Shop

### A Full-Stack E-Commerce Platform Built with the MERN Stack

*Scalable. Secure. Seamless.*

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)](https://razorpay.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br/>

> **E-Shop** is a production-ready, full-stack e-commerce platform that brings together a powerful Node.js/Express backend and a dynamic React frontend. It supports multi-role access control, a full product catalog, a seamless shopping cart experience, and secure payment processing via Stripe and Razorpay — all wrapped in a responsive, mobile-first design.

<br/>

[📖 Documentation](#-table-of-contents) · [🚀 Quick Start](#-getting-started) · [🐛 Report a Bug](../../issues) · [✨ Request a Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [⚙️ Environment Variables](#️-environment-variables)
- [🚀 Getting Started](#-getting-started)
- [📡 API Reference](#-api-reference)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure user registration and login with **JSON Web Tokens (JWT)**
- Password hashing using **bcrypt**
- Protected routes on both frontend and backend
- Persistent session management via HTTP-only cookies / localStorage

### 👥 Role-Based Access Control
- **Customer** — Browse products, manage cart, place and track orders
- **Seller** — List and manage their own products, view their sales
- **Admin** — Full platform control: users, products, orders, and analytics

### 🛍️ Product Catalog
- Full product listing with **category filtering** and **search functionality**
- Detailed product pages with images, descriptions, pricing, and stock status
- Product ratings and review system

### 🛒 Shopping Cart & Checkout
- Real-time dynamic shopping cart with quantity controls
- Secure, multi-step checkout flow
- Order summary and confirmation

### 💳 Payment Integration
- Seamless payment processing via **Stripe** (international) and **Razorpay** (India)
- Secure webhook handling for payment status updates
- Order creation on successful payment confirmation

### 📱 Responsive Design
- Fully responsive UI optimized for **mobile, tablet, and desktop**
- Clean, intuitive user experience across all screen sizes

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React.js** | UI library for building component-based interfaces |
| **React Router DOM** | Client-side navigation and routing |
| **Redux / Context API** | Global state management (cart, user session) |
| **Axios** | HTTP client for API requests |
| **Stripe.js / Razorpay SDK** | Client-side payment integration |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for building RESTful APIs |
| **JWT (jsonwebtoken)** | Stateless authentication tokens |
| **bcryptjs** | Password hashing and salting |
| **Mongoose** | MongoDB ODM for schema modeling |
| **Stripe SDK** | Server-side payment processing |
| **Razorpay SDK** | Server-side payment processing (India) |
| **dotenv** | Environment variable management |
| **cors** | Cross-Origin Resource Sharing middleware |

### Database & Tools
| Technology | Purpose |
|---|---|
| **MongoDB** | NoSQL database for flexible data storage |
| **MongoDB Atlas** | Cloud-hosted MongoDB service (recommended) |
| **Postman** | API testing and documentation |
| **Git & GitHub** | Version control and collaboration |

---

## 📁 Folder Structure

```
E-Shop/
│
├── ecom-node/                  # 🖥️  Backend — Node.js / Express API
│   ├── config/                 #     Database connection, environment config
│   ├── controllers/            #     Route handler logic (users, products, orders)
│   ├── middleware/             #     Auth guards, error handlers, role checks
│   ├── models/                 #     Mongoose schemas (User, Product, Order)
│   ├── routes/                 #     Express route definitions
│   ├── utils/                  #     Helper functions, payment utilities
│   ├── .env                    #     ⚠️  Environment variables (never commit!)
│   ├── server.js               #     Entry point — starts the Express server
│   └── package.json
│
├── E-Commerce -Frontend/       # 🌐  Frontend — React.js Application
│   ├── public/                 #     Static assets (index.html, favicon)
│   ├── src/
│   │   ├── assets/             #     Images, icons, fonts
│   │   ├── components/         #     Reusable UI components
│   │   ├── pages/              #     Route-level page components
│   │   ├── context/            #     React Context / Redux store
│   │   ├── hooks/              #     Custom React hooks
│   │   ├── services/           #     Axios API service calls
│   │   └── App.js              #     Root component and route definitions
│   ├── .env                    #     ⚠️  Frontend environment variables
│   └── package.json
│
└── README.md                   # 📖  You are here
```

---

## ⚙️ Environment Variables

Before running the project, create a `.env` file in **each** of the following directories and populate them with the values below.

> ⚠️ **Never commit your `.env` files to version control.** Make sure `.env` is listed in your `.gitignore`.

---

### 🖥️ Backend — `ecom-node/.env`

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | ✅ | Port the Express server runs on | `5000` |
| `MONGO_URI` | ✅ | MongoDB connection string (Atlas or local) | `mongodb+srv://user:pass@cluster.mongodb.net/eshop` |
| `JWT_SECRET` | ✅ | Secret key for signing JWT tokens | `your_super_secret_jwt_key` |
| `JWT_EXPIRES_IN` | ✅ | JWT token expiry duration | `7d` |
| `NODE_ENV` | ✅ | Application environment | `development` or `production` |
| `STRIPE_SECRET_KEY` | ⚡ | Stripe secret API key (from Stripe Dashboard) | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | ⚡ | Stripe webhook signing secret | `whsec_...` |
| `RAZORPAY_KEY_ID` | ⚡ | Razorpay Key ID (from Razorpay Dashboard) | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | ⚡ | Razorpay Key Secret | `your_razorpay_secret` |
| `CLIENT_URL` | ✅ | Frontend URL for CORS configuration | `http://localhost:3000` |

> ⚡ Required only if using that specific payment gateway.

**Example `ecom-node/.env`:**
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/eshop
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxx

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 🌐 Frontend — `E-Commerce -Frontend/.env`

| Variable | Required | Description | Example |
|---|---|---|---|
| `REACT_APP_API_URL` | ✅ | Base URL of the backend API | `http://localhost:5000/api` |
| `REACT_APP_STRIPE_PUBLIC_KEY` | ⚡ | Stripe publishable key | `pk_test_...` |
| `REACT_APP_RAZORPAY_KEY_ID` | ⚡ | Razorpay Key ID for client-side | `rzp_test_...` |

**Example `E-Commerce -Frontend/.env`:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
```

---

## 🚀 Getting Started

Follow these steps to get E-Shop running on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)
- [Git](https://git-scm.com/)
- A running [MongoDB](https://www.mongodb.com/) instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/e-shop.git
cd e-shop
```

---

### Step 2 — Set Up the Backend

```bash
# Navigate to the backend folder
cd ecom-node

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# Now open .env and fill in your values (see Environment Variables section above)
```

---

### Step 3 — Set Up the Frontend

```bash
# Open a new terminal and navigate to the frontend folder
cd "E-Commerce -Frontend"

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# Now open .env and fill in your values
```

---

### Step 4 — Run the Application

You can run the frontend and backend **separately** (recommended for development) or **concurrently**.

#### ▶️ Option A — Run Separately (Two Terminals)

**Terminal 1 — Start the Backend:**
```bash
cd ecom-node
npm run dev
# Server running at → http://localhost:5000
```

**Terminal 2 — Start the Frontend:**
```bash
cd "E-Commerce -Frontend"
npm start
# App running at → http://localhost:3000
```

#### ▶️ Option B — Run Concurrently (Single Terminal)

If you have a root-level `package.json` with `concurrently` configured:

```bash
# From the project root directory
npm run dev
```

> If this command doesn't exist yet, install `concurrently` at the root and add the script:
> ```bash
> npm install -g concurrently
> ```
> Then in your root `package.json`:
> ```json
> "scripts": {
>   "dev": "concurrently \"cd ecom-node && npm run dev\" \"cd 'E-Commerce -Frontend' && npm start\""
> }
> ```

---

### Step 5 — Verify the Setup

Once both servers are running, open your browser and visit:

| Service | URL |
|---|---|
| 🌐 Frontend App | [http://localhost:3000](http://localhost:3000) |
| 🖥️ Backend API | [http://localhost:5000/api](http://localhost:5000/api) |
| 🩺 Health Check | [http://localhost:5000/api/health](http://localhost:5000/api/health) |

---

## 📡 API Reference

The backend exposes a RESTful API. All endpoints are prefixed with `/api`.

> 💡 **Pro tip:** Import the Postman collection from `/docs/E-Shop.postman_collection.json` (if available) to explore all endpoints interactively.

### 🔐 Auth Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/users/register` | ❌ | Register a new user account |
| `POST` | `/api/users/login` | ❌ | Log in and receive a JWT token |
| `GET` | `/api/users/profile` | ✅ | Get the authenticated user's profile |
| `PUT` | `/api/users/profile` | ✅ | Update user profile details |

**Example Request — `POST /api/users/login`**
```json
// Request Body
{
  "email": "customer@example.com",
  "password": "yourpassword"
}

// Success Response (200 OK)
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64abc123...",
    "name": "Jane Doe",
    "email": "customer@example.com",
    "role": "customer"
  }
}
```

---

### 📦 Product Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/products` | ❌ | Fetch all products (supports pagination & filters) |
| `GET` | `/api/products/:id` | ❌ | Get a single product by ID |
| `POST` | `/api/products` | ✅ Admin/Seller | Create a new product listing |
| `PUT` | `/api/products/:id` | ✅ Admin/Seller | Update an existing product |
| `DELETE` | `/api/products/:id` | ✅ Admin | Delete a product |

**Example Request — `GET /api/products?category=electronics&page=1&limit=10`**
```json
// Success Response (200 OK)
{
  "success": true,
  "count": 10,
  "total": 47,
  "page": 1,
  "products": [
    {
      "_id": "64def456...",
      "name": "Wireless Headphones Pro",
      "price": 2999,
      "category": "electronics",
      "stock": 150,
      "rating": 4.5
    }
    // ...more products
  ]
}
```

---

### 🛒 Order Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/orders` | ✅ | Place a new order |
| `GET` | `/api/orders/my-orders` | ✅ | Get all orders for the logged-in user |
| `GET` | `/api/orders/:id` | ✅ | Get a specific order by ID |
| `GET` | `/api/orders` | ✅ Admin | Get all orders (admin only) |
| `PUT` | `/api/orders/:id/status` | ✅ Admin | Update order status |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork** the repository
2. **Create** a new feature branch:
   ```bash
   git checkout -b feature/your-amazing-feature
   ```
3. **Commit** your changes with a clear message:
   ```bash
   git commit -m "feat: add your amazing feature"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-amazing-feature
   ```
5. **Open a Pull Request** on GitHub and describe what you've changed and why.

### Guidelines

- Follow the existing code style and folder conventions
- Write clear, descriptive commit messages (we recommend [Conventional Commits](https://www.conventionalcommits.org/))
- Add tests for any new functionality where applicable
- Update this README if you're adding or changing major features
- Be respectful and constructive in all discussions — refer to our [Code of Conduct](CODE_OF_CONDUCT.md)

### Reporting Bugs

Found a bug? Please [open an issue](../../issues/new) with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, browser)

---

## 📄 License

This project is distributed under the **MIT License**. See the [`LICENSE`](LICENSE) file for full details.

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

**Built with ❤️ using the MERN Stack**

If you found this project useful, please consider giving it a ⭐ on GitHub — it really helps!

[![GitHub stars](https://img.shields.io/github/stars/your-username/e-shop?style=social)](../../stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-username/e-shop?style=social)](../../network/members)

</div>
