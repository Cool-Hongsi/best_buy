import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mockProductData } from 'service/mock/data/bestbuy';
import CartContainer from 'component/page/body/cart';

const renderComponent = (store: Store) =>
  render(
    <Router>
      <Provider store={store}>
        <CartContainer />
      </Provider>
    </Router>,
  );

describe('src/component/page/body/cart', () => {
  let store: Store;

  beforeEach(() => {
    store = createMockStore({
      authReducer: {
        isLoggedIn: false,
      },
      bestbuyReducer: {
        cart: mockProductData,
        searchTerm: '',
        products: [],
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders CartContainer component', () => {
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('cartContainer-component')).toBeInTheDocument();
  });
});
