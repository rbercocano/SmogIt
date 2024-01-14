import ApiClient from "./ApiClient";
const vehicleService = {
  getAllMakes: async () => {
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Vehicle/Makes`, null);
  },
  getAllMakesByName: async (name) => {
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Vehicle/Makes/${name}`, null);
  },
  getAllModels: async (makeId) => {
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Vehicle/Makes/${makeId}/Models`, null);
  },
  getAllModelsByName: async (makeId,name) => {
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Vehicle/Makes/${makeId}/Models/${name}`, null);
  }
};

export default vehicleService;
