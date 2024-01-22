import ApiClient from "./ApiClient";
const serviceService = {
  getAll: async () => {
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Service`, null);
  },
  add: async (service) => {
    return await ApiClient.post(`${process.env.REACT_APP_API_BASE_URL}/Service`, service);
  },
  update: async (id, service) => {
    return await ApiClient.put(`${process.env.REACT_APP_API_BASE_URL}/Service/${id}`, service);
  }
};

export default serviceService;
