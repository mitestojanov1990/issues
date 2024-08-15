import axios from 'axios';
import { Issue } from './types';

const API_URL = 'https://localhost:5001/issues';

export const getIssues = async (): Promise<Issue[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createIssue = async (issue: Omit<Issue, 'id'>): Promise<Issue> => {
  const response = await axios.post(API_URL, issue);
  return response.data;
};

export const updateIssue = async (id: number, issue: Omit<Issue, 'id'>): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, issue);
};

export const deleteIssue = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
