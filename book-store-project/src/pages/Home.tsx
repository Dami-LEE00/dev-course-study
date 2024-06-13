import Title from '@/components/common/Title';
import MainReview from '@/components/main/MainReview';
import { useMain } from '@/hooks/useMain';
import styled from 'styled-components';

const Home = () => {
  const { reviews } = useMain();

  return (
    <HomeStyle>
      {/* 배너 */}

      {/* 베스트 셀러 */}

      {/* 신간 */}

      {/* 리뷰 */}
      <MainReview reviews={reviews} />

    </HomeStyle>
  )
};

const HomeStyle = styled.div``;


export default Home;