import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import './InnovationDashboard.css'; // Import the InnovationDashboard CSS
import BackButton from './BackButton';

function InnovationDashboard() {
  const [ideas, setIdeas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ideasPerPage, setIdeasPerPage] = useState(5); // Define the state for ideasPerPage

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await axios.get('ideas/');
      setIdeas(response.data);
    };
    fetchIdeas();
  }, []);

  const handleVote = async (ideaId, voteType) => {
    try {
      await axios.post('vote/', { idea: ideaId, user: 1, vote_type: voteType }); // Assuming user ID 1 for simplicity
      alert('Vote recorded successfully!');
    } catch (error) {
      alert('Error recording vote.');
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
      <h2 className="text-center mb-4">Innovation Manager Panel</h2>
      <div className="neumorphic-card mb-4">
        <label htmlFor="ideasPerPage">Ideas per page:</label>
        <select
          id="ideasPerPage"
          className="form-control"
          value={ideasPerPage}
          onChange={(e) => setIdeasPerPage(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <table className="table table-striped mb-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentIdeas.map((idea) => (
            <tr key={idea.id}>
              <td>{idea.id}</td>
              <td>{idea.title}</td>
              <td>{idea.description}</td>
              <td>{idea.status}</td>
              <td className="action-buttons">
                <button className="btn btn-primary mr-2">Update</button>
                <button className="btn btn-success mr-2" onClick={() => handleVote(idea.id, 'upvote')}>Upvote</button>
                <button className="btn btn-danger" onClick={() => handleVote(idea.id, 'downvote')}>Downvote</button>
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

export default InnovationDashboard;