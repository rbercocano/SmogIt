import ApiClient from "./ApiClient";
const statusService = {
  getAll: async () => {
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Status`, null);
  }
};

export default statusService;
