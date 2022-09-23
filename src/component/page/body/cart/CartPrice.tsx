import React from 'react';
import useAppSelector from 'service/hook/useAppSelector';
import { calculateSubTotal, calculateTax } from 'service/util/calculate';
import * as Styled from 'component/page/body/cart/Styled.CartPrice';
import Button from 'component/common/button/Button';
import { colorStyle } from 'Styled.GlobalStyle';

const CartPrice = () => {
  const { cart } = useAppSelector((state) => state.bestbuyReducer);

  return (
    <Styled.CartPrice data-testid="cartPrice-component">
      <div>
        <span>SUBTOTAL</span>
        <span data-testid="subTotalTestId">${calculateSubTotal(cart).toFixed(2)}</span>
      </div>
      <div>
        <span>ESTIMATED TAX (13%)</span>
        <span data-testid="taxTestId">${calculateTax(calculateSubTotal(cart)).toFixed(2)}</span>
      </div>
      <div className="divider"></div>
      <div>
        <span>ESTIMATED TOTAL</span>
        <span data-testid="totalTestId">
          ${(calculateSubTotal(cart) + calculateTax(calculateSubTotal(cart))).toFixed(2)}
        </span>
      </div>
      <div>
        <Button
          dataTestId="goToCheckoutButtonTestId"
          text="Go To Checkout"
          width="100%"
          backgroundColor={colorStyle.dark}
          onClickFunc={() => console.log('Click Go To Checkout')}
        />
      </div>
    </Styled.CartPrice>
  );
};

export default CartPrice;
