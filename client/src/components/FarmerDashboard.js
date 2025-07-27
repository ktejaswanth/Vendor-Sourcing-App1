import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductForm from './AddProductForm';
import { useNavigate } from 'react-router-dom';
import '../css/FarmerDashboard.css';

function FarmerDashboard() {
  const [myProducts, setMyProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get('https://vendor-sourcing-app.onrender.com/api/products/my-products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMyProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://vendor-sourcing-app.onrender.com/api/farmer/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    fetchMyProducts();
    fetchOrders();
  }, []);

  // Filter orders belonging to a product
  const getOrdersForProduct = (productId) => {
    return orders.filter(order => order.product._id === productId);
  };

  return (
    <div className="farmer-dashboard">
      <header className="farmer-header">
        <h2>👨‍🌾 Farmer Dashboard</h2>
        <div className="farmer-nav">
          <button onClick={logout}>🚪 Logout</button>
        </div>
      </header>

      <section className="form-section">
        <AddProductForm onProductAdded={fetchMyProducts} />
      </section>

      <h3 className="section-heading">📦 My Listed Products</h3>

      <section className="products-section">
        {myProducts.length === 0 ? (
          <p>No products listed yet.</p>
        ) : (
          myProducts.map(product => (
            <div key={product._id} className="product-card">
              <h4>{product.name}</h4>
              <p><strong>Price:</strong> ₹{product.pricePerKg}/kg</p>
              <p><strong>Quantity:</strong> {product.quantityKg} kg</p>

              {/* Orders for this product */}
              <div className="orders-section">
                <h5>🧾 Orders:</h5>
                {getOrdersForProduct(product._id).length === 0 ? (
                  <p>No orders yet for this product.</p>
                ) : (
                  getOrdersForProduct(product._id).map((order, idx) => (
                    <div key={idx} className="order-card">
                      <p><strong>Quantity (kg):</strong> {order.quantityKg}</p>
                      <p><strong>Phone:</strong> {order.phone}</p>
                      <p><strong>Street:</strong> {order.street}</p>
                      <p><strong>City:</strong> {order.city}</p>
                      <p><strong>State:</strong> {order.state}</p>
                      <hr />
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default FarmerDashboard;
