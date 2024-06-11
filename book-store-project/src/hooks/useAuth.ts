import { login, resetPassword, resetRequest, signup } from "@/api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "@/store/authStore";
import { useAlert } from "./useAlert";
import { useNavigate } from "react-router-dom";
import { SignupProps } from "@/pages/Signup";
import { useState } from "react";

export const useAuth = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  // 상태
  const { storeLogin, storeLogout, isloggedIn } = useAuthStore();

  // 메소드 (로그인)
  const userLogin = (data: LoginProps) => {
    login(data).then((res) => {

      // 상태 변화
      storeLogin(res.token);

      showAlert('로그인이 완료되었습니다.');
      navigate('/');
    }, (error) => {
      showAlert('로그인에 실패하였습니다.');
      window.location.reload();
    });
  };

  // 메소드 (회원가입)
  const userSignup = (data: SignupProps) => {
    signup(data).then((res) => {
      // 성공
      showAlert('회원가입이 완료되었습니다.');
      navigate('/login');
    });
  };

  // 메소드 (비밀번호 초기화)
  const userResetPassword = (data: SignupProps) => {
    // 초기화
    resetPassword(data).then(() => {
      showAlert('비밀번호 초기화가 완료되었습니다.');
      navigate('/login');
    });
  };

  // 메소드 (비밀번호 초기화 요청)
  const [resetRequested, setResetRequested] = useState(false);
  const userResetRequest = (data: SignupProps) => {
    // 요청
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  // 리턴
  return { userLogin, userSignup, userResetPassword, userResetRequest, resetRequested };
};