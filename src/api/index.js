import axios from 'axios';

const clientAxios = axios.create({
   // baseURL: 'http://localhost:8080/api',
   baseURL: process.env.REACT_APP_API_URL,
   headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
   },
});

export default clientAxios;
