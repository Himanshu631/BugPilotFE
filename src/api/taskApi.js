import axios from 'axios';
import endpoints from './api';

export const createTask = async (taskData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(endpoints.tasks.create, taskData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const fetchTasksByModuleId = async (moduleId, page = 0, size = 10) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(endpoints.tasks.getByModule(moduleId, page, size), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data;
};
