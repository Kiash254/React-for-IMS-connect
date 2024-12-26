import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Import the Login CSS
import Landing from '../images/landing.png';
import BackButton from './BackButton';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('login/', { username, password });
      navigate('/role-selection');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <BackButton />
      <div className="neumorphic-card p-4">
        <div className="text-center mb-4">
          <img src={Landing} alt="Avatar" className="avatar" />
        </div>
        <h1 className="text-center">IMS-Connect</h1>
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2 w-100">Login</button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;