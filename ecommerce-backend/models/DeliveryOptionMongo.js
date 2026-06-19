import mongoose from "mongoose";

const deliveryOptionSchema = new mongoose.Schema({
  _id: String,
  deliveryDays: Number,
  priceCents: Number
});

export default mongoose.model(
  "DeliveryOption",
  deliveryOptionSchema
);