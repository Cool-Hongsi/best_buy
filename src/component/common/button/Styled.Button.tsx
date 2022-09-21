import styled from 'styled-components';
import { colorStyle, fontStyle, getResponsiveMediaQuery } from 'Styled.GlobalStyle';
import { ButtonPropsType } from './Button.interface';

export const Button = styled.button<Partial<ButtonPropsType>>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border: none;
  cursor: pointer;
  transition: 0.3s;

  :hover {
    background-color: ${colorStyle.dark};
  }

  ${getResponsiveMediaQuery('sm')} {
    width: 100%;
    font-size: ${fontStyle.size.sm};
  }
`;
