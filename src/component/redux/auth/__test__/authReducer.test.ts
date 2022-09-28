// For Redux
import { createStore } from 'service/store';
import { Store } from '@reduxjs/toolkit';
import { AuthState } from 'component/redux/auth/authReducer.interface';
import { LoginRequestPayload } from 'component/redux/auth/authAction.interface';
import { loginRequest, loginSuccess, loginFailure, logout } from 'component/redux/auth/authAction';
import { ROUTE } from 'service/const/route';

const { HOME } = ROUTE;

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

// 실제 function 안부르게 하기 위해 mock 선언
jest.mock('service/util/localStorage', () => ({
  setExistingAuthCart: jest.fn(),
  removeLocalStorage: jest.fn(),
}));

describe('src/component/redux/auth/authReducer', () => {
  const store: Store = createStore();
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      loading: false,
      error: null,
      isLoggedIn: false,
    };
  });

  it('tests loginRequest action', () => {
    const loginRequestPayload: LoginRequestPayload = {
      email: 'fake1@fake1.com',
      password: '12341234',
      navigate: mockUseNavigate,
    };
    store.dispatch(loginRequest(loginRequestPayload));
    expect(store.getState().authReducer).toEqual({ ...initialState, loading: true });
  });
  it('tests loginSuccess action', () => {
    store.dispatch(loginSuccess());
    expect(store.getState().authReducer).toEqual({ ...initialState, isLoggedIn: true });
  });
  it('tests loginFailure action', () => {
    const errorPayload = new Error('Failed to call loginRequest');
    store.dispatch(loginFailure(errorPayload));
    expect(store.getState().authReducer).toEqual({
      ...initialState,
      error: errorPayload,
    });
  });
  it('tests logout action', () => {
    store.dispatch(logout(mockUseNavigate));
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith(HOME);
    expect(store.getState().authReducer).toEqual({ ...initialState });
  });
});

// For Slice
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react';

// it('', () => {
//   expect('').toEqual('');
// });
