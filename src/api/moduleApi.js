import axios from 'axios';
import endpoints from './api';

export const fetchModulesByProjectId = async (projectId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(endpoints.modules.getByProject(projectId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  };

export const createModule = async (moduleData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(endpoints.modules.create, moduleData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
};