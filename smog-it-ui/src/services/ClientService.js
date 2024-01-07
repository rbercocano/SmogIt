const clientService = {
    search: async (pageSize, page, sortBy, direction, q) => {
      const params = {};
      if (sortBy) params.sortBy = sortBy;
      if (direction) params.direction = direction;
      if (q) params.q = q;
  
      const queryParams = new URLSearchParams(params);
      let apiUrl = `${process.env.REACT_APP_API_BASE_URL}/Client/${pageSize}/${page}`;
      if (queryParams.toString()) {
        apiUrl += `?${queryParams.toString()}`;
      }
  
      const requestOptions = {
        method: 'GET',
        headers: {
          // You can include additional headers if needed
        },
        redirect: 'follow',
      };
  
      try {
        const response = await fetch(apiUrl, requestOptions);
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
  
        return response.json();
      } catch (error) {
        throw new Error(`An error occurred while fetching data: ${error.message}`);
      }
    },
  };
  
  export default clientService;
  