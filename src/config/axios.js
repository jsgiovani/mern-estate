import axios from 'axios';

const axiosConnection = axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}`
});



export default axiosConnection;