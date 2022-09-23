import { BESTBUY_ACTION } from 'service/const/action';
import {
  SearchRequest,
  SearchSuccess,
  SearchFailure,
  SearchRequestPayload,
  SetDefaultCartRequest,
  SetDefaultCartSuccess,
  SetDefaultCartFailure,
  AddCart,
  DeleteEachCart,
  DeleteAllCart,
} from 'component/redux/bestbuy/bestbuyAction.interface';
import { ProductModel } from 'service/type/model/bestbuy';

const {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  SET_DEFAULT_CART_REQUEST,
  SET_DEFAULT_CART_SUCCESS,
  SET_DEFAULT_CART_FAILURE,
  ADD_CART,
  DELETE_EACH_CART,
  DELETE_ALL_CART,
} = BESTBUY_ACTION;

export const searchRequest = (searchData: SearchRequestPayload): SearchRequest => ({
  type: SEARCH_REQUEST,
  payload: searchData,
});

export const searchSuccess = (dataFromServer: ProductModel[]): SearchSuccess => ({
  type: SEARCH_SUCCESS,
  payload: dataFromServer,
});

export const searchFailure = (dataFromServer: Error): SearchFailure => ({
  type: SEARCH_FAILURE,
  payload: dataFromServer,
});

export const setDefaultCartRequest = (): SetDefaultCartRequest => ({
  type: SET_DEFAULT_CART_REQUEST,
});

export const setDefaultCartSuccess = (defaultCart: ProductModel[]): SetDefaultCartSuccess => ({
  type: SET_DEFAULT_CART_SUCCESS,
  payload: defaultCart,
});

export const setDefaultCartFailure = (error: Error): SetDefaultCartFailure => ({
  type: SET_DEFAULT_CART_FAILURE,
  payload: error,
});

export const addCart = (product: ProductModel): AddCart => ({
  type: ADD_CART,
  payload: product,
});

export const deleteEachCart = (product: ProductModel): DeleteEachCart => ({
  type: DELETE_EACH_CART,
  payload: product,
});

export const deleteAllCart = (): DeleteAllCart => ({
  type: DELETE_ALL_CART,
});
