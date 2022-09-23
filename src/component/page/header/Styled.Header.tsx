import styled from 'styled-components';
import {
  colorStyle,
  fontStyle,
  getGeneralHorizontalPadding,
  getHeaderHeight,
  getResponsiveMediaQuery,
} from 'Styled.GlobalStyle';
import { HeaderStylePropsType } from './Header.interface';

export const Header = styled.header<HeaderStylePropsType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${getHeaderHeight()};

  position: sticky;
  transition: top 0.5s;
  z-index: 5;
  top: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 8px ${colorStyle.grey};
  background-color: ${colorStyle.white};
  ${getGeneralHorizontalPadding()};

  ${getResponsiveMediaQuery('sm')} {
    ${getGeneralHorizontalPadding('MOBILE')};
  }

  .logo {
    width: 90px;
    height: 50px;
  }

  .navigation {
    .web {
      display: flex;
      & a {
        margin-left: 40px;
        cursor: pointer;
      }

      .countOfCart-container {
        position: relative;

        .countOfCart {
          position: absolute;
          top: -7px;
          right: -10px;
          background-color: ${colorStyle.red};
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${colorStyle.white};
          font-size: ${fontStyle.size.ms};
        }
      }
    }

    ${getResponsiveMediaQuery('sm')} {
      .mobile {
        width: 25px;
        height: 25px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        z-index: 20;
        cursor: pointer;

        div {
          width: 25px;
          height: 2.5px;
          background-color: ${(props) =>
            props.openMobileNav ? colorStyle.darkGrey : colorStyle.dark};
          // border-radius: 10px;
          transform-origin: 1px;
          transition: all 0.3s linear;
          z-index: 20;

          &:nth-child(1) {
            transform: ${(props) => (props.openMobileNav ? 'rotate(45deg)' : 'rotate(0)')};
          }
          &:nth-child(2) {
            transform: ${(props) => (props.openMobileNav ? 'translateX(100%)' : 'translateX(0)')};
            opacity: ${(props) => (props.openMobileNav ? 0 : 1)};
          }
          &:nth-child(3) {
            transform: ${(props) => (props.openMobileNav ? 'rotate(-45deg)' : 'rotate(0)')};
          }
        }
      }
      .web {
        transform: ${(props) => (props.openMobileNav ? 'translateX(0)' : 'translateX(100%)')};
        transition: transform 0.3s ease-in-out;
        display: flex;
        position: fixed;
        top: 0;
        right: 0;
        flex-direction: column;
        background-color: ${colorStyle.lightGrey};
        width: 220px;
        height: 100vh;
        outline: none;
        & a {
          margin: 100px 0 0 40px;
          width: 50px;
        }
      }
    }
  }
`;
