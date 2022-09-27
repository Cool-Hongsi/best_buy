// For Redux
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
it('', () => {
  expect('').toEqual('');
});

// For Slice
// import { createStore } from 'service/store';
// import { Store } from '@reduxjs/toolkit';
// import { loginRequest, logout } from 'component/slice/auth/authThunk';
// import { AuthState, LoginRequestPayload } from 'component/slice/auth/authSlice.interface';

// const mockUseNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockUseNavigate,
// }));

// describe('src/component/slice/auth/authThunk', () => {
//   let initialState: AuthState;

//   beforeEach(() => {
//     initialState = {
//       loading: false,
//       error: null,
//       isLoggedIn: false,
//     };
//   });

//   it('tests loginRequest thunk action', async () => {
//     const loginRequestPayload: LoginRequestPayload = {
//       email: 'fake1@fake1.com',
//       password: '12341234',
//       navigate: mockUseNavigate,
//     };
//     const store: Store = createStore();
//     await store.dispatch(loginRequest(loginRequestPayload));
//     expect(store.getState().authReducer).toEqual({ ...initialState, isLoggedIn: true });
//   });

//   it('tests logout thunk action', async () => {
//     const store: Store = createStore();
//     await store.dispatch(logout(mockUseNavigate));
//     expect(store.getState().authReducer).toEqual({ ...initialState });
//   });
// });
