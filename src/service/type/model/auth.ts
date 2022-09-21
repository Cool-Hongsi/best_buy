// Project에서 진짜 필요한 데이터로 Model Base Parsing
// Response에서는 API 받은 그대로..

import { LoginResponse } from 'service/type/response/auth';
import { ProductModel } from 'service/type/model/bestbuy';

export interface LoginModel {
  username: string;
  accessToken: string;
  refreshToken: string;
  cart: ProductModel[];
}

export const parsingLoginResponseToLoginModel = (loginResponse: LoginResponse): LoginModel => {
  return {
    username: loginResponse.username ?? '',
    accessToken: loginResponse.accessToken ?? '',
    refreshToken: loginResponse.refreshToken ?? '',
    cart: [],
  };
};
