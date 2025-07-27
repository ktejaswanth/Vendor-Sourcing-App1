import React, { useState } from 'react';
import axios from 'axios';

function AddProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    name: '',
    pricePerKg: '',
    quantityKg: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products/add', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Product added successfully!');
      setForm({ name: '', pricePerKg: '', quantityKg: '' });
      onProductAdded(); // Refresh product list
    } catch (err) {
      console.error(err);
      alert('Error adding product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Add New Product</h3>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        required
        style={{ padding: '8px', width: '300px', marginBottom: '10px' }}
      /><br />
      <input
        type="number"
        name="pricePerKg"
        placeholder="Price per Kg"
        value={form.pricePerKg}
        onChange={handleChange}
        required
        style={{ padding: '8px', width: '300px', marginBottom: '10px' }}
      /><br />
      <input
        type="number"
        name="quantityKg"
        placeholder="Quantity in Kg"
        value={form.quantityKg}
        onChange={handleChange}
        required
        style={{ padding: '8px', width: '300px', marginBottom: '10px' }}
      /><br />
      <button type="submit" style={{ padding: '10px 20px' }}>Add Product</button>
    </form>
  );
}

export default AddProductForm;
