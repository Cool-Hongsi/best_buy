import { NavigateFunction } from 'react-router-dom';
import { AnyAction } from 'redux';
import { AUTH_ACTION } from 'service/const/action';

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } = AUTH_ACTION;

export type LoginRequestPayload = {
  email: string;
  password: string;
  navigate: NavigateFunction;
};

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: LoginRequestPayload;
}
export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload?: null;
}
export interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: Error;
}
export interface Logout {
  type: typeof LOGOUT;
  payload: Promise<void>;
}

export type AuthActionTypes = AnyAction | LoginRequest | LoginSuccess | LoginFailure | Logout;
