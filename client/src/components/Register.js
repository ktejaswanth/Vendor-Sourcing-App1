import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css'; // Make sure this file exists

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer',
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://vendor-sourcing-app.onrender.com/api/auth/register', form);
      alert('Registered successfully! Redirecting to login...');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  const goToHomeAndScroll = (sectionClass) => {
    navigate('/');
    setTimeout(() => {
      const section = document.querySelector(`.${sectionClass}`);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="register-page">
      {/* ✅ Navigation Bar */}
      <header className="navbar">
        <h2 onClick={() => navigate('/')}>🍽️ Vendor Sourcing</h2>
        <nav>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => goToHomeAndScroll('about')}>About</button>
          <button onClick={() => goToHomeAndScroll('contact')}>Contact</button>
          <button onClick={() => goToHomeAndScroll('feedback')}>Feedback</button>
        </nav>
      </header>

      {/* 📋 Register Form */}
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select name="role" onChange={handleChange} value={form.role}>
          <option value="farmer">Farmer</option>
          <option value="vendor">Vendor</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
