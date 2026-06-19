import express from "express";
import CartItem from "../models/CartItemMongo.js";
import Product from "../models/ProductMongo.js";
import DeliveryOption from "../models/DeliveryOptionMongo.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const expand = req.query.expand;

  let cartItems = await CartItem.find({
    userId: req.user.userId
  });

  if (expand === "product") {
    cartItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findOne({
          _id: item.productId
        });
        const itemData = item.toJSON();
        return {
          ...itemData,
          product
        };
      })
    );
  }

  res.json(cartItems);
});

router.post("/", authMiddleware, async (req, res) => {
  try{
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    const product = await Product.findOne({
      _id: productId
    });

    if (!product) {
      return res.status(400).json({
        error: "Product not found"
      });
    }

    if (
      typeof quantity !== "number" ||
      quantity < 1 ||
      quantity > 10
    ) {
      return res.status(400).json({
        error: "Quantity must be a number between 1 and 10"
      });
    }
  

    let cartItem = await CartItem.findOne({
      userId,
      productId
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
  
      cartItem = await CartItem.create({
        userId,
        productId,
        quantity,
        deliveryOptionId: "1"
      });
    }

    res.status(201).json(cartItem);
  } catch (error) {
    console.error("CART ERROR:", error);

    res.status(500).json({
      error: error.message
    });
  }
});


router.put("/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const { quantity, deliveryOptionId } = req.body;

  const cartItem = await CartItem.findOne({
    userId: req.user.userId,
    productId
  });

  if (!cartItem) {
    return res.status(404).json({
      error: "Cart item not found"
    });
  }

  if (quantity !== undefined) {
    if (
      typeof quantity !== "number" ||
      quantity < 1
    ) {
      return res.status(400).json({
        error: "Quantity must be a number greater than 0"
      });
    }

    cartItem.quantity = quantity;
  }

  if (deliveryOptionId !== undefined) {
    const deliveryOption =
      await DeliveryOption.findOne({
        _id: deliveryOptionId
      });

    if (!deliveryOption) {
      return res.status(400).json({
        error: "Invalid delivery option"
      });
    }

    cartItem.deliveryOptionId = deliveryOptionId;
  }

  await cartItem.save();

  res.json(cartItem);
});

router.delete("/:productId", authMiddleware, async (req, res) => {
  const { productId } = req.params;

  const cartItem = await CartItem.findOne({
    userId: req.user.userId,
    productId
  });

  if (!cartItem) {
    return res.status(404).json({
      error: "Cart item not found"
    });
  }

  await cartItem.deleteOne();

  res.status(204).send();
});

export default router;