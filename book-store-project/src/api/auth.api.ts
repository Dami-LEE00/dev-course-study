import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async(useData: SignupProps) => {
  const response = await httpClient.post('/users/join', useData);

  return response.data;
}