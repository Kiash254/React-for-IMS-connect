import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import './EmployeeDashboard.css'; 
import BackButton from './BackButton';
function EmployeeDashboard() {
  const [ideas, setIdeas] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [employee, setEmployee] = useState('');
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ideasPerPage = 5; // Fixed number of ideas per page

  useEffect(() => {
    fetchIdeas();
    fetchEmployees();
  }, []);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get('ideas/');
      setIdeas(response.data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('employees/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idea = { title, description, status: 'submitted', employee };
    try {
      await axios.post('ideas/', idea);
      setTitle('');
      setDescription('');
      setEmployee('');
      setStatus('Idea submitted successfully!');
      fetchIdeas(); // Refresh the list of ideas
    } catch (error) {
      setStatus('Error submitting idea.');
    }
  };

  const handleApproveIdea = async (id) => {
    try {
      await axios.put(`ideas/${id}/`, { status: 'approved' });
      fetchIdeas(); // Refresh the list of ideas
    } catch (error) {
      console.error('Error approving idea:', error);
    }
  };

  const handleRejectIdea = async (id) => {
    try {
      await axios.put(`ideas/${id}/`, { status: 'rejected' });
      fetchIdeas(); // Refresh the list of ideas
    } catch (error) {
      console.error('Error rejecting idea:', error);
    }
  };

  const handleDeleteIdea = async (id) => {
    try {
      await axios.delete(`ideas/${id}/`);
      fetchIdeas(); // Refresh the list of ideas
    } catch (error) {
      console.error('Error deleting idea:', error);
    }
  };

  // Get current ideas
  const indexOfLastIdea = currentPage * ideasPerPage;
  const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
  const currentIdeas = ideas.slice(indexOfFirstIdea, indexOfLastIdea);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <BackButton />
      <h2 className="text-center mb-4">Employee Panel</h2>
      {status && <div className="alert alert-info">{status}</div>}
      <div className="neumorphic-card mb-4">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Employee</label>
            <select
              className="form-control"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-2 w-100">Submit</button>
        </form>
      </div>
      <h3 className="mb-4">Ideas</h3>
      <table className="table table-striped mb-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentIdeas.map((idea) => (
            <tr key={idea.id}>
              <td>{idea.title}</td>
              <td>{idea.description}</td>
              <td>{idea.status}</td>
              <td className="action-buttons">
                <button className="btn btn-success mr-2" onClick={() => handleApproveIdea(idea.id)}>Approve</button>
                <button className="btn btn-warning mr-2" onClick={() => handleRejectIdea(idea.id)}>Reject</button>
                <button className="btn btn-danger" onClick={() => handleDeleteIdea(idea.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(ideas.length / ideasPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EmployeeDashboard;