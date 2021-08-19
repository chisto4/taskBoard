import axios from 'axios';
import { URL_HOME_PAGE } from '../const/consts';

const instance = axios.create({
  baseURL: URL_HOME_PAGE
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config
})

export default instance;