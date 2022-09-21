/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  setCartDataToAuthLocalStorage,
} from 'service/util/localStorage';
import { mockProductData } from 'service/mock/data/bestbuy';

const localStorageMock = (() => {
  let storage: any = {};
  return {
    getItem(key: string) {
      return storage[key];
    },
    setItem(key: string, value: any) {
      storage[key] = value;
    },
    clear() {
      storage = {};
    },
    removeItem(key: string) {
      delete storage[key];
    },
    getAll() {
      return storage;
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('src/service/util/localStorage', () => {
  const key = 'auth';
  const value = {
    username: 'testUsername',
    accessToken: 'testAccessToken',
    refreshToken: 'testRefreshToken',
    cart: [],
  };

  it('test setLocalStorage', () => {
    setLocalStorage(key, value);
    expect(localStorage.getItem(key)).toStrictEqual(JSON.stringify(value));
  });
  it('test getLocalStorage', () => {
    const result = getLocalStorage(key);
    expect(result).toStrictEqual(value);
  });
  it('test removeLocalStorage', () => {
    removeLocalStorage(key);
    expect(localStorage.getItem(key)).toBeUndefined();
  });
  it('test localStorage count', () => {
    const currentClear = window.localStorage.getAll();
    expect(Object.keys(currentClear).length).toStrictEqual(0);

    setLocalStorage(key, value);
    const beforeClear = window.localStorage.getAll();
    expect(Object.keys(beforeClear).length).toStrictEqual(1);

    window.localStorage.clear();
    const afterClear = window.localStorage.getAll();
    expect(Object.keys(afterClear).length).toStrictEqual(0);
  });
  it('test setCartDataToAuthLocalStorage', () => {
    setLocalStorage(key, value);

    setCartDataToAuthLocalStorage(true, mockProductData[0]);
    expect(localStorage.getItem(key)).toContain(JSON.stringify(mockProductData[0]));
    setCartDataToAuthLocalStorage(true, mockProductData[0]);
    mockProductData[0].count += 1;
    expect(localStorage.getItem(key)).toContain(JSON.stringify(mockProductData[0]));

    setCartDataToAuthLocalStorage(true, mockProductData[1]);
    expect(localStorage.getItem(key)).toContain(JSON.stringify(mockProductData[1]));
    setCartDataToAuthLocalStorage(true, mockProductData[1]);
    mockProductData[1].count += 1;
    expect(localStorage.getItem(key)).toContain(JSON.stringify(mockProductData[1]));

    removeLocalStorage(key);
  });
});
