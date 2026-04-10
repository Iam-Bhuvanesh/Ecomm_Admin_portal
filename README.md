# Gridox E-commerce Ecosystem

A complete, unified e-commerce platform featuring a shared backend API, a customer storefront, and a comprehensive admin dashboard.

## 📁 Project Structure

This is a monorepo containing three integrated parts:

- **`/backend`**: Node.js/Express API (Shared by both websites).
- **`/shop`**: Gridox Storefront website (Customer-facing).
- **`/admin`**: Ecom Admin Portal (Owner-facing dashboard).

---

## 🚀 How to Start (Locally)

### 1. Prerequisites
- **Node.js** installed on your machine.
- A **MongoDB Atlas** cluster.
- A **Cloudinary** account (for product image hosting).

### 2. Setup All Dependencies
From the **root** folder, run:
```bash
npm run install:all
```
*This command automatically installs the dependencies for the backend, admin, and shop.*

### 3. Configure Environment Variables
Create a `.env` file inside the `backend/` folder and add your credentials:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4. Run Everything
Start all three components (Backend, Shop, and Admin) with a single command:
```bash
npm run dev
```
- **Backend**: http://localhost:5000
- **Admin**: http://localhost:5173
- **Shop**: http://localhost:5174 (approximate, check terminal)

---

## 🌐 Deployment Instructions

### 1. Build & Push
Push this repository to your GitHub.

### 2. Deploy Backend (Render)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Envs**: Add all values from your `.env` file.

### 3. Deploy Websites (Vercel)
- Create two separate projects on Vercel (one for `shop`, one for `admin`).
- **Root Directory**: `shop` (for one) and `admin` (for the other).
- **Envs**: Add `VITE_API_URL` set to your Render API URL (e.g., `https://your-api.onrender.com/api`).

---

## 🛠️ Unified API Features
- **Admin API**: Handles user authentication, product CRUD, and poster management.
- **Storefront API**: Publicly serves products, categories, and active posters.
- **Shared Database**: Products added in the Admin panel appear instantly on the Gridox Shop.
