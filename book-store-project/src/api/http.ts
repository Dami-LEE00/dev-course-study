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

// 공통 요청 부분
type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <T>(
  method: RequestMethod, 
  url: string,
  payload?: T
) => {
  let response;

  switch(method) {
    case 'post':
      response = await httpClient.post(url, payload);
      break;
    case 'get':
      response = await httpClient.get(url);
      break;
    case 'put':
      response = await httpClient.put(url, payload);
      break;
    case 'delete':
      response = await httpClient.delete(url);
      break;
    default:
      throw new Error(`Unsupported request method: ${method}`);
  }
};