import axios from 'axios';
const BASE_URL = 'http://localhost:4000/api';

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    credentials: true,
    withCredentials: true,
});

axiosPrivate.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
        config.headers.Cookie = `token=${token};`;
        // config.headers = {
        //     ...config.headers,
        //     'Cookie': 'token=${token}', // Set the token as a cookie
        //   };
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  
  export default axiosPrivate;