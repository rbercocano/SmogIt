import ApiClient from "./ApiClient";
const clientService = {
  search: async (pageSize, page, sortBy, direction, q) => {
    const params = {};
    if (sortBy) params.sortBy = sortBy;
    if (direction) params.direction = direction;
    if (q) params.q = q;
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Client/${pageSize}/${page}`, params);
  },
  get: async (id) => {
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Client/${id}`, null);
  },
  add: async (client) => {
    return await ApiClient.post(`${process.env.REACT_APP_API_BASE_URL}/Client`, client);
  },
  update: async (id, client) => {
    return await ApiClient.put(`${process.env.REACT_APP_API_BASE_URL}/Client/${id}`, client);
  },
};

export default clientService;
