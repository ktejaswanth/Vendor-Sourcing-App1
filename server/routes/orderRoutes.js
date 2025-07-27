const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');

router.post('/place', auth, async (req, res) => {
  const { productId, quantityKg } = req.body;

  console.log('Incoming Order:', req.body);
  console.log('User from token:', req.user); // should contain userId

  try {
    const newOrder = new Order({
      vendor: req.user.userId,  // ✅ fix here
      product: productId,
      quantityKg
    });
    await newOrder.save();
    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error('Order Save Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get orders for the logged-in vendor
router.get('/my-orders', auth, async (req, res) => {
  try {
    if (req.user.role !== 'vendor') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const orders = await Order.find({ vendor: req.user.userId }).populate('product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
