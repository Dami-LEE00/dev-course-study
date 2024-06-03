import React from 'react';
import { useRouteError } from 'react-router-dom';

interface RouteError {
  statusText?: string;
  message?: string;
}

const Error = () => {
  const error = useRouteError() as RouteError;

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <p>다음과 같은 오류가 발생했습니다.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  )
}

export default Error;