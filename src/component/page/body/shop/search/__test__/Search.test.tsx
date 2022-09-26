import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
// For Redux
import { searchRequest } from 'component/redux/bestbuy/bestbuyAction';
// For Slice
// import { searchRequest } from 'component/slice/bestbuy/bestbuyThunk';
import { searchResult } from 'service/api/bestbuy';
import { mockProductData } from 'service/mock/data/bestbuy';
// For Redux
import { SearchRequestPayload } from 'component/redux/bestbuy/bestbuyAction.interface';
// For Slice
// import { SearchRequestPayload } from 'component/slice/bestbuy/bestbuySlice.interface';
import Search from 'component/page/body/shop/search/Search';

// mock은 경로 또는 package (axios.. urql..)
// 내부에서 function 또는 안에 있는 기능 적기 + 정의하기
// testing code에서 실제 function 또는 기능 부르면 (import 필요), 하기 mock에서 정의한 것이 실행 된다. (실제 코드 실행 x)

// For Redux
jest.mock('component/redux/bestbuy/bestbuyAction', () => ({
  searchRequest: jest.fn(),
}));

// For Slice
// jest.mock('component/slice/bestbuy/bestbuyThunk', () => ({
//   searchRequest: jest.fn(),
// }));

jest.mock('axios', () => ({
  get: (url: string) => {
    if (url.includes('/products(search=')) {
      return Promise.resolve({ data: { products: mockProductData } }); // 실제 API 부르지 않고 MockData로 대체
    }
    return Promise.reject(new Error('Error occured'));
  },
}));

const renderComponent = (store: Store) =>
  render(
    <Router>
      <Provider store={store}>
        <Search />
      </Provider>
    </Router>,
  );

describe('src/component/page/body/shop/search/Search', () => {
  let store: Store;

  it('renders Search component', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: null,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('search-component')).toBeInTheDocument();
  });
  it('test input error cases', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: null,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId, queryByTestId } = renderComponent(store);
    const searchTermInput = getByTestId('searchTermInputTestId');
    const searchSubmitButton = getByTestId('searchSubmitButtonTestId');

    fireEvent.click(searchSubmitButton);
    expect(queryByTestId('search-input-validation-error')).toBeInTheDocument();

    fireEvent.change(searchTermInput, {
      target: {
        value: 'oven',
      },
    });
    fireEvent.click(searchSubmitButton);
    expect(queryByTestId('search-input-validation-error')).not.toBeInTheDocument();
  });
  it('render NOT loading spinner component', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: null,
        loading: false,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { queryByTestId } = renderComponent(store);
    expect(queryByTestId('loadingSpinner-component')).not.toBeInTheDocument();
  });
  it('render loading spinner component', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: null,
        loading: true,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { queryByTestId } = renderComponent(store);
    expect(queryByTestId('loadingSpinner-component')).toBeInTheDocument();
  });
  it('render NOT error tag', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: null,
        error: null,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { queryByTestId } = renderComponent(store);
    expect(queryByTestId('search-process-error')).not.toBeInTheDocument();
  });
  it('render error tag', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: null,
        error: new Error('Test Error'),
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { queryByTestId } = renderComponent(store);
    expect(queryByTestId('search-process-error')).toBeInTheDocument();
    expect(queryByTestId('search-process-error')).toHaveTextContent('Test Error');
  });
  it('test call dispatch (searchRequest)', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: null,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    const searchTermInput = getByTestId('searchTermInputTestId');
    const searchSubmitButton = getByTestId('searchSubmitButtonTestId');

    fireEvent.change(searchTermInput, {
      target: {
        value: 'oven',
      },
    });

    fireEvent.click(searchSubmitButton);
    expect(searchRequest).toHaveBeenCalled();
    expect(searchRequest).toHaveBeenCalledWith({
      searchTerm: 'oven',
    });
  });
  it('test searchResult api', async () => {
    const value: SearchRequestPayload = {
      searchTerm: 'oven',
    };
    const result = await searchResult(value);
    expect(result).toStrictEqual(mockProductData);
  });
});
