// For Redux
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
it('', () => {
  console.log('');
});

// For Slice
// import { createStore } from 'service/store';
// import { Store } from '@reduxjs/toolkit';
// import { searchRequest, setDefaultCartRequest } from 'component/slice/bestbuy/bestbuyThunk';
// import { BestbuyState, SearchRequestPayload } from 'component/slice/bestbuy/bestbuySlice.interface';
// import { mockProductData } from 'service/mock/data/bestbuy';

// jest.mock('axios', () => ({
//   get: (url: string) => {
//     if (url.includes('/products(search=')) {
//       return Promise.resolve({ data: { products: mockProductData } }); // 실제 API 부르지 않고 MockData로 대체
//     }
//     return Promise.reject(new Error('Error occured'));
//   },
// }));

// describe('src/component/slice/bestbuy/bestbuyThunk', () => {
//   let initialState: BestbuyState;

//   beforeEach(() => {
//     initialState = {
//       loading: false,
//       error: null,
//       searchTerm: '',
//       products: [],
//       cart: [],
//     };
//   });

//   it('tests searchRequest thunk action', async () => {
//     const searchRequestPayload: SearchRequestPayload = {
//       searchTerm: 'desk',
//     };
//     const store: Store = createStore();
//     await store.dispatch(searchRequest(searchRequestPayload));
//     expect(store.getState().bestbuyReducer).toEqual({
//       ...initialState,
//       searchTerm: 'desk',
//       products: mockProductData,
//     });
//   });

//   it('tests setDefaultCartRequest thunk action', async () => {
//     const store: Store = createStore();
//     await store.dispatch(setDefaultCartRequest());
//     expect(store.getState().bestbuyReducer).toEqual({ ...initialState });
//   });
// });
