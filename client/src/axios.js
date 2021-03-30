import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
let headerAuth = {
  "Content-Type": "application/json"
};

export const axiosAuth = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  }
});

export const axiosInstance = axios.create({
  baseURL: baseURL
});

export const axiosFileAuth = axios.create({
  baseURL: baseURL
})

axiosAuth.interceptors.request.use(
  async config => {
    const token = await localStorage.getItem('token');
    config.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return config;
  }
)

axiosFileAuth.interceptors.request.use(
  async config => {
    const token = await localStorage.getItem('token');
    config.headers = {
      'Authorization': `Bearer ${token}`,
    };
    return config;
  }
)


