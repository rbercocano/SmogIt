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
  addVehicle: async (vehicle) => {
    return await ApiClient.post(`${process.env.REACT_APP_API_BASE_URL}/Client/Vehicles`, vehicle);
  },
  updateVehicle: async (vehicle) => {
    return await ApiClient.put(`${process.env.REACT_APP_API_BASE_URL}/Client/Vehicles/${vehicle.vehicleId}`, vehicle);
  },
  searchVehicles: async (clientId,pageSize, page, sortBy, direction, q) => {
    const params = {};
    if (sortBy) params.sortBy = sortBy;
    if (direction) params.direction = direction;
    if (q) params.q = q;
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Client/${clientId}/Vehicles/${pageSize}/${page}`, params);
  },
  addAppointment: async (appointment) => {
    return await ApiClient.post(`${process.env.REACT_APP_API_BASE_URL}/Client/Appointments`, appointment);
  },
  updateAppointment: async (appointment) => {
    return await ApiClient.put(`${process.env.REACT_APP_API_BASE_URL}/Client/Appointments/${appointment.appointmentId}`, appointment);
  },
  searchAppointment: async (clientId,pageSize, page, sortBy, direction, q) => {
    const params = {};
    if (sortBy) params.sortBy = sortBy;
    if (direction) params.direction = direction;
    if (q) params.q = q;
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Client/${clientId}/Appointments/${pageSize}/${page}`, params);
  }
};

export default clientService;
