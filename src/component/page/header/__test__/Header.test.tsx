import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ROUTE } from 'service/const/route';
import { Provider } from 'react-redux';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
// For Redux
import { logout } from 'component/redux/auth/authAction';
// For Slice
// import { logout } from 'component/slice/auth/authThunk';
// For Redux
import { setDefaultCartRequest } from 'component/redux/bestbuy/bestbuyAction';
// For Slice
// import { setDefaultCartRequest } from 'component/slice/bestbuy/bestbuyThunk';
import { mockProductData } from 'service/mock/data/bestbuy';
import Header from 'component/page/header/Header';

// For Redux
jest.mock('component/redux/auth/authAction', () => ({
  logout: jest.fn(),
}));
jest.mock('component/redux/bestbuy/bestbuyAction', () => ({
  setDefaultCartRequest: jest.fn(),
}));
// For Slice
// jest.mock('component/slice/auth/authThunk', () => ({
//   logout: jest.fn(),
// }));
// jest.mock('component/slice/bestbuy/bestbuyThunk', () => ({
//   setDefaultCartRequest: jest.fn(),
// }));

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

const renderComponent = (store: Store) =>
  render(
    <Router>
      {/* Provider는 해당 Component 또는 자식 Component에서 useSelector / useDispatch를 사용했으면 Wrap 해줘야 한다. */}
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
      fireEvent.click(getByTestId('logo'));
      expect(window.location.pathname).toStrictEqual(ROUTE.HOME);
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

  describe('Count of Cart', () => {
    it('test count of cart (cart length = 0)', () => {
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
      const { queryByTestId } = renderComponent(store);
      expect(queryByTestId('countOfCart')).not.toBeInTheDocument();
    });
    it('test count of cart (cart length = mockProductData length)', () => {
      store = createMockStore({
        authReducer: {
          isLoggedIn: false,
        },
        bestbuyReducer: {
          searchTerm: '',
          products: [],
          cart: mockProductData,
        },
      });
      store.dispatch = jest.fn();
      const { queryByTestId } = renderComponent(store);
      expect(queryByTestId('countOfCart')).toBeInTheDocument();
      expect(queryByTestId('countOfCart')).toHaveTextContent(mockProductData.length.toString());
    });
  });
});
