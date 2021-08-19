import axios from 'axios';
import { URL_HOME_PAGE } from '../const/consts';

const instance = axios.create({
  baseURL: URL_HOME_PAGE
});



export default instance;