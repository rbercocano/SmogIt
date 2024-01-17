import ApiClient from "./ApiClient";
const appointmentService = {  
  search: async (pageSize, page, sortBy, direction, q) => {
    const params = {};
    if (sortBy) params.sortBy = sortBy;
    if (direction) params.direction = direction;
    if (q) params.q = q;
    return await ApiClient.get(`${process.env.REACT_APP_API_BASE_URL}/Appointment/${pageSize}/${page}`, params);
  },
};

export default appointmentService;
