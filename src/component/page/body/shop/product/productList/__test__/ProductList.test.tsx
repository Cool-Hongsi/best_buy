import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { mockProductData } from 'service/mock/data/bestbuy';
import { ROUTE } from 'service/const/route';
import ProductList from 'component/page/body/shop/product/productList/ProductList';

const { SHOP } = ROUTE;

const renderComponent = (store: Store) =>
  render(
    <Router>
      <Provider store={store}>
        <ProductList />
      </Provider>
    </Router>,
  );

describe('src/component/page/body/shop/product/productList/ProductList', () => {
  let store: Store;

  it('renders NOT ProductList component (products.length === 0 && !searchTerm)', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: [],
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('productList-component-null')).toBeInTheDocument();
  });

  it('renders NOT ProductList component (!loading && products.length === 0 && searchTerm)', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: 'test',
        products: [],
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('productList-component-no-result')).toBeInTheDocument();
  });

  const scrollToSpy = jest.fn(); // window.scrollTo(0, 0)

  beforeEach(() => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: mockProductData,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    global.scrollTo = scrollToSpy;
  });
  it('renders ProductList component (products = [...])', () => {
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('productList-component')).toBeInTheDocument();
  });
  it('renders each product', () => {
    const { getAllByTestId } = renderComponent(store);
    for (let i = 0; i < mockProductData.length; i++) {
      expect(getAllByTestId(mockProductData[i].sku)).toBeDefined();
    }
  });
  it('test current url when clicking each product', () => {
    const { getByTestId } = renderComponent(store);
    for (let i = 0; i < mockProductData.length; i++) {
      expect(getByTestId(mockProductData[i].sku + '_link')).toBeDefined();
      fireEvent.click(getByTestId(mockProductData[i].sku + '_link'));
      expect(scrollToSpy).toHaveBeenCalled();
      expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
      expect(window.location.pathname).toStrictEqual(`${SHOP}/${mockProductData[i].sku}`);
    }
  });
});
