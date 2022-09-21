import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ROUTE } from 'service/const/route';
import { Provider } from 'react-redux';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { logout } from 'component/redux/auth/authAction';
import { setDefaultCartRequest } from 'component/redux/bestbuy/bestbuyAction';
import Header from 'component/page/header/Header';

jest.mock('component/redux/auth/authAction', () => ({
  logout: jest.fn(),
}));
jest.mock('component/redux/bestbuy/bestbuyAction', () => ({
  setDefaultCartRequest: jest.fn(),
}));

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

const renderComponent = (store: Store) =>
  render(
    <Router>
      {/* useSelector or useDispatch 사용한 곳만 <Provider store={store}> */}
      <Provider store={store}>
        <Header />
      </Provider>
    </Router>,
  );

describe('src/component/page/header/Header', () => {
  let store: Store;

  describe('isLoggedIn is false', () => {
    beforeEach(() => {
      store = createMockStore({
        authReducer: {
          isLoggedIn: false,
        },
        bestbuyReducer: {
          searchTerm: '',
          products: [],
          cart: [],
        },
      });
      store.dispatch = jest.fn();
    });

    it('renders Header component', () => {
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('header-component')).toBeInTheDocument();
    });
    it('contains logo / navigation tags', () => {
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('logo')).toBeInTheDocument();
      expect(getByTestId('navigation')).toBeInTheDocument();
    });
    it('test navigation-each tag', () => {
      const { getAllByTestId } = renderComponent(store);
      expect(getAllByTestId('navigation-each')).toBeDefined();
      expect(getAllByTestId('navigation-each')).toHaveLength(Object.keys(ROUTE).length);
      for (let i = 0; i < Object.keys(ROUTE).length; i++) {
        expect(getAllByTestId('navigation-each')[i].textContent).toStrictEqual(
          Object.keys(ROUTE)[i],
        );
      }
    });
    it('test current url when clicking navigation-each', () => {
      const { getAllByTestId } = renderComponent(store);
      expect(window.location.pathname).toStrictEqual('/');
      for (let i = 0; i < Object.values(ROUTE).length; i++) {
        fireEvent.click(getAllByTestId('navigation-each')[i]);
        expect(window.location.pathname).toStrictEqual(Object.values(ROUTE)[i]);
      }
    });
    it('test call dispatch (setDefaultCartRequest)', () => {
      renderComponent(store);
      expect(setDefaultCartRequest).toHaveBeenCalled();
    });
  });

  describe('isLoggedIn is true', () => {
    beforeEach(() => {
      store = createMockStore({
        authReducer: {
          isLoggedIn: true,
        },
        bestbuyReducer: {
          searchTerm: '',
          products: [],
          cart: [],
        },
      });
      store.dispatch = jest.fn();
    });

    it('renders Header component', () => {
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('header-component')).toBeInTheDocument();
    });
    it('contains logo / navigation tags', () => {
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('logo')).toBeInTheDocument();
      expect(getByTestId('navigation')).toBeInTheDocument();
    });
    it('test navigation-each tag', () => {
      const { getAllByTestId } = renderComponent(store);
      expect(getAllByTestId('navigation-each')).toBeDefined();
      expect(getAllByTestId('navigation-each')).toHaveLength(Object.keys(ROUTE).length);
      for (let i = 0; i < Object.keys(ROUTE).length; i++) {
        if (Object.keys(ROUTE)[i] === 'LOGIN') {
          expect(getAllByTestId('navigation-each')[i].textContent).toStrictEqual('LOGOUT');
          continue;
        }
        expect(getAllByTestId('navigation-each')[i].textContent).toStrictEqual(
          Object.keys(ROUTE)[i],
        );
      }
    });
    it('test current url when clicking navigation-each', () => {
      const { getAllByTestId } = renderComponent(store);
      expect(window.location.pathname).toStrictEqual('/login');
      for (let i = 0; i < Object.values(ROUTE).length; i++) {
        if (getAllByTestId('navigation-each')[i].textContent === 'LOGOUT') {
          fireEvent.click(getAllByTestId('navigation-each')[i]);
          expect(logout).toHaveBeenCalled();
          expect(logout).toHaveBeenCalledWith(mockUseNavigate);
          continue;
        }
        fireEvent.click(getAllByTestId('navigation-each')[i]);
        expect(window.location.pathname).toStrictEqual(Object.values(ROUTE)[i]);
      }
    });
    it('test call dispatch (setDefaultCartRequest)', () => {
      renderComponent(store);
      expect(setDefaultCartRequest).toHaveBeenCalled();
    });
  });
});
