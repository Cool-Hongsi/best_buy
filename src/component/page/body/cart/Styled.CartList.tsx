import styled from 'styled-components';
import { colorStyle, fontStyle, getResponsiveMediaQuery } from 'Styled.GlobalStyle';

export const CartList = styled.div`
  display: flex;
  flex-direction: column;

  .cartList-deleteAll-button {
    text-align: end;
  }

  .cartList-table {
    margin-top: 30px;
    border-collapse: collapse;
    border: 1px solid ${colorStyle.grey};

    th {
      font-family: ${fontStyle.family.latoL};
      border-bottom: 1px solid ${colorStyle.grey};
      width: max-content;
      min-width: 100px;
      padding: 12px;

      ${getResponsiveMediaQuery('sm')} {
        min-width: 35px;
        padding: 14px 4px;
        font-size: ${fontStyle.size.ms};
      }
      .cartList-each-cell-image {
        width: 100px;
        height: 100px;

        ${getResponsiveMediaQuery('sm')} {
          display: none;
          // width: 35px;
          // height: 35px;
          border: 2px solid red;
        }
      }
    }
    .cartList-each-cell-delete {
      cursor: pointer;
    }
  }
`;
