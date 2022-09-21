import styled from 'styled-components';
import { InputPropsType } from 'component/common/input/Input.interface';
import { fontStyle, getResponsiveMediaQuery } from 'Styled.GlobalStyle';

export const Input = styled.input<Partial<InputPropsType>>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  ${getResponsiveMediaQuery('sm')} {
    width: 100%;
    font-size: ${fontStyle.size.sm};
  }
`;
