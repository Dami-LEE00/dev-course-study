import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Order = () => {
  const location = useLocation();
  const orderDataFromCart = location.state;
  console.log(orderDataFromCart);

  return (
    <OrderWrapper>
      <h1>Order</h1>
    </OrderWrapper>
  )
};

const OrderWrapper = styled.div``;

export default Order;