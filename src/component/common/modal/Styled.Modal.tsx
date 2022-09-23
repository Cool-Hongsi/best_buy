import styled from 'styled-components';
import { ModalPropsType } from 'component/common/modal/Modal.interface';
import { colorStyle, fontStyle, getResponsiveMediaQuery } from 'Styled.GlobalStyle';

export const Modal = styled.div<Partial<ModalPropsType>>`
  position: fixed;
  z-index: 6; // Header z-index (5)
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-content {
    background-color: ${colorStyle.white};
    padding: 30px;
    width: ${(props) => props.width};

    ${getResponsiveMediaQuery('md')} {
      width: 50%;
    }
    ${getResponsiveMediaQuery('sm')} {
      width: 80%;
    }

    .modal-title {
      width: 100%;
      padding: 0px;
      font-family: ${fontStyle.family.latoB};
      font-size: ${fontStyle.size.md};
      margin-bottom: 30px;
    }

    .modal-content {
      width: 100%;
      padding: 0px;
      color: ${colorStyle.darkGrey};
      margin-bottom: 50px;
      line-height: 22px;
    }

    .modal-button-container {
      display: flex;
      justify-content: center;
      font-size: ${fontStyle.size.md};
      div {
        margin: 0 25px;
        cursor: pointer;
      }
    }
  }
`;
