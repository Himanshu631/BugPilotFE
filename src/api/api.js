const BASE_URL = "http://localhost:8080/api/v1";

const endpoints = {
  stats: {
    cumulative: `${BASE_URL}/stats/cummulative`,
    // add more stats endpoints here
  },
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/auth/register`,
    // etc.
  },
  // Add more groups like users, bugs, projects, etc.
};

export default endpoints;
