const Product = require('../models/Product');

// ✅ Create product
const createProduct = async (req, res) => {
  try {
    const { name, pricePerKg, quantityKg } = req.body;
    const newProduct = new Product({
      name,
      pricePerKg,
      quantityKg,
      farmer: req.user.userId
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Create Product Error:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// ✅ Get all products (basic public view)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Get All Products Error:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

module.exports = { createProduct, getAllProducts };