import styled from 'styled-components';
import { colorStyle, fontStyle } from 'Styled.GlobalStyle';

export const CartPrice = styled.div`
  box-shadow: 0 0 8px ${colorStyle.grey};
  height: max-content;
  padding: 30px;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-between;
    margin: 12px 0;
    span:nth-child(2) {
      font-family: ${fontStyle.family.latoB};
    }
  }
  .divider {
    border-top: 2px solid ${colorStyle.grey};
  }
`;
