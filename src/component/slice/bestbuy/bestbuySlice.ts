import { createSlice } from '@reduxjs/toolkit';
import { BestbuyState } from 'component/slice/bestbuy/bestbuySlice.interface';
import { ProductModel } from 'service/type/model/bestbuy';
import { searchRequest, setDefaultCartRequest } from 'component/slice/bestbuy/bestbuyThunk';

const initialState: BestbuyState = {
  loading: false,
  error: null,
  searchTerm: '',
  products: [],
  cart: [],
};

export const bestbuySlice = createSlice({
  name: 'bestbuy',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const addCartIndex = state.cart.findIndex(
        (cart: ProductModel) => cart.sku === action.payload.sku,
      );
      if (addCartIndex > -1) {
        state.cart[addCartIndex].count += action.payload.count;
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteEachCart: (state, action) => {
      const deleteEachCartIndex = state.cart.findIndex(
        (cart: ProductModel) => cart.sku === action.payload.sku,
      );
      if (deleteEachCartIndex > -1) {
        state.cart.splice(deleteEachCartIndex, 1);
      }
    },
    deleteAllCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRequest.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.searchTerm = action.meta.arg.searchTerm;
        state.products = [];
      })
      .addCase(searchRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.products = [];
      })
      .addCase(searchRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload as ProductModel[];
      });
    builder
      .addCase(setDefaultCartRequest.rejected, (state, action) => {
        state.error = action.payload as Error;
        state.cart = [];
      })
      .addCase(setDefaultCartRequest.fulfilled, (state, action) => {
        state.error = null;
        state.cart = action.payload as ProductModel[];
      });
  },
});

export const { addCart, deleteEachCart, deleteAllCart } = bestbuySlice.actions;
// export const selectBestbuy = (state: RootState) => state.bestbuyReducer;

export default bestbuySlice.reducer;

/*
  reducers에서 action = {
    payload: xxx (dispatch 할때 parameter),
    type: xxx
  }
*/

/*
  extraReducers에서 action
  pending action = {
    payload: undefined,
    type: xxx/pending,
    meta: {
      arg: {
        ...createAsyncThunk에서 넣은 parameter
      },
      // ...
    }
  }

  rejected action = {
    payload: undefined,
    type: xxx/rejected,
    meta: {
      arg: {
        ...createAsyncThunk에서 넣은 parameter
      },
      // ...
    },
    error: {
      code: xxx,
      message: xxx,
      name: xxx
    }
  }

  fulfilled action = {
    payload: result data,
    type: xxx/fulfilled,
    meta: {
      arg: {
        ...createAsyncThunk에서 넣은 parameter
      },
      // ...
    },
  }
*/
