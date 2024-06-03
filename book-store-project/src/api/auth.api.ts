import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async(useData: SignupProps) => {
  const response = await httpClient.post('/users/join', useData);

  return response.data;
};

// 비밀번호 초기화(+요청)
export const resetRequest = async (data: SignupProps) => {
  const response = await httpClient.post('/users/reset', data);

  return response.data;
};

export const resetPassword = async (data: SignupProps) => {
  const response = await httpClient.put('/users/reset', data);

  return response.data;
};

// 로그인
interface LoginResponse {
  token: string;
}

export const login = async (data: SignupProps) => {
  const response = await httpClient.post<LoginResponse>('/users/login', data);

  return response.data;
}