import { LoginRequestPayload } from 'component/redux/auth/authAction.interface';
import { LoginModel, parsingLoginResponseToLoginModel } from 'service/type/model/auth';
import { LoginResponse } from 'service/type/response/auth';

export const loginApiResult = ({
  email,
  password,
}: LoginRequestPayload): Promise<LoginModel | Error> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let response: LoginResponse;

      if (email === 'fake1@fake1.com' && password === '12341234') {
        response = {
          statusCode: 200,
          email: email,
          username: 'faker1',
          accessToken: 'fake1_accessToken',
          refreshToken: 'fake1_refreshToken',
        };
        const parsedResponse: LoginModel = parsingLoginResponseToLoginModel(response);
        resolve(parsedResponse);
      } else if (email === 'fake2@fake2.com' && password === '12341234') {
        response = {
          statusCode: 200,
          email: email,
          username: 'faker2',
          accessToken: 'fake2_accessToken',
          refreshToken: 'fak2_refreshToken',
        };
        const parsedResponse: LoginModel = parsingLoginResponseToLoginModel(response);
        resolve(parsedResponse);
      } else {
        resolve(new Error('Login Error'));
      }
    }, 1000);
  });
};
