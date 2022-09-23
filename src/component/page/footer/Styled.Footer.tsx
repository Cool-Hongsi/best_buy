import styled from 'styled-components';
import {
  colorStyle,
  getGeneralHorizontalPadding,
  getResponsiveMediaQuery,
} from 'Styled.GlobalStyle';

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  background-color: ${colorStyle.dark};
  color: ${colorStyle.white};
  line-height: 25px;
  ${getGeneralHorizontalPadding()};

  ${getResponsiveMediaQuery('sm')} {
    ${getGeneralHorizontalPadding('MOBILE')};
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
  }
`;
