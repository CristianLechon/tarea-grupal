import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = 'Ocurrió un error inesperado.';
    
    if (error.response) {
      errorMessage = error.response.data?.message || `Error ${error.response.status}: ${error.message}`;
    } else if (error.request) {

      errorMessage = 'Sin respuesta del servidor. Por favor, comprueba tu conexión a internet.';
    } else {

      errorMessage = error.message;
    }
    
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export default api;
