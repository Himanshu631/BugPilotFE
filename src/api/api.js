const BASE_URL = "http://localhost:8080/api/v1";

const endpoints = {
  stats: {
    cumulative: `${BASE_URL}/stats/cummulative`,
  },
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
  },
  projects: {
    create: `${BASE_URL}/projects`,
    getProjects: `${BASE_URL}/projects`,
    getById: (projectId) => `${BASE_URL}/projects/${projectId}`,
    update: (projectId) => `${BASE_URL}/projects/${projectId}`,
    delete: (projectId) => `${BASE_URL}/projects/${projectId}`,
  },

  modules: {
    create: `${BASE_URL}/modules`,
    getByProject: (projectId) => `${BASE_URL}/modules/project/${projectId}`,
    update: (moduleId) => `${BASE_URL}/modules/${moduleId}`,
    delete: (moduleId) => `${BASE_URL}/modules/${moduleId}`,
  },

  tasks: {
    create: `${BASE_URL}/tasks`,
    getByModule: (moduleId, page = 0, size = 10) => `${BASE_URL}/tasks/module/${moduleId}?page=${page}&size=${size}`,
  },
  
  subtasks: {
    create: (taskId) => `${BASE_URL}/subtasks/task/${taskId}`,
    getByTask: (taskId) => `${BASE_URL}/subtasks/task/${taskId}`,
    update: (subtaskId) => `${BASE_URL}/subtasks/${subtaskId}`,
    delete: (subtaskId) => `${BASE_URL}/subtasks/${subtaskId}`,
  }    
};

export default endpoints;
