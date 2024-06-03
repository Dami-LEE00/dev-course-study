import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login, signup } from '../api/auth.api';
import { useAlert } from '../hooks/useAlert';
import { SignupWrapper } from './Signup';
import { useAuthStore } from '../store/authStore';

export interface SignupProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const {
    isloggedIn,
    storeLogin,
    storeLogout,
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    login(data).then((res) => {

      // 상태 변화
      storeLogin(res.token);

      showAlert('로그인이 완료되었습니다.');
      navigate('/');
    }, (error) => {
      showAlert('로그인에 실패하였습니다.');
      window.location.reload();
    })
  };

  return (
    <>
      <Title size='large'>로그인</Title>
      <SignupWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              inputType='email'
              placeholder='이메일'
              {...register('email', {required: true})}
            />
            {errors.email &&
              <p className='error-text'>이메일을 입력해주세요.</p>
            }
          </fieldset>
          <fieldset>
            <InputText
              inputType='password'
              placeholder='비밀번호'
              {...register('password', {required: true})}
            />
            {errors.password &&
              <p className='error-text'>비밀번호를 입력해주세요.</p>
            }
          </fieldset>
          <fieldset>
            <Button
              type='submit'
              size='medium'
              schema='primary'
            >로그인</Button>
          </fieldset>
          <div className="info">
            <Link to='/reset'>비밀번호 초기화</Link>
          </div>
        </form>
      </SignupWrapper>
    </>
  )
};

export default Login;