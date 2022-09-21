import React from 'react';
import { InputPropsType } from 'component/common/input/Input.interface';
import * as Styled from 'component/common/input/Styled.Input';

const Input = ({
  dataTestId,
  width = '200px',
  height = '45px',
  placeholder = 'Please input',
  name,
  value,
  onChangeFunc,
  onKeyDownFunc = () => null,
}: InputPropsType) => {
  return (
    <Styled.Input
      data-testid={dataTestId}
      width={width}
      height={height}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChangeFunc({ name: e.target.name, value: e.target.value })
      }
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyDownFunc(e.key)}
    ></Styled.Input>
  );
};

export default Input;
