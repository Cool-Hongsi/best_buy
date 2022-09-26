import React, { useState } from 'react';
import Input from 'component/common/input/Input';
import Button from 'component/common/button/Button';
import useForm from 'service/hook/useForm';
import { LOGIN } from 'service/const/general';
import useSelector from 'service/hook/useAppSelector';
import { useAppDispatch } from 'service/hook/useAppDispatch';
import { inputValidation } from 'service/util/inputValidation';
// For Redux
import { loginRequest } from 'component/redux/auth/authAction';
// For Slice
// import { loginRequest } from 'component/slice/auth/authThunk';
import LoadingSpinner from 'component/common/loadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import * as Styled from 'component/page/body/login/Styled.Login';

const { EMAIL, PASSWORD } = LOGIN;

const Login = () => {
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const [formValid, setFormValid] = useState<boolean>(true);
  const [{ email, password }, onFormChange] = useForm({
    // email, password => value
    // EMAIL, PASSWORD => name
    [EMAIL]: '',
    [PASSWORD]: '',
  });

  const onClickFunc = () => {
    if (!inputValidation({ email, password })) {
      setFormValid(false);
      return;
    }
    setFormValid(true);

    dispatch(loginRequest({ email, password, navigate }));
  };

  const onKeyDownFunc = (key: string) => {
    key === 'Enter' && onClickFunc();
  };

  return (
    <Styled.Login data-testid="login-component">
      <Input
        dataTestId="loginEmailInputTestId"
        placeholder="Please input email"
        name={EMAIL}
        value={email}
        onChangeFunc={onFormChange(EMAIL)}
        onKeyDownFunc={onKeyDownFunc}
      />
      <Input
        dataTestId="loginPasswordInputTestId"
        placeholder="Please input password"
        name={PASSWORD}
        value={password}
        onChangeFunc={onFormChange(PASSWORD)}
        onKeyDownFunc={onKeyDownFunc}
      />
      <Button dataTestId="loginSubmitButtonTestId" text="Login" onClickFunc={onClickFunc} />
      {!formValid && (
        <div className="login-input-validation-error" data-testid="login-input-validation-error">
          Please check email or password
        </div>
      )}
      {loading && <LoadingSpinner dataTestId="loadingSpinner-component" />}
      {error && (
        <div className="login-process-error" data-testid="login-process-error">
          {error.toString()}
        </div>
      )}
    </Styled.Login>
  );
};

export default Login;
