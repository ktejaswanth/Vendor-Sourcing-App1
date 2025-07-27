const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.get('/', (req, res) => {
  res.send('Vendor Sourcing API is working ✅');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);
