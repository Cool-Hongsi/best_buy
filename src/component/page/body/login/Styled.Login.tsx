import styled from 'styled-components';
import { colorStyle } from 'Styled.GlobalStyle';

export const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;

  & input,
  button {
    margin-bottom: 35px;
  }

  .login-input-validation-error,
  .login-process-error {
    color: ${colorStyle.red};
  }
`;
