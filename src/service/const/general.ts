type LocalStorageType = {
  AUTH: string;
  ANONYMOUS: string;
  EXISTINGAUTHCART: string;
};

export const LOCALSTORAGE: LocalStorageType = {
  AUTH: 'auth',
  ANONYMOUS: 'anonymous',
  EXISTINGAUTHCART: 'existingAuthCart',
};

type LoginType = {
  EMAIL: string;
  PASSWORD: string;
};

export const LOGIN: LoginType = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

type SearchType = {
  SEARCH_TERM: string;
};

export const SEARCH: SearchType = {
  SEARCH_TERM: 'searchTerm',
};

type MeasurementType = {
  SIZE: string;
  COLOR: string;
  WEIGHT: string;
};

export const MEASUREMENT: MeasurementType = {
  SIZE: 'Size',
  COLOR: 'Color',
  WEIGHT: 'Weight',
};

type CartType = {
  DELETE_ALL: string;
  DELETE_EACH: string;
};

export const CART: CartType = {
  DELETE_ALL: 'DELETE_ALL',
  DELETE_EACH: 'DELETE_EACH',
};
