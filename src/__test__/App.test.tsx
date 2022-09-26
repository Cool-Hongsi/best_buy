/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// For Redux
import { loginSuccess } from 'component/redux/auth/authAction';
// For Slice
// import { loginSuccess } from 'component/slice/auth/authSlice';
// For Redux
import { setDefaultCartRequest } from 'component/redux/bestbuy/bestbuyAction';
// For Slice
// import { setDefaultCartRequest } from 'component/slice/bestbuy/bestbuyThunk';
import { setLocalStorage, removeLocalStorage } from 'service/util/localStorage';
import { LOCALSTORAGE } from 'service/const/general';
import App from 'App';

const { AUTH } = LOCALSTORAGE;

// For Redux
jest.mock('component/redux/auth/authAction', () => ({
  loginSuccess: jest.fn(),
}));
jest.mock('component/redux/bestbuy/bestbuyAction', () => ({
  setDefaultCartRequest: jest.fn(),
}));
// For Slice
// jest.mock('component/slice/auth/authSlice', () => ({
//   loginSuccess: jest.fn(),
// }));
// jest.mock('component/slice/bestbuy/bestbuyThunk', () => ({
//   setDefaultCartRequest: jest.fn(),
// }));

const localStorageMock = (() => {
  let storage: any = {};
  return {
    getItem(key: string) {
      return storage[key];
    },
    setItem(key: string, value: any) {
      storage[key] = value;
    },
    clear() {
      storage = {};
    },
    removeItem(key: string) {
      delete storage[key];
    },
    getAll() {
      return storage;
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const renderComponent = async (store: Store): Promise<RenderResult> => {
  let renderResult: RenderResult;
  await act(async () => {
    renderResult = render(
      <Router>
        {/* Provider는 해당 Component 또는 자식 Component에서 useSelector / useDispatch를 사용했으면 Wrap 해줘야 한다. */}
        <Provider store={store}>
          <App />
        </Provider>
      </Router>,
    );
  });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return renderResult!;
};

describe('src/App', () => {
  let store: Store;

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

  it('renders App component', async () => {
    const { getByTestId } = await renderComponent(store); // await render for Suspense Loading in Lazy Load
    expect(getByTestId('app-component')).toBeInTheDocument();
  });
  it('contains Header / BodyContainer / Footer components', async () => {
    const { getByTestId } = await renderComponent(store);
    expect(getByTestId('header-component')).toBeInTheDocument();
    expect(getByTestId('footer-component')).toBeInTheDocument();
    expect(getByTestId('bodyContainer-component')).toBeInTheDocument();
  });
  it('test NOT call dispatch (loginSuccess) / call dispatch (setDefaultCartRequest)', async () => {
    const key = 'test';
    setLocalStorage(key, {});
    await renderComponent(store);
    expect(loginSuccess).not.toHaveBeenCalled();
    expect(setDefaultCartRequest).toHaveBeenCalled();
    removeLocalStorage(key);
  });
  it('test call dispatch (loginSuccess) / call dispatch (setDefaultCartRequest)', async () => {
    const key = AUTH;
    setLocalStorage(key, {});
    await renderComponent(store);
    expect(loginSuccess).toHaveBeenCalled();
    expect(setDefaultCartRequest).toHaveBeenCalled();
    removeLocalStorage(key);
  });
});
