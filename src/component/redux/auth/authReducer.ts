import { Reducer } from 'redux';
import { AUTH_ACTION } from 'service/const/action';
import { AuthState } from 'component/redux/auth/authReducer.interface';
import { AuthActionTypes } from 'component/redux/auth/authAction.interface';

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } = AUTH_ACTION;

const INITIAL_STATE: AuthState = {
  loading: false,
  error: null,
  isLoggedIn: false,
};

const authReducer: Reducer<AuthState, AuthActionTypes> = (
  state = INITIAL_STATE,
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isLoggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
