import React, { useState } from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';

const Cart = () => {
  const { carts, deleteCartItem } = useCart();
  console.log(carts);

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const handleCheckItem = (id: number) => {
    if(checkedItems.includes(id)) {
      // 체크 해제
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      // 체크
      setCheckedItems([
        ...checkedItems,
        id
      ]);
    }
  };

  const handleItemDelete = (id: number) => {
    deleteCartItem(id);
  };

  return (
    <>
      <Title size='large'>장바구니</Title>
      <CartWrapper>
        <div className="content">
          {carts.map((item) => (
            <CartItem
              key={item.id} 
              cart={item} 
              checkedItems={checkedItems}
              onCheck={handleCheckItem}
              onDelete={handleItemDelete}

            />
          ))}
        </div>
        <div className="summary">summary</div>
      </CartWrapper>
    </>
  )
};

const CartWrapper = styled.div`

`;

export default Cart;