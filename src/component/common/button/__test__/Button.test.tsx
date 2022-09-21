import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ButtonPropsType } from 'component/common/button/Button.interface';
import Button from 'component/common/button/Button';
import { colorStyle } from 'Styled.GlobalStyle';

const renderComponent = (props: ButtonPropsType) => render(<Button {...props} />);

describe('src/component/common/button/Button', () => {
  let props: ButtonPropsType;
  const mockOnClickFunc = jest.fn();

  beforeEach(() => {
    props = {
      dataTestId: 'testButtonId',
      width: '200px',
      height: '40px',
      color: colorStyle.dark,
      backgroundColor: colorStyle.lightGrey,
      text: 'Test Button',
      onClickFunc: mockOnClickFunc,
    };
  });

  it('renders Button component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('testButtonId')).toBeInTheDocument();
  });
  it('tests props values', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('testButtonId')).toHaveAttribute('width', '200px');
    expect(getByTestId('testButtonId')).toHaveAttribute('height', '40px');
    expect(getByTestId('testButtonId')).toHaveAttribute('color', colorStyle.dark);
    expect(getByTestId('testButtonId')).toHaveTextContent('Test Button');
  });
  it('tests onClick event', () => {
    const { getByTestId } = renderComponent(props);
    const testButton = getByTestId('testButtonId');
    fireEvent.click(testButton);
    expect(mockOnClickFunc).toHaveBeenCalledTimes(1);
  });
});
