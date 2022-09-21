import styled from 'styled-components';
import {
  getGeneralHorizontalPadding,
  getHeaderHeight,
  getResponsiveMediaQuery,
} from 'Styled.GlobalStyle';

export const BodyContainer = styled.div`
  min-height: calc(100vh - ${getHeaderHeight()});
  ${getGeneralHorizontalPadding()};

  ${getResponsiveMediaQuery('sm')} {
    ${getGeneralHorizontalPadding('MOBILE')};
  }
`;
