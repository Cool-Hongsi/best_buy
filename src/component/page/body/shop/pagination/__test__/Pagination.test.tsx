import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { mockProductData } from 'service/mock/data/bestbuy';
import { searchRequest } from 'component/redux/bestbuy/bestbuyAction';
import Pagination from 'component/page/body/shop/pagination/Pagination';

jest.mock('component/redux/bestbuy/bestbuyAction', () => ({
  searchRequest: jest.fn(),
}));

const renderComponent = (store: Store) =>
  render(
    <Router>
      <Provider store={store}>
        <Pagination />
      </Provider>
    </Router>,
  );

describe('src/component/page/body/shop/pagination/Pagination', () => {
  let store: Store;

  it('renders NOT Pagination component (products = null)', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: null,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('pagination-component-null')).toBeInTheDocument();
  });
  it('renders NOT Pagination component (products = [])', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: [],
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('pagination-component-null')).toBeInTheDocument();
  });
  it('renders Pagination component (products = [...])', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: mockProductData,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('pagination-component')).toBeInTheDocument();
  });

  const currentPageValue = 3;
  const totalPagesValue = 5;
  const scrollToSpy = jest.fn(); // window.scrollTo(0, 0)

  beforeEach(() => {
    mockProductData[mockProductData.length - 1].currentPage = currentPageValue;
    mockProductData[mockProductData.length - 1].totalPages = totalPagesValue;
    global.scrollTo = scrollToSpy;
  });

  it('test current page', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: 'oven',
        products: mockProductData,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('currentPageTestId')).toHaveTextContent(currentPageValue.toString());
  });
  it('test clicking back button', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: 'oven',
        products: mockProductData,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    const backButton = getByTestId('backButtonTestId');
    fireEvent.click(backButton);
    expect(scrollToSpy).toHaveBeenCalled();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    expect(searchRequest).toHaveBeenCalled();
    expect(searchRequest).toHaveBeenCalledWith({
      searchTerm: 'oven',
      pagination: currentPageValue - 1,
    });
  });
  it('test clicking first page button', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: 'oven',
        products: mockProductData,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    const firstPageButton = getByTestId('firstPageButtonTestId');
    fireEvent.click(firstPageButton);
    expect(scrollToSpy).toHaveBeenCalled();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    expect(searchRequest).toHaveBeenCalled();
    expect(searchRequest).toHaveBeenCalledWith({
      searchTerm: 'oven',
      pagination: undefined,
    });
  });
  it('test clicking last page button', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: 'oven',
        products: mockProductData,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    const lastPageButton = getByTestId('lastPageButtonTestId');
    fireEvent.click(lastPageButton);
    expect(scrollToSpy).toHaveBeenCalled();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    expect(searchRequest).toHaveBeenCalled();
    expect(searchRequest).toHaveBeenCalledWith({
      searchTerm: 'oven',
      pagination: totalPagesValue,
    });
  });
  it('test clicking forward button', () => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: 'oven',
        products: mockProductData,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    const forwardButton = getByTestId('forwardButtonTestId');
    fireEvent.click(forwardButton);
    expect(scrollToSpy).toHaveBeenCalled();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    expect(searchRequest).toHaveBeenCalled();
    expect(searchRequest).toHaveBeenCalledWith({
      searchTerm: 'oven',
      pagination: currentPageValue + 1,
    });
  });
});
