// routes/products.js
const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Create a product
router.post("/", async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

module.exports = router;
