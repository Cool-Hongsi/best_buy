import styled from 'styled-components';
import { colorStyle, fontStyle } from 'Styled.GlobalStyle';

export const Pagination = styled.div`
  padding: 25px 0;
  text-align: center;

  .arrow {
    border: 1px solid ${colorStyle.dark};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 5.5px;
    cursor: pointer;
    margin: 0 20px;
  }

  .left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .inactive {
    border: 1px solid ${colorStyle.grey};
    border-width: 0 2px 2px 0;
  }

  span {
    font-size: ${fontStyle.size.md};
    margin: 0 20px;

    :nth-child(2),
    :nth-child(4) {
      cursor: pointer;
    }
    :nth-child(3) {
      font-size: ${fontStyle.size.lg};
    }
  }
`;
