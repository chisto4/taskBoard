import axios from 'axios';
import { URL_HOME_PAGE } from '../utils/consts';

export const instance = axios.create({
  baseURL: URL_HOME_PAGE
});