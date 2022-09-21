import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { InputPropsType } from 'component/common/input/Input.interface';
import Input from 'component/common/input/Input';

const renderComponent = (props: InputPropsType) => render(<Input {...props} />);

describe('src/component/common/input/Input', () => {
  let props: InputPropsType;
  const mockOnChangeFunc = jest.fn();
  const mockOnKeyDownFunc = jest.fn();

  beforeEach(() => {
    props = {
      dataTestId: 'testInputId',
      width: '200px',
      height: '40px',
      placeholder: 'Please input',
      name: 'testInputName',
      value: '',
      onChangeFunc: mockOnChangeFunc,
      onKeyDownFunc: mockOnKeyDownFunc,
    };
  });

  it('renders Input component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('testInputId')).toBeInTheDocument();
  });
  it('tests props values', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('testInputId')).toHaveAttribute('width', '200px');
    expect(getByTestId('testInputId')).toHaveAttribute('height', '40px');
    expect(getByTestId('testInputId')).toHaveAttribute('placeholder', 'Please input');
    expect(getByTestId('testInputId')).toHaveAttribute('name', 'testInputName');
  });
  it('tests onChange event', () => {
    const { getByTestId } = renderComponent(props);
    const testInput = getByTestId('testInputId');
    fireEvent.change(testInput, {
      target: {
        value: 'test1',
      },
    });
    expect(mockOnChangeFunc).toHaveBeenCalledTimes(1);
    expect(mockOnChangeFunc).toHaveBeenCalledWith({ name: 'testInputName', value: 'test1' });
    fireEvent.change(testInput, {
      target: {
        value: 'test2',
      },
    });
    expect(mockOnChangeFunc).toHaveBeenCalledTimes(2);
    expect(mockOnChangeFunc).toHaveBeenCalledWith({ name: 'testInputName', value: 'test2' });
  });
  it('tests onKeyDown event', () => {
    const { getByTestId } = renderComponent(props);
    const testInput = getByTestId('testInputId');
    fireEvent.keyDown(testInput, {
      key: 'Enter',
    });
    expect(mockOnKeyDownFunc).toHaveBeenCalledTimes(1);
    expect(mockOnKeyDownFunc).toHaveBeenCalledWith('Enter');
  });
});
