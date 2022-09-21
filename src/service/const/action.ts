type AuthActionType = {
  LOGIN_REQUEST: string;
  LOGIN_SUCCESS: string;
  LOGIN_FAILURE: string;
  LOGOUT: string;
};

export const AUTH_ACTION: AuthActionType = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
};

type BestbuyActionType = {
  SEARCH_REQUEST: string;
  SEARCH_SUCCESS: string;
  SEARCH_FAILURE: string;
  SET_DEFAULT_CART_REQUEST: string;
  SET_DEFAULT_CART_SUCCESS: string;
  SET_DEFAULT_CART_FAILURE: string;
  ADD_CART: string;
};

export const BESTBUY_ACTION: BestbuyActionType = {
  SEARCH_REQUEST: 'SEARCH_REQUEST',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SEARCH_FAILURE: 'SEARCH_FAILURE',
  SET_DEFAULT_CART_REQUEST: 'SET_DEFAULT_CART_REQUEST',
  SET_DEFAULT_CART_SUCCESS: 'SET_DEFAULT_CART_SUCCESS',
  SET_DEFAULT_CART_FAILURE: 'SET_DEFAULT_CART_FAILURE',
  ADD_CART: 'ADD_CART',
};
