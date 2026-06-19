import express from 'express';
import Order from "../models/OrderMongo.js";
import Product from "../models/ProductMongo.js";
import DeliveryOption from "../models/DeliveryOptionMongo.js";
import CartItem from "../models/CartItemMongo.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try{
    const expand = req.query.expand;
    let orders = await Order.find({
      userId: req.user.userId
    }).sort({
      orderTimeMs: -1 
    });
   
    if (expand === 'products') {
      orders = await Promise.all(orders.map(async (order) => {
        const products = await Promise.all(order.products.map(async (product) => {
          const productDetails = await Product.findOne({
            _id: product.productId
          }); 
          return {
            ...product.toObject(),
            product: productDetails
          };
        }));
        const orderData = order.toObject();
        return {
          ...orderData,
          products
        };
      }));
    }

    res.json(orders);
  } catch (error) {
    console.error("ORDERS GET ERROR:", error);
    res.status(500).json({
      error: error.message
    });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  try{
    const userId = req.user.userId;
    const cartItems = await CartItem.find({
      userId
    });
  
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let totalCostCents = 0;
    const products = await Promise.all(cartItems.map(async (item) => {
      const product = await Product.findOne({_id: item.productId});
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      const deliveryOption = await DeliveryOption.findOne({_id: item.deliveryOptionId});
      if (!deliveryOption) {
        throw new Error(`Invalid delivery option: ${item.deliveryOptionId}`);
      }
      const productCost = product.priceCents * item.quantity;
      const shippingCost = deliveryOption.priceCents;
      totalCostCents += productCost + shippingCost;
      const estimatedDeliveryTimeMs = Date.now() + deliveryOption.deliveryDays * 24 * 60 * 60 * 1000;
      return {
        productId: item.productId,
        quantity: item.quantity,
        estimatedDeliveryTimeMs
      };
    }));

    totalCostCents = Math.round(totalCostCents * 1.1);

    const order = await Order.create({
      userId,
      orderTimeMs: Date.now(),
      totalCostCents,
      products
    });

    await CartItem.deleteMany({
      userId
    });

    res.status(201).json(order);

  } catch (error) {
    console.error("ORDER POST ERROR:", error);

    res.status(500).json({
      error: error.message
    });
  }
});

router.get('/:orderId', authMiddleware, async (req, res) => {
  try{
    const { orderId } = req.params;
    const expand = req.query.expand;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if (order.userId !== req.user.userId) {
      return res.status(403).json({
        error: 'Unauthorized'
      });
    }
    if (expand === 'products') {
      const products = await Promise.all(order.products.map(async (product) => {
        const productDetails = await Product.findOne({
          _id: product.productId
        });
        return {
          ...product.toObject(),
          product: productDetails
        };
      }));
      order = {
        ...order.toObject(),
        products
      };
    }

    res.json(order);
  } catch (error) {
    console.error("ORDER DETAILS ERROR:", error);

    res.status(500).json({
      error: error.message
    });
  }
});

export default router;
