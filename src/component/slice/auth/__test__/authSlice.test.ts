import { AuthState } from 'component/slice/auth/authSlice.interface';
import authReducer, { authSlice } from 'component/slice/auth/authSlice';

describe('src/component/slice/auth/authSlice', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      loading: false,
      error: null,
      isLoggedIn: false,
    };
  });

  it('tests loginSuccess action', () => {
    const action = {
      type: authSlice.actions.loginSuccess,
    };
    const state = authReducer(initialState, action);
    expect(state.isLoggedIn).toBe(true);
  });
});
