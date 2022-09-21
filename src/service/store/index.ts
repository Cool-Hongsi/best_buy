/* For Redux with Saga */
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

export const store = configureStore({
  reducer: {
    authReducer,
    bestbuyReducer,
    // other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/* For Slice */
// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import authReducer from 'component/redux/auth/authReducer';

// export const createStore = () =>
//   configureStore({
//     reducer: {
//       authReducer,
//       // other reducers
//     },
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
