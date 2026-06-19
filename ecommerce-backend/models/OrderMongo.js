import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    estimatedDeliveryTimeMs: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    orderTimeMs: {
      type: Number,
      required: true,
    },

    totalCostCents: {
      type: Number,
      required: true,
    },

    products: {
      type: [orderProductSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;