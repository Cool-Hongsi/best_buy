import styled from 'styled-components';
import { getGeneralHorizontalPadding, getResponsiveMediaQuery } from 'Styled.GlobalStyle';

export const Footer = styled.footer`
  border: 2px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  ${getGeneralHorizontalPadding()};

  ${getResponsiveMediaQuery('sm')} {
    ${getGeneralHorizontalPadding('MOBILE')};
  }
`;
