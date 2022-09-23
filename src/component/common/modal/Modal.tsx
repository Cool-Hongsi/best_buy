import React, { useEffect, useRef } from 'react';
import { ModalPropsType } from 'component/common/modal/Modal.interface';
import * as Styled from 'component/common/modal/Styled.Modal';

const Modal = ({
  dataTestId,
  width = '40%',
  title,
  content,
  yesButtonText = '',
  noButtonText = '',
  onClickYesButton = () => null,
  onClickNoButton = () => null,
}: ModalPropsType) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return (
    <Styled.Modal data-testid={dataTestId} width={width}>
      <div className="modal-content" ref={modalRef} tabIndex={0} onBlur={onClickNoButton}>
        <div data-testid="modal-title" className="modal-title">
          {title}
        </div>
        <div data-testid="modal-content" className="modal-content">
          {content}
        </div>
        <div className="modal-button-container">
          {yesButtonText && (
            <div data-testid="modal-yes-button" onClick={onClickYesButton}>
              {yesButtonText}
            </div>
          )}
          {noButtonText && (
            <div data-testid="modal-no-button" onClick={onClickNoButton}>
              {noButtonText}
            </div>
          )}
        </div>
      </div>
    </Styled.Modal>
  );
};

export default Modal;
