import { createStore } from 'service/store';
import { Store } from '@reduxjs/toolkit';
import { BestbuyState } from 'component/redux/bestbuy/bestbuyReducer.interface';
import { SearchRequestPayload } from 'component/redux/bestbuy/bestbuyAction.interface';
import { mockProductData } from 'service/mock/data/bestbuy';
import {
  searchRequest,
  searchSuccess,
  searchFailure,
  setDefaultCartSuccess,
  setDefaultCartFailure,
  addCart,
  deleteEachCart,
  deleteAllCart,
} from 'component/redux/bestbuy/bestbuyAction';

describe('src/component/redux/bestbuy/bestbuyReducer', () => {
  const store: Store = createStore();
  let initialState: BestbuyState;

  describe('search', () => {
    beforeEach(() => {
      initialState = {
        loading: false,
        error: null,
        searchTerm: '',
        products: [],
        cart: [],
      };
    });

    it('tests searchRequest action', () => {
      const searchRequestPayload: SearchRequestPayload = {
        searchTerm: 'desk',
      };
      store.dispatch(searchRequest(searchRequestPayload));
      expect(store.getState().bestbuyReducer).toEqual({
        ...initialState,
        loading: true,
        searchTerm: 'desk',
      });
    });
    it('tests searchSuccess action', () => {
      store.dispatch(searchSuccess(mockProductData));
      expect(store.getState().bestbuyReducer).toEqual({
        ...initialState,
        products: mockProductData,
        searchTerm: 'desk',
      });
    });
    it('tests searchFailure action', () => {
      const errorPayload = new Error('Failed to call searchRequest');
      store.dispatch(searchFailure(errorPayload));
      expect(store.getState().bestbuyReducer).toEqual({
        ...initialState,
        error: errorPayload,
        searchTerm: 'desk',
      });
    });
  });

  describe('setDefaultCart', () => {
    beforeEach(() => {
      initialState = {
        loading: false,
        error: null,
        searchTerm: '',
        products: [],
        cart: [],
      };
    });
    it('tests setDefaultCartSuccess action', () => {
      store.dispatch(setDefaultCartSuccess(mockProductData));
      expect(store.getState().bestbuyReducer).toEqual({
        ...initialState,
        cart: mockProductData,
      });
    });
    it('tests setDefaultCartFailure action', () => {
      const errorPayload = new Error('Failed to call setDefaultCartRequest');
      store.dispatch(setDefaultCartFailure(errorPayload));
      expect(store.getState().bestbuyReducer).toEqual({
        ...initialState,
        error: errorPayload,
        cart: [],
      });
    });
  });
  describe('cart', () => {
    describe('addCart', () => {
      it('tests addCart action (cart is empty)', () => {
        initialState = {
          loading: false,
          error: null,
          searchTerm: '',
          products: [],
          cart: [],
        };
        store.dispatch(addCart(mockProductData[0]));
        expect(store.getState().bestbuyReducer).toEqual({
          ...initialState,
          cart: [mockProductData[0]],
        });
      });
      it('tests addCart action (cart is not empty)', () => {
        initialState = {
          loading: false,
          error: null,
          searchTerm: '',
          products: [],
          cart: mockProductData,
        };
        store.dispatch(addCart(mockProductData[0]));
        expect(store.getState().bestbuyReducer.cart[0]).toEqual({
          ...initialState.cart[0],
          count: initialState.cart[0].count + 1,
        });
      });
    });
    describe('deleteCart', () => {
      beforeEach(() => {
        store.dispatch(addCart(mockProductData[0]));
        store.dispatch(addCart(mockProductData[1]));
      });

      it('tests deleteEachCart action', () => {
        store.dispatch(deleteEachCart(mockProductData[0]));
        expect(store.getState().bestbuyReducer.cart).toHaveLength(1);
        expect(store.getState().bestbuyReducer.cart).toEqual([mockProductData[1]]);
      });
      it('tests deleteAllCart action', () => {
        store.dispatch(deleteAllCart());
        expect(store.getState().bestbuyReducer.cart).toHaveLength(0);
        expect(store.getState().bestbuyReducer.cart).toEqual([]);
      });
    });
  });
});
