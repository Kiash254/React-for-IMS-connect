import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import './AdminDashboard.css'; 
import BackButton from './BackButton'; 
function AdminDashboard() {
  const [employees, setEmployees] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', role: '', region: '', user: '' });
  const [newIdea, setNewIdea] = useState({ title: '', description: '', status: '', employee: '' });
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
    fetchIdeas();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('employees/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchIdeas = async () => {
    try {
      const response = await axios.get('ideas/');
      setIdeas(response.data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      if (editEmployee) {
        await axios.put(`employees/${editEmployee.id}/`, newEmployee);
        setEditEmployee(null);
      } else {
        await axios.post('employees/', newEmployee);
      }
      setNewEmployee({ name: '', email: '', role: '', region: '', user: '' });
      fetchEmployees();
    } catch (error) {
      console.error('Error adding/updating employee:', error);
    }
  };

  const handleAddIdea = async (e) => {
    e.preventDefault();
    try {
      await axios.post('ideas/', newIdea);
      setNewIdea({ title: '', description: '', status: '', employee: '' });
      fetchIdeas();
    } catch (error) {
      console.error('Error adding idea:', error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`employees/${id}/`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleDeleteIdea = async (id) => {
    try {
      await axios.delete(`ideas/${id}/`);
      fetchIdeas();
    } catch (error) {
      console.error('Error deleting idea:', error);
    }
  };

  const handleApproveIdea = async (id) => {
    try {
      await axios.put(`ideas/${id}/`, { status: 'approved' });
      fetchIdeas();
    } catch (error) {
      console.error('Error approving idea:', error);
    }
  };

  const handleRejectIdea = async (id) => {
    try {
      await axios.put(`ideas/${id}/`, { status: 'rejected' });
      fetchIdeas();
    } catch (error) {
      console.error('Error rejecting idea:', error);
    }
  };

  const handleEditEmployee = (employee) => {
    setNewEmployee({ name: employee.name, email: employee.email, role: employee.role, region: employee.region, user: employee.user.id });
    setEditEmployee(employee);
  };

  return (
    <div className="admin-container">
      <BackButton />
      <h2 className="text-center mb-4">Admin Panel</h2>
      <div className="neumorphic-card mb-4">
        <h3>{editEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
        <form onSubmit={handleAddEmployee}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-2"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Role"
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Region</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Region"
              value={newEmployee.region}
              onChange={(e) => setNewEmployee({ ...newEmployee, region: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="number"
              className="form-control mt-2"
              placeholder="User ID"
              value={newEmployee.user}
              onChange={(e) => setNewEmployee({ ...newEmployee, user: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2 w-100">
            {editEmployee ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>
      </div>
      <h3 className="mb-4">Employees</h3>
      <table className="table table-striped mb-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>{employee.region}</td>
              <td>
                <button className="btn btn-outline-secondary action-btn mr-2" onClick={() => handleEditEmployee(employee)}>Edit</button>
                <button className="btn btn-outline-danger action-btn" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="neumorphic-card mb-4">
        <h3>Add Idea</h3>
        <form onSubmit={handleAddIdea}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={newIdea.title}
              onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control mt-2"
              placeholder="Description"
              value={newIdea.description}
              onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Status</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Status"
              value={newIdea.status}
              onChange={(e) => setNewIdea({ ...newIdea, status: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="number"
              className="form-control mt-2"
              placeholder="Employee ID"
              value={newIdea.employee}
              onChange={(e) => setNewIdea({ ...newIdea, employee: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2 w-100">Add Idea</button>
        </form>
      </div>
      <h3 className="mb-4">Ideas</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ideas.map((idea) => (
            <tr key={idea.id}>
              <td>{idea.title}</td>
              <td>{idea.description}</td>
              <td>{idea.status}</td>
              <td>
                <button className="btn btn-outline-success action-btn mr-2" onClick={() => handleApproveIdea(idea.id)}>Approve</button>
                <button className="btn btn-outline-warning action-btn mr-2" onClick={() => handleRejectIdea(idea.id)}>Reject</button>
                <button className="btn btn-outline-danger action-btn" onClick={() => handleDeleteIdea(idea.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;