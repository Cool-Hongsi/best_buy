import styled from 'styled-components';
import { colorStyle, fontStyle } from 'Styled.GlobalStyle';

export const Product = styled.div`
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  cursor: pointer;

  .product-name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .product-manufacturer-modelNumber-container {
    margin: 20px 0;
    font-size: ${fontStyle.size.xs};
    > span:nth-child(1) {
      color: ${colorStyle.darkGrey};
    }
  }

  .product-price-container {
    margin-top: 20px;
    font-size: ${fontStyle.size.md};
    font-family: ${fontStyle.family.lexendDecaR};

    .product-regularPrice-with-salePrice {
      color: ${colorStyle.darkGrey};
      text-decoration: line-through;
    }
  }
`;
