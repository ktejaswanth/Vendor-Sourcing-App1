import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css'; // Make sure this file exists

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      if (res.data.user.role === 'farmer') navigate('/farmer');
      else navigate('/vendor');
    } catch (err) {
      alert('Login failed');
    }
  };

  // 🔄 Navigate home and scroll to section
  const goToHomeAndScroll = (sectionClass) => {
    navigate('/');
    setTimeout(() => {
      const section = document.querySelector(`.${sectionClass}`);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="login-page">
      {/* ✅ Navigation Bar */}
      <header className="navbar">
        <h2 onClick={() => navigate('/')}>🍽️ Vendor Sourcing</h2>
        <nav>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/register')}>Register</button>
          <button onClick={() => goToHomeAndScroll('about')}>About</button>
          <button onClick={() => goToHomeAndScroll('contact')}>Contact</button>
          <button onClick={() => goToHomeAndScroll('feedback')}>Feedback</button>
        </nav>
      </header>

      {/* 🔐 Login Form */}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
