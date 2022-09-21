import styled from 'styled-components';
import { colorStyle, fontStyle } from 'Styled.GlobalStyle';

export const Search = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin: 25px 0;
  }

  button {
    margin-bottom: 25px;
  }

  .search-instruction {
    font-size: ${fontStyle.size.md};
    font-family: ${fontStyle.family.lexendDecaR};
  }

  .search-input-validation-error,
  .search-process-error {
    color: ${colorStyle.red};
  }
`;
