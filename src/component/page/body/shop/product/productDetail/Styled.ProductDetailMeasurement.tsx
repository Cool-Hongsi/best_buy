import styled from 'styled-components';
import { colorStyle } from 'Styled.GlobalStyle';

export const ProductDetailMeasurement = styled.section`
  margin-top: 60px;

  .product-detail-measurement-selector {
    border-bottom: 1px solid ${colorStyle.dark};
    display: flex;
  }
  .product-detail-measurement-data {
    margin-top: 25px;
  }
`;
