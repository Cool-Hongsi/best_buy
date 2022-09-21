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
