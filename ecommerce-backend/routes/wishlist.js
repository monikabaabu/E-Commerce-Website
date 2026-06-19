import express from "express";
import Wishlist from "../models/Wishlist.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.body;
  console.log("WISHLIST BODY:", req.body);
  const existing = await Wishlist.findOne({
    userId,
    productId
  });

  if (existing) {
    return res.status(400).json({
      message: "Already in wishlist"
    });
  }

  const wishlistItem = await Wishlist.create({
    userId,
    productId
  });

  res.status(201).json(wishlistItem);
});

router.get("/", authMiddleware, async (req, res) => {
  const wishlist = await Wishlist.find({
    userId: req.user.userId
  });

  res.json(wishlist);
});

router.delete("/", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.body;

  await Wishlist.findOneAndDelete({
    userId,
    productId
  });

  res.json({
    message: "Removed from wishlist"
  });
});

export default router;