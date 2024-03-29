/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeLatest, put, call } from 'redux-saga/effects';
import { AUTH_ACTION } from 'service/const/action';
import { LOCALSTORAGE } from 'service/const/general';
import { LoginRequest } from 'component/redux/auth/authAction.interface';
import { loginApiResult } from 'service/api/auth';
import { loginSuccess, loginFailure } from 'component/redux/auth/authAction';
import { LoginModel } from 'service/type/model/auth';
import { ROUTE } from 'service/const/route';
import { setLocalStorage } from 'service/util/localStorage';

const { LOGIN_REQUEST } = AUTH_ACTION;
const { AUTH } = LOCALSTORAGE;
const { HOME } = ROUTE;

export function* loginRequestFunc(action: LoginRequest): any {
  try {
    const result: LoginModel | Error = yield call(loginApiResult, action.payload);
    // eslint-disable-next-line no-prototype-builtins
    if (result.hasOwnProperty('accessToken')) {
      yield setLocalStorage(AUTH, result as LoginModel);
      yield action.payload.navigate(HOME);
      yield put(loginSuccess());
    } else {
      yield put(loginFailure(result as Error));
    }
  } catch (err) {
    yield put(loginFailure(err as Error));
  }
}

export function* authSagaWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginRequestFunc);
}
