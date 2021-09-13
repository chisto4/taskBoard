import axios from 'axios';
import { URL_HOME_PAGE } from './const/const';

export const baseURL = URL_HOME_PAGE;

const instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return config;
    }
    config.headers.common.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error('AXIOS_REQUEST_ERROR', error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('AXIOS_RESPONSE_ERROR', error);
    return Promise.reject(error);
  },
);

export default instance;