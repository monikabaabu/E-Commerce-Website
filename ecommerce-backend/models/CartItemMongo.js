import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },

    productId: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    deliveryOptionId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "CartItem",
  cartItemSchema
);