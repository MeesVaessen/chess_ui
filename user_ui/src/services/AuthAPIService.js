import axios from 'axios';
const apiUrl= 'https://localhost:7080';

const api = axios.create({
    headers : {
        'Content-Type': 'application/json'
      }
  });

  
export const fetchData = async (endpoint) => {
    try {
      const response = await api.get(apiUrl+endpoint);
      return response.data;
    } catch (error) {
      // Handle error, e.g., log or throw a custom error
      throw error;
    }
  };


  export const postData = async (endpoint, data) => {
    try {
      const response = await api.post(apiUrl + endpoint, data);
      return response.data;
    } catch (error) {
      // Handle error, e.g., log or throw a custom error
      throw error;
    }
  };
  