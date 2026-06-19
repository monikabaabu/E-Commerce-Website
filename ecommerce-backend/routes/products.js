import express from "express";
import Product from "../models/ProductMongo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const search = req.query.search;

    let products;

    if (search) {
      const lowerCaseSearch = search.toLowerCase();

      products = await Product.find({
        $or: [
          {
            name: {
              $regex: lowerCaseSearch,
              $options: "i"
            }
          },
          {
            keywords: {
              $elemMatch: {
                $regex: lowerCaseSearch,
                $options: "i"
              }
            }
          }
        ]
      });
    } else {
      products = await Product.find();
    }

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

export default router;