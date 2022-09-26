/* eslint-disable no-prototype-builtins */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SearchRequestPayload } from 'component/slice/bestbuy/bestbuySlice.interface';
import { getExistingAuthCart, getLocalStorage } from 'service/util/localStorage';
import { LOCALSTORAGE } from 'service/const/general';
import { ProductModel } from 'service/type/model/bestbuy';
import { searchResult } from 'service/api/bestbuy';

const { AUTH, ANONYMOUS } = LOCALSTORAGE;

// createAsyncThunk가 사용되면, slice에서 extraReducers를 사용해야 한다.
export const searchRequest = createAsyncThunk(
  'bestbuy/searchRequest',
  async ({ searchTerm, pagination }: SearchRequestPayload): Promise<ProductModel[] | Error> => {
    const response: ProductModel[] | Error = await searchResult({ searchTerm, pagination });
    console.log(response);
    if (!response.hasOwnProperty('code')) {
      // StatusCode will be better
      return response as ProductModel[];
    }
    throw response;
  },
);

export const setDefaultCartRequest = createAsyncThunk('bestbuy/setDefaultCartRequest', async () => {
  let defaultCartData: ProductModel[];
  try {
    if (getLocalStorage(AUTH)) {
      defaultCartData = getExistingAuthCart();
    } else if (getLocalStorage(ANONYMOUS)) {
      defaultCartData = getLocalStorage(ANONYMOUS).cart;
    } else {
      defaultCartData = [];
    }
    return defaultCartData;
  } catch (err) {
    return err as Error;
  }
});
