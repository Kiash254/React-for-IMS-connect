import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import RoleSelection from './components/RoleSelection';
import AdminDashboard from './components/AdminDashboard';
import InnovationDashboard from './components/InnovationDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';

function App() {
  return (
    <Router>
      <div>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/innovation-manager" element={<InnovationDashboard />} />
            <Route path="/employee" element={<EmployeeDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;