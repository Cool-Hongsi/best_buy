import { AnyAction } from 'redux';
import { BESTBUY_ACTION } from 'service/const/action';
import { ProductModel } from 'service/type/model/bestbuy';

const {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SET_DEFAULT_CART_REQUEST,
  SET_DEFAULT_CART_SUCCESS,
  SET_DEFAULT_CART_FAILURE,
  ADD_CART,
} = BESTBUY_ACTION;

export type SearchRequestPayload = {
  searchTerm: string;
  pagination?: number;
};

export interface SearchRequest {
  type: typeof SEARCH_REQUEST;
  payload: SearchRequestPayload;
}
export interface SearchSuccess {
  type: typeof SEARCH_SUCCESS;
  payload: ProductModel[];
}
export interface SearchFailure {
  type: typeof SEARCH_FAILURE;
  payload: Error;
}
export interface SetDefaultCartRequest {
  type: typeof SET_DEFAULT_CART_REQUEST;
  payload?: null;
}
export interface SetDefaultCartSuccess {
  type: typeof SET_DEFAULT_CART_SUCCESS;
  payload: ProductModel[];
}
export interface SetDefaultCartFailure {
  type: typeof SET_DEFAULT_CART_FAILURE;
  payload: Error;
}
export interface AddCart {
  type: typeof ADD_CART;
  payload: ProductModel;
}

export type BestbuyActionTypes =
  | AnyAction
  | SearchRequest
  | SearchSuccess
  | SearchFailure
  | SetDefaultCartRequest
  | SetDefaultCartSuccess
  | SetDefaultCartFailure
  | AddCart;
