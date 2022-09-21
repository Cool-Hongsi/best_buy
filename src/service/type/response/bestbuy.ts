import { ProductModel } from 'service/type/model/bestbuy';

export interface SearchResponse {
  canonicalUrl: string;
  currentPage: number;
  from: number;
  partial: boolean;
  products: ProductModel[];
  queryTime: string;
  to: number;
  total: number;
  totalPages: number;
  totalTime: string;
}
