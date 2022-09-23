import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mockProductData } from 'service/mock/data/bestbuy';
import { calculateSubTotal, calculateTax } from 'service/util/calculate';
import CartPrice from 'component/page/body/cart/CartPrice';

const renderComponent = (store: Store) =>
  render(
    <Router>
      <Provider store={store}>
        <CartPrice />
      </Provider>
    </Router>,
  );

describe('src/component/page/body/cart/CartPrice', () => {
  let store: Store;

  beforeEach(() => {
    store = createMockStore({
      bestbuyReducer: {
        cart: mockProductData,
        searchTerm: '',
        products: [],
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders CartPrice component', () => {
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('cartPrice-component')).toBeInTheDocument();
  });
  it('tests sub total', () => {
    const { getByTestId } = renderComponent(store);
    const subTotalResult = calculateSubTotal(mockProductData);
    expect(getByTestId('subTotalTestId')).toHaveTextContent(`$${subTotalResult}`);
  });
  it('tests tax', () => {
    const { getByTestId } = renderComponent(store);
    const subTotalResult = calculateSubTotal(mockProductData);
    const taxResult = calculateTax(subTotalResult);
    expect(getByTestId('taxTestId')).toHaveTextContent(`$${taxResult}`);
  });
  it('tests total', () => {
    const { getByTestId } = renderComponent(store);
    const subTotalResult = calculateSubTotal(mockProductData);
    const taxResult = calculateTax(subTotalResult);
    const totalResult = subTotalResult + taxResult;
    expect(getByTestId('totalTestId')).toHaveTextContent(`$${totalResult}`);
  });
  it('tests checkout button', () => {
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('goToCheckoutButtonTestId')).toBeInTheDocument();
  });
});
