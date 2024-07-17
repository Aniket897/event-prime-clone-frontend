import axios from 'axios';


const axiosInstance = axios.create({ baseURL: 'https://event-prime-clone-backend.onrender.com' });


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
