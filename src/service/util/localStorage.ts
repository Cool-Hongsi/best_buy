import { ProductModel } from 'service/type/model/bestbuy';
import { LoginModel } from 'service/type/model/auth';

/* eslint-disable @typescript-eslint/no-explicit-any */
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
 ** Called when logout and add cart
 ** Cart 정보까지 삭제되면 안되기 때문에, 별도로 저장필요
 ** 실제로는 API로 Cart Data 관리?
 */
export const setExistingAuthCart = () => {
  const currentAuthLocalStorage: Partial<LoginModel> = getLocalStorage('auth');
  const existingAuthCart: Partial<LoginModel>[] = getLocalStorage('existingAuthCart');
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
    setLocalStorage('existingAuthCart', existingAuthCart);
  } else {
    setLocalStorage('existingAuthCart', [
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
  const currentAuthLocalStorage: Partial<LoginModel> = getLocalStorage('auth');
  const existingAuthCart: Partial<LoginModel>[] = getLocalStorage('existingAuthCart');

  if (existingAuthCart) {
    const index: number = existingAuthCart.findIndex(
      (existing: Partial<LoginModel>) => existing.username === currentAuthLocalStorage.username,
    );
    if (index > -1) {
      currentAuthLocalStorage.cart = existingAuthCart[index].cart;
      setLocalStorage('auth', currentAuthLocalStorage);
      return existingAuthCart[index].cart;
    }
  }
  return [];
};

const getCurrentAuthLocalStorage = (isLoggedIn: boolean): LoginModel => {
  if (isLoggedIn) {
    return getLocalStorage('auth');
  } else {
    if (!getLocalStorage('anonymous')) {
      // Only executed once
      setLocalStorage('anonymous', {
        username: 'anonymous',
        accessToken: '',
        refreshToken: '',
        cart: [],
      });
    }
    return getLocalStorage('anonymous');
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
  setLocalStorage(isLoggedIn ? 'auth' : 'anonymous', currentAuthLocalStorage);
};

// modifyCartDataFromAuthLocalStorage (?)
// removeCartDataFromAuthLocalStorage
