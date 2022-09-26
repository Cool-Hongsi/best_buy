/* eslint-disable no-prototype-builtins */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginRequestPayload } from 'component/slice/auth/authSlice.interface';
import { loginApiResult } from 'service/api/auth';
import {
  removeLocalStorage,
  setExistingAuthCart,
  setLocalStorage,
} from 'service/util/localStorage';
import { LOCALSTORAGE } from 'service/const/general';
import { ROUTE } from 'service/const/route';
import { LoginModel } from 'service/type/model/auth';
import { NavigateFunction } from 'react-router-dom';

const { AUTH } = LOCALSTORAGE;
const { HOME } = ROUTE;

// createAsyncThunk가 사용되면, slice에서 extraReducers를 사용해야 한다.
export const loginRequest = createAsyncThunk(
  'auth/loginRequest', // auth => slice name, loginRequest => action name
  async ({ email, password, navigate }: LoginRequestPayload): Promise<LoginModel | Error> => {
    const response: LoginModel | Error = await loginApiResult({ email, password });
    if (response.hasOwnProperty('accessToken')) {
      setLocalStorage(AUTH, response as LoginModel);
      navigate(HOME);
      return response as LoginModel; // fulfilled
    }
    throw response; // rejected
  },
);

export const logout = createAsyncThunk('auth/logout', async (navigate: NavigateFunction) => {
  setExistingAuthCart();
  removeLocalStorage(AUTH);
  navigate(HOME);
});
