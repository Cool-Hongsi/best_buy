import React from 'react';
import { ButtonPropsType } from 'component/common/button/Button.interface';
import { colorStyle } from 'Styled.GlobalStyle';
import * as Styled from 'component/common/button/Styled.Button';

const Button = ({
  dataTestId,
  width = '200px',
  height = '45px',
  color = colorStyle.white,
  backgroundColor = colorStyle.lightDark,
  text,
  onClickFunc,
}: ButtonPropsType) => {
  return (
    <Styled.Button
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
      data-testid={dataTestId}
      onClick={onClickFunc}
    >
      {text}
    </Styled.Button>
  );
};

export default Button;
