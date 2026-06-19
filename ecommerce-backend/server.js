import dotenv from "dotenv";
import connectDB from "./config/db.js";

import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";


import Product from "./models/ProductMongo.js";
import DeliveryOption from "./models/DeliveryOptionMongo.js";


import productRoutes from "./routes/products.js";
import deliveryOptionRoutes from "./routes/deliveryOptions.js";
import cartItemRoutes from "./routes/cartItems.js";
import orderRoutes from "./routes/orders.js";

import paymentSummaryRoutes from "./routes/paymentSummary.js";
import wishlistRoutes from "./routes/wishlist.js";
import authRoutes from "./routes/auth.js";

import { defaultProducts } from "./defaultData/defaultProducts.js";
import { defaultDeliveryOptions } from "./defaultData/defaultDeliveryOptions.js";

dotenv.config();
await connectDB();

const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(express.json());

// Serve images
app.use("/images", express.static(path.join(__dirname, "images")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/delivery-options", deliveryOptionRoutes);
app.use("/api/cart-items", cartItemRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/payment-summary", paymentSummaryRoutes);

// Static frontend
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("index.html not found");
  }
});

// Error handler
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!"
  });
});
/* eslint-enable no-unused-vars */

// Sync SQLite database


// Seed default products & delivery options
const productCount = await Product.countDocuments();

if (productCount === 0) {
  const timestamp = Date.now();

  const productsWithTimestamps = defaultProducts.map(
    (product, index) => ({
      ...product,
      createdAt: new Date(timestamp + index),
      updatedAt: new Date(timestamp + index)
    })
  );

  const deliveryOptionsWithTimestamps =
    defaultDeliveryOptions.map((option, index) => ({
      ...option,
      createdAt: new Date(timestamp + index),
      updatedAt: new Date(timestamp + index)
    }));

  await Product.insertMany(productsWithTimestamps);

  await DeliveryOption.insertMany(
    deliveryOptionsWithTimestamps
  );

  console.log("Default data added to the database.");
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});