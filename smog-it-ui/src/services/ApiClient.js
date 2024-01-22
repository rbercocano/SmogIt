
const ApiClient = {
    get: async (url, params) => {
        const queryParams = new URLSearchParams(params ?? {});
        let apiUrl = `${url}`;
        if (queryParams.toString()) {
            apiUrl += `?${queryParams.toString()}`;
        }

        const requestOptions = {
            method: 'GET',
            mode: "cors",
            cache: "no-cache",
            headers: {
            },
            redirect: 'follow',
        };

        try {
            const response = await fetch(apiUrl, requestOptions);

            if (!response.ok)
                throw new Error(`Error: ${response.status} - ${response.statusText}`);

            return response.json();
        } catch (error) {
            console.log(`An error occurred while fetching data: ${error.message}`);
        }
    },
    post: async (url, data) => {
        const requestOptions = {
            method: 'POST',
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        };
        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok)
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text();
            }
        } catch (error) {
            console.log(`An error occurred while posting data: ${error.message}`);
        }
    },
    put: async (url, data) => {
        const requestOptions = {
            method: 'PUT',
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        };
        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok)
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text();
            }

        } catch (error) {
            console.log(`An error occurred while posting data: ${error.message}`);
        }
    },
    delete: async (url) => {
        const requestOptions = {
            method: 'DELETE',
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: 'follow'
        };
        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok)
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text();
            }

        } catch (error) {
            console.log(`An error occurred while posting data: ${error.message}`);
            throw error;
        }
    }
};

export default ApiClient;
