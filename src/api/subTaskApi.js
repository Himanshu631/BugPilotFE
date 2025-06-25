import axios from 'axios';
import endpoints from './api';

const token = localStorage.getItem('token');

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const createSubtask = async (taskId, subtaskData) => {
  const response = await axios.post(endpoints.subtasks.create(taskId), subtaskData, config);
  return response.data.data;
};

export const fetchSubtasksByTaskId = async (taskId) => {
  const response = await axios.get(endpoints.subtasks.getByTask(taskId), config);
  return response.data.data;
};

export const updateSubtask = async (subtaskId, subtaskData) => {
  const response = await axios.put(endpoints.subtasks.update(subtaskId), subtaskData, config);
  return response.data.data;
};

export const deleteSubtask = async (subtaskId) => {
  const response = await axios.delete(endpoints.subtasks.delete(subtaskId), config);
  return response.data.data;
};
