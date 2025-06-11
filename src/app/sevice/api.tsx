import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sandbox.api.alianca.portasabertas.org.br',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer SEU_TOKEN_AQUI'
  }
});

export default api;
