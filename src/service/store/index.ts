// For Redux

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import authReducer from 'component/redux/auth/authReducer';
import bestbuyReducer from 'component/redux/bestbuy/bestbuyReducer';
import { authSagaWatcher } from 'component/redux/auth/authSaga';
import { bestbuySagaWatcher } from 'component/redux/bestbuy/bestbuySaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    authSagaWatcher(),
    bestbuySagaWatcher(),
    // other sagas
  ]);
}

export const createStore = () =>
  configureStore({
    reducer: {
      authReducer,
      bestbuyReducer,
      // other reducers
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
  });

export const store = createStore();

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// For Slice

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import authReducer from 'component/slice/auth/authSlice';
// import bestbuyReducer from 'component/slice/bestbuy/bestbuySlice';
// import * as reduxThunk from 'redux-thunk/extend-redux';
// // 상기를 import 안하면, AsyncThunkAction is not assignable to parameter of type 'AnyAction' Error

// export const createStore = () =>
//   configureStore({
//     reducer: {
//       authReducer,
//       bestbuyReducer,
//       // other reducers
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
//   });

// export const store = createStore();

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
