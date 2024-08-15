import React, { useState, useEffect } from "react";
import IssueService from "./IssuesService";
import './App.css';

const App = () => {
  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Dummy Issue",
      description: "This is a dummy issue for testing purposes."
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await IssueService.getAllIssues();
        setIssues(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleCreate = async () => {
    if (title.trim() === '' || description.trim() === '') {
      alert('Title and description are required.');
      return;
    }

    setCreating(true);

    try {
      const newIssue = await IssueService.createIssue({ title, description });
      setIssues([...issues, newIssue]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error("Failed to create issue:", error);
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = async () => {
    if (title.trim() === '' || description.trim() === '') {
      alert('Title and description are required.');
      return;
    }

    try {
      await IssueService.updateIssue(selectedIssue.id, { title, description });
      const updatedIssues = issues.map((issue) =>
        issue.id === selectedIssue.id ? { ...issue, title, description } : issue
      );
      setIssues(updatedIssues);
      setSelectedIssue(null);
      setTitle('');
      setDescription('');
      setEditing(false);
    } catch (error) {
      console.error("Failed to update issue:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await IssueService.deleteIssue(id);
      setIssues(issues.filter((issue) => issue.id !== id));
    } catch (error) {
      console.error("Failed to delete issue:", error);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const issue = await IssueService.getIssueById(id);
      setSelectedIssue(issue);
    } catch (error) {
      console.error("Failed to fetch issue details:", error);
    }
  };

  const handleCancelEdit = () => {
    setSelectedIssue(null);
    setTitle('');
    setDescription('');
    setEditing(false);
  };

  if (loading) {
    return <div>Loading issues...</div>;
  }

  return (
    <div>
      <h1>Issue Tracker</h1>

      <div className="create-issue-form">
        <h2>{editing ? 'Edit Issue' : 'Create New Issue'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editing ? (
          <div>
            <button onClick={handleEdit}>Save Changes</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleCreate} disabled={creating}>
            {creating ? 'Creating...' : 'Create Issue'}
          </button>
        )}
      </div>

      {selectedIssue && (
        <div className="issue-details">
          <h2>Issue Details</h2>
          <p><strong>ID:</strong> {selectedIssue.id}</p>
          <p><strong>Title:</strong> {selectedIssue.title}</p>
          <p><strong>Description:</strong> {selectedIssue.description}</p>
        </div>
      )}

      <div className="issue-list">
        <h2>All Issues</h2>
        <ul>
          {issues.length === 0 ? (
            <li>No issues found.</li>
          ) : (
            issues.map((issue) => (
              <li key={issue.id}>
                <h3>{issue.title}</h3>
                <p>{issue.description}</p>
                <button onClick={() => handleViewDetails(issue.id)}>View Details</button>
                <button onClick={() => {
                  setSelectedIssue(issue);
                  setTitle(issue.title);
                  setDescription(issue.description);
                  setEditing(true);
                }}>Edit</button>
                <button onClick={() => handleDelete(issue.id)}>Delete</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
