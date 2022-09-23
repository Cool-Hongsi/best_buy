/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { removeLocalStorage, setLocalStorage } from 'service/util/localStorage';
import { LOCALSTORAGE } from 'service/const/general';
import Home from 'component/page/body/home/Home';

const { AUTH } = LOCALSTORAGE;

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

const renderComponent = (store: Store) =>
  render(
    <Router>
      {/* Provider는 해당 Component 또는 자식 Component에서 useSelector / useDispatch를 사용했으면 Wrap 해줘야 한다. */}
      <Provider store={store}>
        <Home />
      </Provider>
    </Router>,
  );

describe('src/component/page/body/home/Home', () => {
  let store: Store;

  it('renders Home component', () => {
    store = createMockStore({
      authReducer: {
        isLoggedIn: false,
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('home-component')).toBeInTheDocument();
  });
  it('test if not logged in', () => {
    store = createMockStore({
      authReducer: {
        isLoggedIn: false,
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('home-text')).toHaveTextContent('Home');
  });
  it('test if logged in', () => {
    const key = AUTH;
    const value = {
      username: 'testUser',
    };
    setLocalStorage(key, value);
    store = createMockStore({
      authReducer: {
        isLoggedIn: true,
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('home-text')).toHaveTextContent(`Welcome, ${value.username}`);
    removeLocalStorage(key);
  });
});
