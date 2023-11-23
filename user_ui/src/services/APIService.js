import axios from 'axios';
const apiUrl= 'https://localhost:7080';

const api = axios.create({
    headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('JWT-Auth')
      }
  });

  
export const fetchData = async (endpoint) => {
    try {
      const response = await api.get(apiUrl+endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const postData = async  (endpoint, data) => {
    try {
      const response = await api.post(apiUrl+endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  