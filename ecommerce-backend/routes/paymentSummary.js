import express from 'express';
import CartItem from "../models/CartItemMongo.js";
import Product from "../models/ProductMongo.js";
import DeliveryOption from "../models/DeliveryOptionMongo.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => { 
  const cartItems = await CartItem.find({
    userId: req.user.userId
  });
  let totalItems = 0; 
  let productCostCents = 0;
  let shippingCostCents = 0;

  for (const item of cartItems) {
    const product = await Product.findOne({
      _id: item.productId
    });
    const deliveryOption = await DeliveryOption.findOne({
      _id: item.deliveryOptionId
    });
    totalItems += item.quantity;
    productCostCents += product.priceCents * item.quantity;
    shippingCostCents += deliveryOption.priceCents;
  }

  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
  const totalCostCents = totalCostBeforeTaxCents + taxCents;

  res.json({
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents
  });
});

export default router;
