import { AUTH_ACTION } from 'service/const/action';
import { ROUTE } from 'service/const/route';
import { LOCALSTORAGE } from 'service/const/general';
import { removeLocalStorage, setExistingAuthCart } from 'service/util/localStorage';
import { NavigateFunction } from 'react-router-dom';
import {
  LoginRequestPayload,
  LoginFailure,
  LoginRequest,
  LoginSuccess,
  Logout,
} from 'component/redux/auth/authAction.interface';

const { HOME } = ROUTE;
const { AUTH } = LOCALSTORAGE;
const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } = AUTH_ACTION;

export const loginRequest = (loginInput: LoginRequestPayload): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload: loginInput,
});

export const loginSuccess = (): LoginSuccess => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (dataFromServer: Error): LoginFailure => ({
  type: LOGIN_FAILURE,
  payload: dataFromServer,
});

export const logout = (navigate: NavigateFunction): Logout => ({
  type: LOGOUT,
  // Reducer로 가기전 Promise 먼저 실행
  payload: new Promise<void>((resolve) => {
    setExistingAuthCart();
    removeLocalStorage(AUTH);
    navigate(HOME);
    resolve();
  }),
});
