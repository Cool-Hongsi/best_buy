/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeLatest, put, call } from 'redux-saga/effects';
import { BESTBUY_ACTION } from 'service/const/action';
import { SearchRequest } from 'component/redux/bestbuy/bestbuyAction.interface';
import { searchResult } from 'service/api/bestbuy';
import { ProductModel } from 'service/type/model/bestbuy';
import {
  searchSuccess,
  searchFailure,
  setDefaultCartSuccess,
  setDefaultCartFailure,
} from 'component/redux/bestbuy/bestbuyAction';
import { getExistingAuthCart, getLocalStorage } from 'service/util/localStorage';

const { SEARCH_REQUEST, SET_DEFAULT_CART_REQUEST } = BESTBUY_ACTION;

export function* searchRequestFunc(action: SearchRequest): any {
  try {
    const result: ProductModel[] | Error = yield call(searchResult, action.payload);
    // eslint-disable-next-line no-prototype-builtins
    if (!result.hasOwnProperty('code')) {
      // StatusCode will be better
      yield put(searchSuccess(result as ProductModel[]));
    } else {
      yield put(searchFailure(result as Error));
    }
  } catch (err) {
    yield put(searchFailure(err as Error));
  }
}

export function* setDefaultCartRequestFunc(): any {
  try {
    let defaultCartData: ProductModel[];

    if (getLocalStorage('auth')) {
      defaultCartData = yield getExistingAuthCart();
    } else if (getLocalStorage('anonymous')) {
      defaultCartData = yield getLocalStorage('anonymous').cart;
    } else {
      defaultCartData = yield [];
    }
    yield put(setDefaultCartSuccess(defaultCartData));
  } catch (err) {
    yield put(setDefaultCartFailure(err as Error));
  }
}

export function* bestbuySagaWatcher() {
  yield takeLatest(SEARCH_REQUEST, searchRequestFunc);
  yield takeLatest(SET_DEFAULT_CART_REQUEST, setDefaultCartRequestFunc);
}
