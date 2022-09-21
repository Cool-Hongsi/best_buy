import React from 'react';
import { LoadingSpinnerPropsType } from 'component/common/loadingSpinner/LoadingSpinner.interface';
import { colorStyle } from 'Styled.GlobalStyle';
import * as Styled from 'component/common/loadingSpinner/Styled.LoadingSpinner';

const LoadingSpinner = ({
  dataTestId,
  width = '55px',
  height = '55px',
  outsideColor = colorStyle.lightGrey,
  insideColor = colorStyle.dark,
}: LoadingSpinnerPropsType) => {
  return (
    <Styled.LoadingSpinner
      width={width}
      height={height}
      outsideColor={outsideColor}
      insideColor={insideColor}
      data-testid={dataTestId}
    ></Styled.LoadingSpinner>
  );
};

export default LoadingSpinner;
