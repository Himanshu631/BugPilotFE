import axios from 'axios';
import endpoints from './api';

export const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(endpoints.projects.getProjects, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  };

  export const createProject = async (projectData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(endpoints.projects.create, projectData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

export const updateProject = async (projectId, projectData) => {
  const response = await axios.put(endpoints.projects.update(projectId), projectData);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await axios.delete(endpoints.projects.delete(projectId));
  return response.data;
};
