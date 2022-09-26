import { BestbuyState } from 'component/slice/bestbuy/bestbuySlice.interface';
import bestbuyReducer, { bestbuySlice } from 'component/slice/bestbuy/bestbuySlice';
import { mockProductData } from 'service/mock/data/bestbuy';

describe('src/component/slice/bestbuy/bestbuySlice', () => {
  let initialState: BestbuyState;

  describe('tests addCart action', () => {
    it('if cart is empty', () => {
      initialState = {
        loading: false,
        error: null,
        searchTerm: '',
        products: [],
        cart: [],
      };
      const action = {
        type: bestbuySlice.actions.addCart,
        payload: mockProductData[0],
      };
      const state = bestbuyReducer(initialState, action);
      expect(state.cart).toHaveLength(1);
      expect(state.cart).toStrictEqual([mockProductData[0]]);
    });
    it('if cart is not empty', () => {
      initialState = {
        loading: false,
        error: null,
        searchTerm: '',
        products: [],
        cart: mockProductData,
      };
      const action = {
        type: bestbuySlice.actions.addCart,
        payload: mockProductData[0],
      };
      const state = bestbuyReducer(initialState, action);
      expect(state.cart).toHaveLength(mockProductData.length);
      expect(state.cart[0]).toStrictEqual({
        ...mockProductData[0],
        count: mockProductData[0].count + 1,
      });
    });
  });
  describe('tests deleteCart action', () => {
    beforeEach(() => {
      initialState = {
        loading: false,
        error: null,
        searchTerm: '',
        products: [],
        cart: mockProductData,
      };
    });
    it('deleteEachCart', () => {
      const action = {
        type: bestbuySlice.actions.deleteEachCart,
        payload: mockProductData[0],
      };
      const state = bestbuyReducer(initialState, action);
      expect(state.cart).toHaveLength(mockProductData.length - 1);
      expect(state.cart).toStrictEqual([mockProductData[1]]);
    });
    it('deleteAllCart', () => {
      const action = {
        type: bestbuySlice.actions.deleteAllCart,
      };
      const state = bestbuyReducer(initialState, action);
      expect(state.cart).toHaveLength(0);
      expect(state.cart).toStrictEqual([]);
    });
  });
});
