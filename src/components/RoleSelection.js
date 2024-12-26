import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import './RoleSelection.css'; // Import the RoleSelection CSS
import AdminAvatar from '../images/admin.png'; 
import InnovationAvatar from '../images/manager.png'; 
import EmployeeAvatar from '../images/staff.png';
import BackButton from './BackButton';

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'innovation_manager') {
      navigate('/innovation-manager');
    } else if (role === 'employee') {
      navigate('/employee');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('logout/');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container text-center mt-5">
      <BackButton />
      <h1 className="welcome-text">Welcome to IMS-Connect</h1>
      <p className="lead">Select your role to proceed. Each role has specific functionalities tailored to your needs.</p>
      <div className="mt-4 d-flex justify-content-center flex-wrap">
        <div className="role-card mx-2 mb-4">
          <img src={AdminAvatar} alt="Admin Avatar" className="avatar mb-2" />
          <button
            className="btn btn-success btn-lg mt-2"
            onClick={() => handleRoleSelection('admin')}
          >
            Admin
          </button>
        </div>
        <div className="role-card mx-2 mb-4">
          <img src={InnovationAvatar} alt="Innovation Manager Avatar" className="avatar mb-2" />
          <button
            className="btn btn-success btn-lg mt-2"
            onClick={() => handleRoleSelection('innovation_manager')}
          >
            Innovation Manager
          </button>
        </div>
        <div className="role-card mx-2 mb-4">
          <img src={EmployeeAvatar} alt="Employee Avatar" className="avatar mb-2" />
          <button
            className="btn btn-success btn-lg mt-2"
            onClick={() => handleRoleSelection('employee')}
          >
            Employee
          </button>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="btn btn-danger btn-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default RoleSelection;