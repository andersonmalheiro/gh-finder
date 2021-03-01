import Axios, { AxiosInstance } from 'axios';
import { config } from '../config';
import { useAuth } from 'hooks';

/**
 * HTTP client
 */
export const httpClient: AxiosInstance = Axios.create({
  baseURL: config.API_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = useAuth();
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
