import React, { useState, useEffect } from "react";
import IssueService from "./IssuesService";
import './App.css';

const App = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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

  if (loading) {
    return <div>Loading issues...</div>;
  }

  return (
    <div>
      <h1>Issue Tracker</h1>

      <div className="create-issue-form">
        <h2>Create New Issue</h2>
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
        <button onClick={handleCreate} disabled={creating}>
          {creating ? 'Creating...' : 'Create Issue'}
        </button>
      </div>

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
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
