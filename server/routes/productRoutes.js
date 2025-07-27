const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const Product = require('../models/Product'); // ✅ Import Product model

// 🌾 Farmer adds product
router.post('/add', auth, createProduct);

// 🌐 Public route - anyone can view all products
router.get('/', getAllProducts);

// 👨‍🌾 Farmer gets only their own products
router.get('/my-products', auth, async (req, res) => {
  try {
    if (req.user.role !== 'farmer') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const products = await Product.find({ farmer: req.user.userId });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🧾 New: Public route to get all products (with farmer info)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find().populate('farmer', 'name');
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
