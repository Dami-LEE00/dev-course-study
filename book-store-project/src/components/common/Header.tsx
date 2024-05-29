import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Book Store</h1>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.color.background};
  
  h1 {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export default Header;