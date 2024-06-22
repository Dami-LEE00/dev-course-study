import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.jpeg';

const Footer = () => {
  return (
    <FooterStyle>
      <h1 className="logo">
        <img src={logo} alt="Book Store" />
      </h1>
      <div className='copyright'>
        <p>copyright(c), 2024, Book Store.</p>
      </div>
    </FooterStyle>
  )
}

const FooterStyle = styled.footer`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.width.large};
  border-top: 1px solid ${({ theme }) => theme.color.background};
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    img {
      width: 140px;
    }
  }

  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.text};
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    flex-direction: column;
    align-items: center;
  }
`;

export default Footer;