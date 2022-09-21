import React from 'react';
import { render } from '@testing-library/react';
import { LoadingSpinnerPropsType } from 'component/common/loadingSpinner/LoadingSpinner.interface';
import LoadingSpinner from 'component/common/loadingSpinner/LoadingSpinner';
import { colorStyle } from 'Styled.GlobalStyle';

const renderComponent = (props: LoadingSpinnerPropsType) => render(<LoadingSpinner {...props} />);

describe('src/component/common/loadingSpinner/LoadingSpinner', () => {
  let props: LoadingSpinnerPropsType;
  beforeEach(() => {
    props = {
      dataTestId: 'loadingSpinner-component',
      width: '55px',
      height: '55px',
      outsideColor: colorStyle.lightGrey,
      insideColor: colorStyle.dark,
    };
  });

  it('renders LoadingSpinner component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('loadingSpinner-component')).toBeInTheDocument();
  });
  it('tests props values', () => {
    const { getByTestId } = renderComponent(props);
    // <Styled.LoadingSpinner> (div tag) property check with toHaveAttribute
    expect(getByTestId('loadingSpinner-component')).toHaveAttribute('width', '55px');
    expect(getByTestId('loadingSpinner-component')).toHaveAttribute('height', '55px');
  });
});
