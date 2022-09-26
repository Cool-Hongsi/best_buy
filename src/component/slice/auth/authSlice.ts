import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'component/slice/auth/authSlice.interface';
import { loginRequest, logout } from 'component/slice/auth/authThunk';

const initialState: AuthState = {
  loading: false,
  error: null,
  isLoggedIn: false,
};

// <AuthState, any, string>
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isLoggedIn = false;
      })
      .addCase(loginRequest.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
    });
  },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
