import ApiClient from "./ApiClient";
const userService = {
  search: async (pageSize, page, sortBy, direction, q) => {
    const params = {};
    if (sortBy) params.sortBy = sortBy;
    if (direction) params.direction = direction;
    if (q) params.q = q;
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/User/${pageSize}/${page}`, params);
  },
  get: async (id) => {
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/User/${id}`, null);
  },
  add: async (User) => {
    return await ApiClient.post(`${process.env.REACT_APP_API_BASE_URL}/User`, User);
  },
  update: async (id, User) => {
    return await ApiClient.put(`${process.env.REACT_APP_API_BASE_URL}/User/${id}`, User);
  }
};

export default userService;
