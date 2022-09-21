import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTE } from 'service/const/route';
import Header from 'component/page/header/Header';
import Footer from 'component/page/footer/Footer';
import BodyContainer from 'component/page/body/BodyContainer';
import LoadingSpinner from 'component/common/loadingSpinner/LoadingSpinner';
import { getLocalStorage } from 'service/util/localStorage';
import { useAppDispatch } from 'service/hook/useAppDispatch';
import { loginSuccess } from 'component/redux/auth/authAction';
import { setDefaultCartRequest } from 'component/redux/bestbuy/bestbuyAction';
import * as Styled from 'Styled.App';

const { HOME, SHOP, CART, LOGIN } = ROUTE;

const Home = React.lazy(() => import('component/page/body/home/Home'));
const Shop = React.lazy(() => import('component/page/body/shop'));
const Cart = React.lazy(() => import('component/page/body/cart/Cart'));
const Login = React.lazy(() => import('component/page/body/login/Login'));
// ProductDetailContainer does NOT belong to ROUTE!
const ProductDetailContainer = React.lazy(
  () => import('component/page/body/shop/product/productDetail'),
);

const App = () => {
  const dispatch = useAppDispatch();

  // Check login status and set default cart data (Execute once in initial loading)
  useEffect(() => {
    if (getLocalStorage('auth')) {
      dispatch(loginSuccess());
    }
    dispatch(setDefaultCartRequest());
  }, [dispatch]);

  return (
    <Styled.App data-testid="app-component">
      <Header />

      <BodyContainer>
        <Suspense
          fallback={
            <div className="loading-spinner-container">
              <LoadingSpinner dataTestId="loadingSpinner-component" />
            </div>
          }
        >
          <Routes>
            <Route path={HOME} element={<Home />}></Route>
            <Route path={SHOP} element={<Shop />}></Route>
            <Route path={CART} element={<Cart />}></Route>
            <Route path={LOGIN} element={<Login />}></Route>
            <Route path={SHOP + '/:id'} element={<ProductDetailContainer />}></Route>
          </Routes>
        </Suspense>
      </BodyContainer>

      <Footer />
    </Styled.App>
  );
};

export default App;
