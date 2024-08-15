import axios from "axios";

const API_URL = "https://localhost:55006/issues";

const getAllIssues = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createIssue = async (issue) => {
  const response = await axios.post(API_URL, issue);
  return response.data;
};

const updateIssue = async (id, issue) => {
  await axios.put(`${API_URL}/${id}`, issue);
};

const deleteIssue = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllIssues,
  createIssue,
  updateIssue,
  deleteIssue,
};
