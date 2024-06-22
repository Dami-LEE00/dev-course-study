import React from 'react';
import styled from 'styled-components';
import Header from '../common/Header';
import Footer from '../common/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  )
}

const LayoutStyle = styled.main`
  margin: 0 auto;
  padding: 20px 0;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.width.large};

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 20px 12px;
  }
`;

export default Layout;