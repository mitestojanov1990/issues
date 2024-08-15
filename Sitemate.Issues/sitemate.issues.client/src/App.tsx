import React, { useState, useEffect } from "react";
import { Issue } from "./types";
import {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} from "./IssuesService";

const App: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    const data = await getIssues();
    setIssues(data);
  };

  const handleCreate = async () => {
    const newIssue = await createIssue({ title, description });
    setIssues([...issues, newIssue]);
    setTitle("");
    setDescription("");
  };

  const handleUpdate = async () => {
    if (selectedIssue) {
      await updateIssue(selectedIssue.id, { title, description });
      loadIssues();
      setSelectedIssue(null);
      setTitle("");
      setDescription("");
    }
  };

  const handleDelete = async (id: number) => {
    await deleteIssue(id);
    loadIssues();
  };

  return (
    <div>
      <h1>Issue Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={selectedIssue ? handleUpdate : handleCreate}>
          {selectedIssue ? "Update Issue" : "Create Issue"}
        </button>
      </div>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <button
              onClick={() => {
                setSelectedIssue(issue);
                setTitle(issue.title);
                setDescription(issue.description);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(issue.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
