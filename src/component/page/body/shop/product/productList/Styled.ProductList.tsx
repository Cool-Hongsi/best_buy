import styled from 'styled-components';
import { getGridColumns, getResponsiveMediaQuery } from 'Styled.GlobalStyle';

export const ProductList = styled.div`
  padding: 50px 0;
  display: grid;
  ${getGridColumns(4)};
  column-gap: 35px;
  row-gap: 70px;

  ${getResponsiveMediaQuery('md')} {
    ${getGridColumns(3)};
    column-gap: 15px;
  }

  ${getResponsiveMediaQuery('sm')} {
    ${getGridColumns(1)};
    column-gap: 0px;
    row-gap: 50px;
  }
`;
