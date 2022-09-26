import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMockStore } from 'service/mock/store/createMockStore';
import { Store } from '@reduxjs/toolkit';
// For Redux
import { loginRequest } from 'component/redux/auth/authAction';
// For Slice
// import { loginRequest } from 'component/slice/auth/authThunk';
import { loginApiResult } from 'service/api/auth';
import { mockLoginData } from 'service/mock/data/auth';
// For Redux
import { LoginRequestPayload } from 'component/redux/auth/authAction.interface';
// For Slice
// import { LoginRequestPayload } from 'component/slice/auth/authSlice.interface';
import Login from 'component/page/body/login/Login';

// mock은 경로 또는 package (axios.. urql..)
// 내부에서 안에 있는 기능 또는 function 적기 + 정의하기
// testing code에서 실제 기능 또는 function부르면 (import 필요), 하기 mock에서 정의한 것이 실행 된다. (실제 코드 실행 x)

// For Redux
jest.mock('component/redux/auth/authAction', () => ({
  loginRequest: jest.fn(),
}));

// For Slice
// jest.mock('component/slice/auth/authThunk', () => ({
//   loginRequest: jest.fn(),
// }));

jest.mock('service/api/auth', () => ({
  loginApiResult: jest.fn(), // 여기서 mockResolvedValue 같은 건 작동을 안함..
}));

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

const renderComponent = (store: Store) =>
  render(
    <Router>
      {/* Provider는 해당 Component 또는 자식 Component에서 useSelector / useDispatch를 사용했으면 Wrap 해줘야 한다. */}
      <Provider store={store}>
        <Login />
      </Provider>
    </Router>,
  );

describe('src/component/page/body/login/Login', () => {
  let store: Store;

  it('renders Login component', () => {
    store = createMockStore({
      authReducer: {
        isLoggedIn: false,
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    expect(getByTestId('login-component')).toBeInTheDocument();
  });

  it('test input error cases', () => {
    store = createMockStore({
      authReducer: {
        isLoggedIn: false,
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId, queryByTestId } = renderComponent(store);
    const emailInput = getByTestId('loginEmailInputTestId');
    const passwordInput = getByTestId('loginPasswordInputTestId');
    const loginButton = getByTestId('loginSubmitButtonTestId');

    fireEvent.change(emailInput, {
      target: {
        value: 'fake1@fake1.com',
      },
    });
    fireEvent.click(loginButton);
    expect(queryByTestId('login-input-validation-error')).toBeInTheDocument();

    fireEvent.change(passwordInput, {
      target: {
        value: '12341234',
      },
    });
    fireEvent.click(loginButton);
    expect(queryByTestId('login-input-validation-error')).not.toBeInTheDocument();
  });
  it('test call dispatch (loginRequest)', () => {
    store = createMockStore({
      authReducer: {
        isLoggedIn: false,
      },
    });
    store.dispatch = jest.fn();
    const { getByTestId } = renderComponent(store);
    const emailInput = getByTestId('loginEmailInputTestId');
    const passwordInput = getByTestId('loginPasswordInputTestId');
    const loginButton = getByTestId('loginSubmitButtonTestId');

    fireEvent.change(emailInput, {
      target: {
        value: 'fake1@fake1.com',
      },
    });
    fireEvent.change(passwordInput, {
      target: {
        value: '12341234',
      },
    });

    fireEvent.click(loginButton);
    expect(loginRequest).toHaveBeenCalled();
    expect(loginRequest).toHaveBeenCalledWith({
      email: 'fake1@fake1.com',
      password: '12341234',
      navigate: mockUseNavigate,
    });
  });
  it('render NOT loading spinner component', () => {
    store = createMockStore({
      authReducer: {
        loading: false,
        isLoggedIn: false,
      },
    });
    store.dispatch = jest.fn();
    const { queryByTestId } = renderComponent(store);
    expect(queryByTestId('loadingSpinner-component')).not.toBeInTheDocument();
  });
  it('render loading spinner component', () => {
    store = createMockStore({
      authReducer: {
        loading: true,
        isLoggedIn: false,
      },
    });
    store.dispatch = jest.fn();
    const { queryByTestId } = renderComponent(store);
    expect(queryByTestId('loadingSpinner-component')).toBeInTheDocument();
  });
  it('render NOT error tag', () => {
    store = createMockStore({
      authReducer: {
        error: null,
        isLoggedIn: false,
      },
    });
    store.dispatch = jest.fn();
    const { queryByTestId } = renderComponent(store);
    expect(queryByTestId('login-process-error')).not.toBeInTheDocument();
  });
  it('render error tag', () => {
    store = createMockStore({
      authReducer: {
        error: new Error('Test Error'),
        isLoggedIn: false,
      },
    });
    store.dispatch = jest.fn();
    const { queryByTestId } = renderComponent(store);
    expect(queryByTestId('login-process-error')).toBeInTheDocument();
    expect(queryByTestId('login-process-error')).toHaveTextContent('Test Error');
  });
  it('test login api', async () => {
    (loginApiResult as jest.Mock).mockResolvedValue(mockLoginData);
    const value: LoginRequestPayload = {
      email: 'fake1@fake1.com',
      password: '12341234',
      navigate: mockUseNavigate,
    };
    const result = await loginApiResult(value);
    expect(loginApiResult).toHaveBeenCalledTimes(1);
    expect(loginApiResult).toHaveBeenCalledWith(value);
    expect(result).toStrictEqual(mockLoginData);
  });
});
