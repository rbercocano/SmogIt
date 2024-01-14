import ApiClient from "./ApiClient";
const serviceService = {
  getAll: async () => {
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Service`, null);
  }
};

export default serviceService;
