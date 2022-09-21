import styled from 'styled-components';
import { LoadingSpinnerPropsType } from './LoadingSpinner.interface';

export const LoadingSpinner = styled.div<Partial<LoadingSpinnerPropsType>>`
  border-radius: 50%;
  animation: spin 2s linear infinite;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 6px solid ${(props) => props.outsideColor};
  border-top: 6px solid ${(props) => props.insideColor};
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
