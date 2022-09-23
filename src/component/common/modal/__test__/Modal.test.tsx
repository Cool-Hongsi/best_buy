import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ModalPropsType } from 'component/common/modal/Modal.interface';
import Modal from 'component/common/modal/Modal';

const renderComponent = (props: ModalPropsType) => render(<Modal {...props} />);

describe('src/component/common/modal/Modal', () => {
  let props: ModalPropsType;
  const mockOnClickYesButtonFunc = jest.fn();
  const mockOnClickNoButtonFunc = jest.fn();

  beforeEach(() => {
    props = {
      dataTestId: 'testModalId',
      width: '40%',
      title: 'testModalTitle',
      content: 'testModalContent',
      yesButtonText: 'testYesButtonText',
      noButtonText: 'testNoButtonText',
      onClickYesButton: mockOnClickYesButtonFunc,
      onClickNoButton: mockOnClickNoButtonFunc,
    };
  });

  it('renders Modal component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('testModalId')).toBeInTheDocument();
  });
  it('tests props values', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('modal-title')).toHaveTextContent('testModalTitle');
    expect(getByTestId('modal-content')).toHaveTextContent('testModalContent');
    expect(getByTestId('modal-yes-button')).toHaveTextContent('testYesButtonText');
    expect(getByTestId('modal-no-button')).toHaveTextContent('testNoButtonText');
  });
  it('tests onClick event', () => {
    const { getByTestId } = renderComponent(props);
    const yesButton = getByTestId('modal-yes-button');
    const noButton = getByTestId('modal-no-button');
    fireEvent.click(yesButton);
    expect(mockOnClickYesButtonFunc).toHaveBeenCalledTimes(1);
    fireEvent.click(noButton);
    expect(mockOnClickNoButtonFunc).toHaveBeenCalledTimes(1);
  });
});
