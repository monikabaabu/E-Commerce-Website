import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  rating: {
    stars: Number,
    count: Number
  },

  priceCents: {
    type: Number,
    required: true
  },

  keywords: [String]
});

export default mongoose.model(
  "Product",
  productSchema
);