import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import FarmerDashboard from './components/FarmerDashboard';
import VendorDashboard from './components/VendorDashboard';
import UserHome from './components/UserHome';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route
  path="/farmer"
  element={
    <ProtectedRoute allowedRoles={['farmer']}>
      <FarmerDashboard />
    </ProtectedRoute>
  }
/>
        <Route
  path="/vendor"
  element={
    <ProtectedRoute allowedRoles={['vendor']}>
      <VendorDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
