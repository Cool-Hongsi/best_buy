import styled from 'styled-components';
import { getGridColumns, getResponsiveMediaQuery } from 'Styled.GlobalStyle';

export const CartContainer = styled.div`
  padding: 50px 0;
  border: 2px solid red;
  display: grid;
  grid-template-columns: 1fr 350px;
  column-gap: 70px;

  ${getResponsiveMediaQuery('md')} {
    ${getGridColumns(1)};
    column-gap: 0px;
    row-gap: 50px;
  }

  ${getResponsiveMediaQuery('sm')} {
    ${getGridColumns(1)};
    column-gap: 0px;
    row-gap: 50px;
  }
`;
