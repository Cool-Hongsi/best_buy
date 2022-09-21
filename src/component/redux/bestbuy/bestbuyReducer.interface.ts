import { ProductModel } from 'service/type/model/bestbuy';

export interface BestbuyState {
  loading?: boolean;
  error?: Error | null;
  searchTerm: string;
  products: ProductModel[] | null;
  cart: ProductModel[];
}
