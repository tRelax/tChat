import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVICE_API_URL || '/api',
});

export default api ;