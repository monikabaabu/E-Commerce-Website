# 🛒 MERN E-Commerce Website

A full-stack e-commerce web application built using the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js). The application provides a complete online shopping experience with secure authentication, product browsing, shopping cart, wishlist, order management, and package tracking.

---

## 🚀 Features

### 👤 Authentication

* User Registration
* User Login
* JWT-based Authentication
* Password Encryption using bcrypt

### 🛍️ Product Management

* Browse Products
* Product Images
* Product Ratings
* Product Details
* Responsive Product Grid

### ❤️ Wishlist

* Add Products to Wishlist
* Remove Products from Wishlist
* Persistent Wishlist using MongoDB

### 🛒 Shopping Cart

* Add to Cart
* Update Quantity
* Remove Items
* Delivery Option Selection
* Dynamic Payment Summary

### 📦 Order Management

* Place Orders
* Order History
* Buy Again
* Package Tracking
* Estimated Delivery Date

### 🚚 Delivery

* Multiple Delivery Options
* Shipping Cost Calculation
* Estimated Delivery Time

### ☁️ Deployment

* Backend deployed on AWS Elastic Beanstalk
* MongoDB Atlas Cloud Database
* RESTful API Architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS
* Day.js

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* AWS Elastic Beanstalk
* MongoDB Atlas

---

## 📂 Project Structure

```
ecommerce-website/
│
├── ecommerce-frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── ecommerce-backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── images/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/monikabaabu/E-Commerce-Website.git
```

### Install frontend dependencies

```bash
cd ecommerce-frontend
npm install
```

### Install backend dependencies

```bash
cd ../ecommerce-backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run the Project

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

## 🌟 Future Enhancements

* Product Categories
* Product Search
* Product Details Page
* Customer Reviews & Ratings
* Image Upload for Reviews
* Admin Dashboard
* Product Management
* Pagination
* Related Products
* Order Cancellation
* Payment Gateway Integration

---

## 📌 Key Highlights

* Full-stack MERN Architecture
* Secure JWT Authentication
* MongoDB Atlas Integration
* RESTful APIs
* AWS Elastic Beanstalk Deployment
* Responsive User Interface
* Modular Project Structure
* Scalable Backend Design

---

