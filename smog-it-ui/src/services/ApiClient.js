import { generateEncryptedApiKey } from '../utils/encryptionUtils';
const ApiClient = {
    get: async (url, params) => {
        const queryParams = new URLSearchParams(params ?? {});
        let apiUrl = `${url}`;
        if (queryParams.toString()) {
            apiUrl += `?${queryParams.toString()}`;
        }
        const timestamp = Math.floor(Date.now() / 1000);
        const requestOptions = {
            method: 'GET',
            mode: "cors",
            cache: "no-cache",
            headers: {
                'x-apikey': generateEncryptedApiKey(timestamp),
                "Content-Type": "application/json",
                'timestamp' : timestamp
            },
            redirect: 'follow',
        };

        try {
            const response = await fetch(apiUrl, requestOptions);

            if (!response.ok && response.status !== 400)
                throw new Error(`Error: ${response.status} - ${response.statusText}`);

            return response.json();
        } catch (error) {
            console.log(`An error occurred while fetching data: ${error.message}`);
            throw error;
        }
    },
    post: async (url, data) => {
        const timestamp = Math.floor(Date.now() / 1000);
        const requestOptions = {
            method: 'POST',
            mode: "cors",
            cache: "no-cache",
            headers: {
                'x-apikey': generateEncryptedApiKey(timestamp),
                "Content-Type": "application/json",
                'timestamp' : timestamp
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        };
        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok && response.status !== 400)
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
    },
    put: async (url, data) => {
        const timestamp = Math.floor(Date.now() / 1000);
        const requestOptions = {
            method: 'PUT',
            mode: "cors",
            cache: "no-cache",
            headers: {
                'x-apikey': generateEncryptedApiKey(timestamp),
                "Content-Type": "application/json",
                'timestamp' : timestamp
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        };
        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok && response.status !== 400)
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
    },
    delete: async (url) => {
        const timestamp = Math.floor(Date.now() / 1000);
        const requestOptions = {
            method: 'DELETE',
            mode: "cors",
            cache: "no-cache",
            headers: {
                'x-apikey': generateEncryptedApiKey(timestamp),
                "Content-Type": "application/json",
                'timestamp' : timestamp
            },
            redirect: 'follow'
        };
        try {
            const response = await fetch(url, requestOptions);

            if (!response.ok && response.status !== 400)
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
