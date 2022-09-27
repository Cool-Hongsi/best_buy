import { loginRequestFunc } from 'component/redux/auth/authSaga';
import authReducer from 'component/redux/auth/authReducer';
import { AuthState } from 'component/redux/auth/authReducer.interface';
import { LoginRequest, LoginRequestPayload } from 'component/redux/auth/authAction.interface';
import { mockLoginData } from 'service/mock/data/auth';
import { AUTH_ACTION } from 'service/const/action';
import { ROUTE } from 'service/const/route';

const { LOGIN_REQUEST } = AUTH_ACTION;
const { HOME } = ROUTE;

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

// 실제 function 안부르게 하기 위해 mock 선언
jest.mock('service/util/localStorage', () => ({
  setLocalStorage: jest.fn(),
}));

describe('src/component/redux/auth/authSaga', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      loading: false,
      error: null,
      isLoggedIn: false,
    };
  });

  test('tests loginRequestFunc (success)', () => {
    const loginRequestPayload: LoginRequestPayload = {
      email: 'fake1@fake1.com',
      password: '12341234',
      navigate: mockUseNavigate,
    };
    const action: LoginRequest = {
      type: LOGIN_REQUEST,
      payload: loginRequestPayload,
    };

    const generator: Generator = loginRequestFunc(action);
    generator.next(); // Face first yield (call)
    generator.next(mockLoginData); // Set the result of first yield (call) as mockLoginData and Face second yield (setLocalStorage - mock)
    generator.next(); // Face third yield (navigate)
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith(HOME);
    const result = generator.next().value.payload.action; // Face fourth yield (put(loginSuccess()))
    // console.log(result); // { type: 'LOGIN_SUCCESS' }
    const newState = authReducer(initialState, result);
    expect(newState).toStrictEqual({ ...initialState, isLoggedIn: true });
    expect(generator.next().done).toBeTruthy(); // No more yield
  });

  test('tests loginRequestFunc (failure)', () => {
    const loginRequestPayload: LoginRequestPayload = {
      email: 'fake1@fake1.com',
      password: '12341234',
      navigate: mockUseNavigate,
    };
    const action: LoginRequest = {
      type: LOGIN_REQUEST,
      payload: loginRequestPayload,
    };

    const generator: Generator = loginRequestFunc(action);
    generator.next(); // Face first yield (call)
    const error = new Error('Error while processing loginRequest');
    const result = generator.next(error).value.payload.action; // Set the result of first yield (call) as error and Face second yield (put(loginFailure(result as Error)))
    // console.log(result); // { type: 'LOGIN_FAILURE', payload: Error: Error while processing loginRequest }
    const newState = authReducer(initialState, result);
    expect(newState).toStrictEqual({ ...initialState, error: error });
    expect(generator.next().done).toBeTruthy(); // No more yield
  });
});
