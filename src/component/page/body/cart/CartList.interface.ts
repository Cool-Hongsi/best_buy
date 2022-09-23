import { ProductModel } from 'service/type/model/bestbuy';

export interface CartListModalState {
  [key: string]: boolean | ProductModel | null;
}
