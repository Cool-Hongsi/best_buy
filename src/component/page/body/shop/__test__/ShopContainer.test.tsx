/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ShopContainer from 'component/page/body/shop';

const renderComponent = async (store: Store): Promise<RenderResult> => {
  let renderResult: RenderResult;
  await act(async () => {
    renderResult = render(
      <Router>
        <Provider store={store}>
          <ShopContainer />
        </Provider>
      </Router>,
    );
  });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return renderResult!;
};

describe('src/component/page/body/shop', () => {
  let store: Store;

  beforeEach(() => {
    store = createMockStore({
      bestbuyReducer: {
        searchTerm: '',
        products: null,
        cart: [],
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders ShopContainer component', async () => {
    const { getByTestId } = await renderComponent(store); // await render for Suspense Loading in Lazy Load
    expect(getByTestId('shopContainer-component')).toBeInTheDocument();
  });
});
