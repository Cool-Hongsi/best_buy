import React from 'react';
import CartList from 'component/page/body/cart/CartList';
import CartPrice from 'component/page/body/cart/CartPrice';
import * as Styled from 'component/page/body/cart/Styled.CartContainer';

const CartContainer = () => {
  return (
    <Styled.CartContainer data-testid="cartContainer-component">
      <CartList />
      <CartPrice />
    </Styled.CartContainer>
  );
};

export default CartContainer;
