/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { mockProductData } from 'service/mock/data/bestbuy';
import { ProductDetailPropsType } from 'component/page/body/shop/product/productDetail/ProductDetail.interface';
import { dateFormat } from 'service/util/dateFormat';
import { LOCALSTORAGE } from 'service/const/general';
import { removeLocalStorage, setLocalStorage } from 'service/util/localStorage';
// For Redux
import { addCart } from 'component/redux/bestbuy/bestbuyAction';
// For Slice
// import { addCart } from 'component/slice/bestbuy/bestbuySlice';
import ProductDetailMain from 'component/page/body/shop/product/productDetail/ProductDetailMain';

// For Redux
jest.mock('component/redux/bestbuy/bestbuyAction', () => ({
  addCart: jest.fn(),
}));
// For Slice
// jest.mock('component/slice/bestbuy/bestbuySlice', () => ({
//   addCart: jest.fn(),
// }));

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

const renderComponent = (store: Store, props: ProductDetailPropsType) =>
  render(
    <Router>
      <Provider store={store}>
        <ProductDetailMain {...props} />
      </Provider>
    </Router>,
  );

describe('src/component/page/body/shop/product/productDetail/ProductDetailMain', () => {
  let store: Store;
  let props: ProductDetailPropsType;

  beforeEach(() => {
    store = createMockStore({
      authReducer: {
        isLoggedIn: true,
      },
    });
    props = {
      id: 'abcd1234',
      product: mockProductData[0],
    };
    store.dispatch = jest.fn();
  });

  it('renders ProductDetailMain component', () => {
    const { getByTestId } = renderComponent(store, props);
    expect(getByTestId('productDetailMain-component')).toBeInTheDocument();
  });
  it('tests each element', () => {
    const { getByTestId } = renderComponent(store, props);
    // image
    expect(getByTestId('product-detail-main-image')).toBeInTheDocument();
    expect(getByTestId('product-detail-main-image')).toHaveAttribute(
      'src',
      mockProductData[0].image,
    );
    // manufacturer
    expect(getByTestId('product-detail-main-manufacturer')).toBeInTheDocument();
    expect(getByTestId('product-detail-main-manufacturer')).toHaveTextContent(
      mockProductData[0].manufacturer,
    );
    // modelNumber
    expect(getByTestId('product-detail-main-modelNumber')).toBeInTheDocument();
    expect(getByTestId('product-detail-main-modelNumber')).toHaveTextContent(
      mockProductData[0].modelNumber,
    );
    // name
    expect(getByTestId('product-detail-main-name')).toBeInTheDocument();
    expect(getByTestId('product-detail-main-name')).toHaveTextContent(mockProductData[0].name);
    // regularPrice
    expect(getByTestId('product-detail-main-regularPrice')).toBeInTheDocument();
    expect(getByTestId('product-detail-main-regularPrice')).toHaveTextContent(
      mockProductData[0].regularPrice.toString(),
    );
    // salePrice
    expect(getByTestId('product-detail-main-salePrice')).toBeInTheDocument();
    expect(getByTestId('product-detail-main-salePrice')).toHaveTextContent(
      mockProductData[0].salePrice.toString(),
    );
    // quantityLimit
    expect(getByTestId('product-detail-main-quantityLimit')).toBeInTheDocument();
    expect(getByTestId('product-detail-main-quantityLimit')).toHaveTextContent(
      mockProductData[0].quantityLimit.toString(),
    );
    // itemUpdateDate
    expect(getByTestId('product-detail-main-itemUpdateDate')).toBeInTheDocument();
    expect(getByTestId('product-detail-main-itemUpdateDate')).toHaveTextContent(
      dateFormat(mockProductData[0].itemUpdateDate),
    );
    // description
    expect(getByTestId('product-detail-main-description')).toBeInTheDocument();
    expect(getByTestId('product-detail-main-description')).toHaveTextContent(
      mockProductData[0].longDescription,
    );
  });
  it('test count button', () => {
    const { getByTestId } = renderComponent(store, props);
    expect(getByTestId('product-detail-main-count')).toHaveTextContent('1');

    const decreaseButton = getByTestId('productDetailMainDecreaseButtonTestId');
    const increaseButton = getByTestId('productDetailMainIncreaseButtonTestId');
    fireEvent.click(decreaseButton);
    expect(getByTestId('product-detail-main-count')).toHaveTextContent('1'); // can not be less than 1
    fireEvent.click(increaseButton);
    expect(getByTestId('product-detail-main-count')).toHaveTextContent('2');
    fireEvent.click(increaseButton);
    expect(getByTestId('product-detail-main-count')).toHaveTextContent('2'); // can not be more than quantityLimit (2)
    fireEvent.click(decreaseButton);
    expect(getByTestId('product-detail-main-count')).toHaveTextContent('1');
  });
  it('test buy button', () => {
    const { getByTestId } = renderComponent(store, props);
    expect(getByTestId('productDetailMainBuyButtonTestId')).toBeInTheDocument();
  });
  it('test cart button', () => {
    const key = AUTH;
    setLocalStorage(key, {
      username: 'testUser',
      accessToken: 'ABCD',
      refreshToken: 'DCBA',
      cart: [],
    });
    const { getByTestId } = renderComponent(store, props);
    expect(getByTestId('productDetailMainCartButtonTestId')).toBeInTheDocument();
    const cartButton = getByTestId('productDetailMainCartButtonTestId');
    fireEvent.click(cartButton);
    expect(addCart).toHaveBeenCalled();
    expect(addCart).toHaveBeenCalledWith(mockProductData[0]);
    removeLocalStorage(key);
  });
});
