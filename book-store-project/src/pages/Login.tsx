import React from 'react';
import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SignupWrapper } from './Signup';
import { useAuth } from '@/hooks/useAuth';

export interface LoginProps {
  email: string;
  password: string;
}

const Login = () => {
  const { userLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    userLogin(data);
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