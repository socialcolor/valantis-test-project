import axios, { AxiosError, AxiosInstance } from 'axios';
import { getAuthToken } from '../utils';

const BASE_URL = 'https://api.valantis.store:41000/';

export const createAPI = ():AxiosInstance => {
    const api = axios.create({
        baseURL: BASE_URL,
        headers: {
            'X-Auth': getAuthToken()
        }
    })

    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
          if (error.code) {
            console.error('Ошибка загрузки: ', error.code)
          }
    
          throw error;
        }
      );

    return api;
}

export default createAPI;
