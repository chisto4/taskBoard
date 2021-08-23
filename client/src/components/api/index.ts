import axios from 'axios';
import { URL_HOME_PAGE } from './const/const';

// const token = localStorage.getItem('token');

// const instance = axios.create({
//   baseURL: URL_HOME_PAGE, headers: { 'Authorization': `Bearer ${token}` }
// });

// export default instance;


// import axios from 'axios';

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
    // eslint-disable-next-line no-param-reassign
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