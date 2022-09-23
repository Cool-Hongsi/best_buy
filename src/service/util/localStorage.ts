/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProductModel } from 'service/type/model/bestbuy';
import { LoginModel } from 'service/type/model/auth';
import { LOCALSTORAGE } from 'service/const/general';

const { AUTH, ANONYMOUS, EXISTINGAUTHCART } = LOCALSTORAGE;

export const getLocalStorage = (key: string): any => {
  const data: string | null = localStorage.getItem(key);
  return data ? JSON.parse(data as string) : null;
};

export const setLocalStorage = (key: string, value: any) => {
  const data: string | null = JSON.stringify(value);
  localStorage.setItem(key, data);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

/**
 ** Called when logout and add cart and delete cart
 ** Cart 정보까지 삭제되면 안되기 때문에, 별도로 저장필요
 ** 실제로는 API로 Cart Data 관리?
 */
export const setExistingAuthCart = () => {
  const currentAuthLocalStorage: Partial<LoginModel> = getLocalStorage(AUTH);
  const existingAuthCart: Partial<LoginModel>[] = getLocalStorage(EXISTINGAUTHCART);
  if (existingAuthCart) {
    const index: number = existingAuthCart.findIndex(
      (existing: Partial<LoginModel>) => existing.username === currentAuthLocalStorage.username,
    );
    if (index > -1) {
      existingAuthCart[index] = {
        ...existingAuthCart[index],
        cart: currentAuthLocalStorage.cart,
      };
    } else {
      existingAuthCart.push({
        username: currentAuthLocalStorage.username,
        cart: currentAuthLocalStorage.cart,
      });
    }
    setLocalStorage(EXISTINGAUTHCART, existingAuthCart);
  } else {
    setLocalStorage(EXISTINGAUTHCART, [
      {
        username: currentAuthLocalStorage.username,
        cart: currentAuthLocalStorage.cart,
      },
    ]);
  }
};

/**
 ** Called setDefaultCartRequestFunc in bestbuySaga
 ** 별도로 저장된 existingAuthCart 정보를 Login한 auth local storage cart에 넣고 return
 */
export const getExistingAuthCart = () => {
  const currentAuthLocalStorage: Partial<LoginModel> = getLocalStorage(AUTH);
  const existingAuthCart: Partial<LoginModel>[] = getLocalStorage(EXISTINGAUTHCART);

  if (existingAuthCart) {
    const index: number = existingAuthCart.findIndex(
      (existing: Partial<LoginModel>) => existing.username === currentAuthLocalStorage.username,
    );
    if (index > -1) {
      currentAuthLocalStorage.cart = existingAuthCart[index].cart;
      setLocalStorage(AUTH, currentAuthLocalStorage);
      return existingAuthCart[index].cart;
    }
  }
  return [];
};

const getCurrentAuthLocalStorage = (isLoggedIn: boolean): LoginModel => {
  if (isLoggedIn) {
    return getLocalStorage(AUTH);
  } else {
    if (!getLocalStorage(ANONYMOUS)) {
      // Only executed once
      setLocalStorage(ANONYMOUS, {
        username: ANONYMOUS,
        accessToken: '',
        refreshToken: '',
        cart: [],
      });
    }
    return getLocalStorage(ANONYMOUS);
  }
};

export const setCartDataToAuthLocalStorage = (isLoggedIn: boolean, product: ProductModel) => {
  const currentAuthLocalStorage: LoginModel = getCurrentAuthLocalStorage(isLoggedIn);
  const repeatedProductIndex = currentAuthLocalStorage.cart.findIndex(
    (cartProduct: ProductModel) => cartProduct.sku === product.sku,
  );
  if (repeatedProductIndex > -1) {
    currentAuthLocalStorage.cart[repeatedProductIndex].count += product.count;
  } else {
    currentAuthLocalStorage.cart.push(product);
  }
  setLocalStorage(isLoggedIn ? AUTH : ANONYMOUS, currentAuthLocalStorage);
};

export const deleteCartDataFromAuthLocalStorage = (isLoggedIn: boolean, product: ProductModel) => {
  const currentAuthLocalStorage: LoginModel = getCurrentAuthLocalStorage(isLoggedIn);
  const deleteCartIndex = currentAuthLocalStorage.cart.findIndex(
    (cartProduct: ProductModel) => cartProduct.sku === product.sku,
  );
  if (deleteCartIndex > -1) {
    currentAuthLocalStorage.cart.splice(deleteCartIndex, 1);
  }
  setLocalStorage(isLoggedIn ? AUTH : ANONYMOUS, currentAuthLocalStorage);
};

export const deleteAllCartDataFromAuthLocalStorage = (isLoggedIn: boolean) => {
  const currentAuthLocalStorage: LoginModel = getCurrentAuthLocalStorage(isLoggedIn);
  currentAuthLocalStorage.cart = [];
  setLocalStorage(isLoggedIn ? AUTH : ANONYMOUS, currentAuthLocalStorage);
};
