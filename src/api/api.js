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
  }
};

export default endpoints;
