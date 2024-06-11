import Title from '@/components/common/Title';
import styled from 'styled-components';

const Home = () => {
  return (
    <HomeStyle>
      <Title size='large' color='primary'>
        Home
      </Title>
    </HomeStyle>
  )
};

const HomeStyle = styled.div``;


export default Home;