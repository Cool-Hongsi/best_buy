import React from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mockProductData } from 'service/mock/data/bestbuy';
import ProductDetailContainer from 'component/page/body/shop/product/productDetail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // useParams: () => jest.fn().mockReturnValue({ id: 'abcd1234' }), // 이렇게 쓰면, Component에서 useParams value 못 받음
  useParams: () => ({ id: 'abcd1234' }), // 이렇게 쓰면, Component에서 useParams value 받음
  // useLocation: () => jest.fn().mockReturnValue({ state: mockProductData[0] }), // 이렇게 쓰면, Component에서 useLocation value 못 받음
  useLocation: () => ({ state: mockProductData[0] }), // 이렇게 쓰면, Component에서 useLocation value 받음
}));

const renderComponent = async (store: Store) => {
  let renderResult: RenderResult;
  await act(async () => {
    renderResult = render(
      <Router>
        {/* Provider는 해당 Component 또는 자식 Component에서 useSelector / useDispatch를 사용했으면 Wrap 해줘야 한다. */}
        <Provider store={store}>
          <ProductDetailContainer />
        </Provider>
      </Router>,
    );
  });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return renderResult!;
};

describe('src/component/page/body/shop/product/productDetail', () => {
  let store: Store;

  beforeEach(() => {
    store = createMockStore({
      authReducer: {
        isLoggedIn: false,
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders ProductDetailContainer component', async () => {
    const { getByTestId } = await renderComponent(store); // await render for Suspense Loading in Lazy Load
    expect(getByTestId('productDetailContainer-component')).toBeInTheDocument();
  });
});
