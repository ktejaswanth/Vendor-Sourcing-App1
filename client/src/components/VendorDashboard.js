import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../css/VendorDashboard.css';

Modal.setAppElement('#root');

function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('products');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    quantityKg: '',
    phone: '',
    street: '123 Default Street',
    city: 'Hyderabad',
    state: 'Telangana'
  });

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
    setFormData({
      quantityKg: '',
      phone: '',
      street: '123 Default Street',
      city: 'Hyderabad',
      state: 'Telangana'
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitOrder = async () => {
    const { quantityKg, phone, street, city, state } = formData;
    if (!quantityKg || !phone || !street || !city || !state) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/orders/place', {
        productId: selectedProduct._id,
        quantityKg,
        phone,
        address: { street, city, state }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Order placed successfully!');
      closeModal();
      fetchOrders();
    } catch (err) {
      console.error('Order error:', err.response?.data || err.message);
      alert('Order failed');
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/all');
      setProducts(res.data);
    } catch (err) {
      console.error('Product fetch error:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders/my-orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div className="vendor-dashboard">
      <header className="vendor-header">
        <h2>🛒 Vendor Dashboard</h2>
        <div className="vendor-nav">
          <button onClick={() => setTab('products')}>View Products</button>
          <button onClick={() => setTab('orders')}>My Orders</button>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="vendor-main">
        {tab === 'products' && (
          <>
            <h3>📦 Available Products</h3>
            {products.length === 0 ? (
              <p>No products available.</p>
            ) : (
              products.map(p => (
                <div key={p._id} className="product-card">
                  <h4>{p.name}</h4>
                  <p>Price: ₹{p.pricePerKg}/kg</p>
                  <p>Available: {p.quantityKg} kg</p>
                  <p>Farmer: {p.farmer?.name}</p>
                  <button onClick={() => openModal(p)}>Place Order</button>
                </div>
              ))
            )}
          </>
        )}

        {tab === 'orders' && (
          <>
            <h3>📬 Your Orders</h3>
            {orders.length === 0 ? (
              <p>No orders placed yet.</p>
            ) : (
              orders.map(order => (
                <div key={order._id} className="order-card">
                  <p><strong>Product:</strong> {order.product?.name}</p>
                  <p><strong>Farmer:</strong> {order.product?.farmer?.name || 'N/A'}</p>
                  <p><strong>Qty:</strong> {order.quantityKg} Kg</p>
                  <p><strong>Phone:</strong> {order.phone}</p>
                  <p><strong>Address:</strong> {order.address?.street}, {order.address?.city}, {order.address?.state}</p>
                  <p><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              ))
            )}
          </>
        )}
      </main>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Place Order" className="modal" overlayClassName="overlay">
        <h2>Place Order for {selectedProduct?.name}</h2>
        <form className="order-form" onSubmit={e => { e.preventDefault(); submitOrder(); }}>
          <label>Quantity (kg):
            <input type="number" name="quantityKg" value={formData.quantityKg} onChange={handleChange} required />
          </label>
          <label>Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>Street:
            <input type="text" name="street" value={formData.street} onChange={handleChange} required />
          </label>
          <label>City:
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </label>
          <label>State:
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </label>
          <div className="modal-buttons">
            <button type="submit">Submit Order</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default VendorDashboard;
