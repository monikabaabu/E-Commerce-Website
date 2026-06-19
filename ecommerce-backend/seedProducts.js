import dotenv from "dotenv";
import connectDB from "./config/db.js";

import Product from "./models/ProductMongo.js";
import { defaultProducts } from "./defaultData/defaultProducts.js";

dotenv.config();

await connectDB();

await Product.deleteMany();

await Product.insertMany(defaultProducts);

console.log("Products inserted");

process.exit();