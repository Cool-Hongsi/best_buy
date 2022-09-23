import styled from 'styled-components';
import { colorStyle, fontStyle, getGridColumns, getResponsiveMediaQuery } from 'Styled.GlobalStyle';

export const ProductDetailMain = styled.section`
  display: grid;
  grid-template-columns: 400px 1fr;
  column-gap: 100px;

  .product-detail-main-image {
    min-width: 300px;
    max-width: 400px;
    height: auto;
    border: 2px solid pink;
  }

  .product-detail-main-description {
    border: 2px solid red;
    .product-detail-main-manufacturer-modelNumber-container {
      margin: 20px 0;
      font-size: ${fontStyle.size.xs};
      > span:nth-child(1) {
        color: ${colorStyle.darkGrey};
      }
    }
    .product-detail-main-name {
      font-size: ${fontStyle.size.lg};
    }
    .product-detail-main-price-container {
      margin: 20px 0;
      font-size: ${fontStyle.size.md};
      font-family: ${fontStyle.family.lexendDecaR};

      .product-detail-main-regularPrice-with-salePrice {
        color: ${colorStyle.darkGrey};
        text-decoration: line-through;
      }
    }
    .product-detail-main-quantity {
      > span:nth-child(2) {
        color: ${colorStyle.darkGrey};
      }
    }
    .product-detail-main-description {
      margin: 20px 0;
      line-height: 25px;
    }
    .product-detail-main-count-container {
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      width: 180px;
      justify-content: space-between;

      ${getResponsiveMediaQuery('sm')} {
        button {
          width: 50px;
        }
      }
    }
    .product-detail-main-buy-cart-button-container {
      > button:nth-child(1) {
        margin-right: 20px;
      }
    }
  }

  ${getResponsiveMediaQuery('md')} {
    grid-template-columns: 300px 1fr;
    column-gap: 40px;

    .product-detail-main-image {
      min-width: 200px;
      max-width: 300px;
    }
  }

  ${getResponsiveMediaQuery('sm')} {
    ${getGridColumns(1)};
    column-gap: 0px;
    row-gap: 40px;

    .product-detail-main-image {
      min-width: 100%;
      max-width: 100%;
    }
    .product-detail-main-buy-cart-button-container {
      > button:nth-child(1) {
        margin-bottom: 20px;
        margin-right: 0px;
      }
    }
  }
`;
