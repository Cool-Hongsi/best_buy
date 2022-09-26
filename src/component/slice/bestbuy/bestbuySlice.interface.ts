import { ProductModel } from 'service/type/model/bestbuy';

export interface BestbuyState {
  loading?: boolean;
  error?: Error | null | string;
  searchTerm: string;
  products: ProductModel[] | null;
  cart: ProductModel[];
}

export type SearchRequestPayload = {
  searchTerm: string;
  pagination?: number;
};
