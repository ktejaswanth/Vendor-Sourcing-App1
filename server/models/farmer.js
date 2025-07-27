router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user.id });
    const productIds = products.map(p => p._id);

    const orders = await Order.find({ product: { $in: productIds } })
      .populate('product')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
