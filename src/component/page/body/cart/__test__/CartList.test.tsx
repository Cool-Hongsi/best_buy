import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mockProductData } from 'service/mock/data/bestbuy';
import { deleteEachCart, deleteAllCart } from 'component/redux/bestbuy/bestbuyAction';
import CartList from 'component/page/body/cart/CartList';

jest.mock('component/redux/bestbuy/bestbuyAction', () => ({
  deleteEachCart: jest.fn(),
  deleteAllCart: jest.fn(),
}));

const renderComponent = (store: Store) =>
  render(
    <Router>
      <Provider store={store}>
        <CartList />
      </Provider>
    </Router>,
  );

describe('src/component/page/body/cart/CartList', () => {
  let store: Store;

  describe('without cart data', () => {
    beforeEach(() => {
      store = createMockStore({
        authReducer: {
          isLoggedIn: false,
        },
        bestbuyReducer: {
          cart: [],
          searchTerm: '',
          products: [],
        },
      });
      store.dispatch = jest.fn();
    });

    it('renders NOT CartList component', () => {
      const { queryByTestId } = renderComponent(store);
      expect(queryByTestId('cartList-component')).not.toBeInTheDocument();
      expect(queryByTestId('cartList-component-without-cart-data')).toBeInTheDocument();
      expect(queryByTestId('cartList-component-without-cart-data')).toHaveTextContent(
        'Empty Cart!',
      );
    });
  });

  describe('with cart data', () => {
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

    it('renders CartList component', () => {
      const { getByTestId } = renderComponent(store);
      expect(getByTestId('cartList-component')).toBeInTheDocument();
    });
    it('tests each cart data', () => {
      const { getAllByTestId } = renderComponent(store); // .map에서 동일한 testid 사용시, getAllByTestId 사용
      expect(getAllByTestId('cartList-each-cell')).toHaveLength(mockProductData.length);

      for (let i = 0; i < mockProductData.length; i++) {
        // image
        expect(getAllByTestId('cartList-each-cell-image')[i]).toHaveAttribute(
          'src',
          mockProductData[i].image,
        );
        // name
        expect(getAllByTestId('cartList-each-cell-name')[i]).toHaveTextContent(
          mockProductData[i].name,
        );
        // count
        expect(getAllByTestId('cartList-each-cell-count')[i]).toHaveTextContent(
          mockProductData[i].count.toString(),
        );
        // price & total
        if (mockProductData[i].salePrice > 0) {
          expect(getAllByTestId('cartList-each-cell-price')[i]).toHaveTextContent(
            `$${mockProductData[i].salePrice}`,
          );
          expect(getAllByTestId('cartList-each-cell-totalPrice')[i]).toHaveTextContent(
            `$${mockProductData[i].salePrice * mockProductData[i].count}`,
          );
        } else {
          expect(getAllByTestId('cartList-each-cell-price')[i]).toHaveTextContent(
            `$${mockProductData[i].regularPrice}`,
          );
          expect(getAllByTestId('cartList-each-cell-totalPrice')[i]).toHaveTextContent(
            `$${mockProductData[i].regularPrice * mockProductData[i].count}`,
          );
        }
      }
    });
    it('tests clicking deleteEach button and render deleteEach modal and click yes (delete each cart)', () => {
      const { getByTestId, queryByTestId } = renderComponent(store); // .map에서 서로 다른 testid 사용시, getByTestId 사용
      // Check existence of testid
      for (let i = 0; i < mockProductData.length; i++) {
        expect(
          getByTestId(`deleteEachCartButtonTestId_${mockProductData[i].sku}`),
        ).toBeInTheDocument();
      }
      const firstDeleteEachButton = getByTestId(
        `deleteEachCartButtonTestId_${mockProductData[0].sku}`,
      );
      // not show modal
      expect(queryByTestId('deleteEachCartModalTestId')).not.toBeInTheDocument();
      fireEvent.click(firstDeleteEachButton);
      // show modal
      expect(queryByTestId('deleteEachCartModalTestId')).toBeInTheDocument();
      // check modal title
      expect(getByTestId('modal-title')).toHaveTextContent(`Delete ${mockProductData[0].name}`);
      // click yes in modal to delete
      const yesButton = getByTestId('modal-yes-button');
      fireEvent.click(yesButton);
      expect(deleteEachCart).toHaveBeenCalled();
      expect(deleteEachCart).toHaveBeenCalledWith(mockProductData[0]);
      // not show modal
      expect(queryByTestId('deleteEachCartModalTestId')).not.toBeInTheDocument();
    });
    it('tests clicking deleteAll button and render deleteAll modal and click yes (delete all cart)', () => {
      const { getByTestId, queryByTestId } = renderComponent(store);
      const deleteAllButton = getByTestId('deleteAllCartButtonTestId');
      // not show modal
      expect(queryByTestId('deleteAllCartModalTestId')).not.toBeInTheDocument();
      fireEvent.click(deleteAllButton);
      // show modal
      expect(queryByTestId('deleteAllCartModalTestId')).toBeInTheDocument();
      // check modal title
      expect(getByTestId('modal-title')).toHaveTextContent('Delete All Cart');
      // click yes in modal to delete
      const yesButton = getByTestId('modal-yes-button');
      fireEvent.click(yesButton);
      expect(deleteAllCart).toHaveBeenCalled();
      expect(deleteAllCart).toHaveBeenCalledWith();
      // not show modal
      expect(queryByTestId('deleteAllCartModalTestId')).not.toBeInTheDocument();
    });
  });
});
