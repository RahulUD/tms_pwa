import axios from 'axios';
import { BASE_URL } from './Endpoints';

let BaseApi = axios.create({
  baseURL: BASE_URL
});

let Api = function() {
  let token = localStorage.getItem('auth');

  if (token) {
    BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return BaseApi;
};

export default Api;
