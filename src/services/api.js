import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.22.0.76:3333/',
});

export default api;
