import ApiClient from "./ApiClient";
const appointmentService = {
  search: async (pageSize, page, sortBy, direction, q) => {
    const params = {};
    if (sortBy) params.sortBy = sortBy;
    if (direction) params.direction = direction;
    if (q) params.q = q;
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Appointment/${pageSize}/${page}`, params);
  },
  removeService: async (id) => {
    return await ApiClient.delete(`${process.env.REACT_APP_API_BASE_URL}/Appointment/Service/${id}`);
  },
  addService: async (appointmentId, service) => {
    return await ApiClient.post(`${process.env.REACT_APP_API_BASE_URL}/Appointment/${appointmentId}/Service`, service);
  },
  getQueue: async () => {
    const params = {};
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Appointment/Queue`, params);
  },
};

export default appointmentService;
