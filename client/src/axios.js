import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
let headerAuth = {
  "Content-Type": "application/json"
};

if(localStorage.token) {
  headerAuth.Authorization = `Bearer ${localStorage.token}`;
};


export const axiosAuth = axios.create({
  baseURL: baseURL,
  headerAuth
});

export const axiosInstance = axios.create({
  baseURL: baseURL
});