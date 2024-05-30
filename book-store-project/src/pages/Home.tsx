import React from 'react';
import Title from '../components/common/Title';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';

const Home = () => {
  return (
    <div>
      <Title size='medium' color='third'>타이틀 테스트</Title>
      <Button
        size='large'
        schema='normal'
        disabled={false}
        isLoading={false}
      >버튼 테스트</Button>
      <InputText placeholder='여기에 입력하세요' />
      <div>Home Compo</div>
    </div>
  )
}

export default Home;