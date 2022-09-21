/* eslint-disable no-case-declarations */
import produce from 'immer';
import { Reducer } from 'redux';
import { BESTBUY_ACTION } from 'service/const/action';
import { BestbuyState } from 'component/redux/bestbuy/bestbuyReducer.interface';
import { BestbuyActionTypes } from 'component/redux/bestbuy/bestbuyAction.interface';
import { ProductModel } from 'service/type/model/bestbuy';

const {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SET_DEFAULT_CART_SUCCESS,
  SET_DEFAULT_CART_FAILURE,
  ADD_CART,
} = BESTBUY_ACTION;

const INITIAL_STATE: BestbuyState = {
  loading: false,
  error: null,
  searchTerm: '',
  products: null,
  cart: [],
};

const bestbuyReducer: Reducer<BestbuyState, BestbuyActionTypes> = (
  state = INITIAL_STATE,
  action: BestbuyActionTypes,
): BestbuyState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SEARCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.searchTerm = action.payload.searchTerm;
        draft.products = [];
        break;
      case SEARCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.products = action.payload;
        break;
      case SEARCH_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        draft.products = [];
        break;
      case SET_DEFAULT_CART_SUCCESS:
        draft.error = null;
        draft.cart = action.payload;
        break;
      case SET_DEFAULT_CART_FAILURE:
        draft.error = action.payload;
        draft.cart = [];
        break;
      case ADD_CART:
        const index = draft.cart.findIndex((cart: ProductModel) => cart.sku === action.payload.sku);
        if (index > -1) {
          draft.cart[index].count += action.payload.count;
        } else {
          draft.cart.push(action.payload);
        }
        break;
      default:
        return state;
    }
  });
};

export default bestbuyReducer;
