import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

const BASE_URL = 'http://localhost:9999';
const DEFAULT_TIMEOUT = 300000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken() ? getToken() : '',
      // Authorization: localStorage.getItem("token"),
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.request.use(
    (response) => {
      return response;
    },
    (error) => {
      // 토큰이 만료되었다면?
      if(error.response.status === 401) {
        removeToken();
        window.location.href = '/login';
        return;
      }
      // 로그인 만료 처리
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();