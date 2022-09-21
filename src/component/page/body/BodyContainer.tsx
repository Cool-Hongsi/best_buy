import React from 'react';
import { BodyContainerPropsType } from './BodyContainer.interface';
import * as Styled from 'component/page/body/Styled.BodyContainer';

const BodyContainer = ({ children }: BodyContainerPropsType) => {
  return (
    <Styled.BodyContainer data-testid="bodyContainer-component">{children}</Styled.BodyContainer>
  );
};

export default BodyContainer;
