import React, { useEffect, useState, useRef } from 'react';
import Logo from 'asset/image/best_buy_logo.png';
import { ROUTE } from 'service/const/route';
import { Link } from 'react-router-dom';
import { getHeaderHeight } from 'Styled.GlobalStyle';
import useAppSelector from 'service/hook/useAppSelector';
import { useAppDispatch } from 'service/hook/useAppDispatch';
import { logout } from 'component/redux/auth/authAction';
import { useNavigate } from 'react-router-dom';
import { setDefaultCartRequest } from 'component/redux/bestbuy/bestbuyAction';
import * as Styled from 'component/page/header/Styled.Header';

const Header = () => {
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);
  const { cart } = useAppSelector((state) => state.bestbuyReducer);

  // Set default cart data (Execute when login & logout)
  useEffect(() => {
    dispatch(setDefaultCartRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  console.log(cart);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  let previousScroll = 0;

  const controlDirection = () => {
    const headerSelector = document.querySelector('.header') as HTMLElement;

    // Scroll Down
    if (window.scrollY > previousScroll) {
      headerSelector.style.top = `-${getHeaderHeight()}`;
    }
    // Scroll Up
    else {
      headerSelector.style.top = '0';
    }

    previousScroll = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', controlDirection);
    return () => {
      window.removeEventListener('scroll', controlDirection);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickMobileNav = () => {
    mobileNavRef.current?.focus();
    setOpenMobileNav(!openMobileNav);
  };

  const onClickLogout = () => {
    dispatch(logout(navigate));
  };

  const showCountOfCartFunc = (route: string): JSX.Element => {
    return (
      <div className="countOfCart-container">
        <div className="countOfCart" data-testid="countOfCart">
          {cart.length}
        </div>
        <div>{route}</div>
      </div>
    );
  };

  return (
    <Styled.Header className="header" openMobileNav={openMobileNav} data-testid="header-component">
      <img src={Logo} alt="Logo" className="logo" data-testid="logo" />

      <nav
        className="navigation"
        data-testid="navigation"
        ref={mobileNavRef}
        tabIndex={0}
        onBlur={() => setOpenMobileNav(false)}
      >
        {/* Mobile */}
        <div className="mobile" onClick={onClickMobileNav}>
          <div />
          <div />
          <div />
        </div>
        {/* Web */}
        <div className="web">
          {Object.entries(ROUTE).map((route: string[]): JSX.Element => {
            const isLogOut = route[0] === 'LOGIN' && isLoggedIn ? true : false;
            const showCountOfCart = route[0] === 'CART' && cart.length > 0 ? true : false;

            return (
              <Link
                key={route[0]}
                to={route[1]}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  setOpenMobileNav(false);
                  if (isLogOut) {
                    e.preventDefault(); // Prevent moving '/login' when isLogOut is true
                    onClickLogout();
                  }
                }}
                data-testid="navigation-each"
              >
                {isLogOut ? 'LOGOUT' : showCountOfCart ? showCountOfCartFunc(route[0]) : route[0]}
              </Link>
            );
          })}
        </div>
      </nav>
    </Styled.Header>
  );
};

export default Header;
