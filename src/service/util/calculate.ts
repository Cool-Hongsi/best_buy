import { ProductModel } from 'service/type/model/bestbuy';

export const calculateSubTotal = (cart: ProductModel[]): number => {
  let subTotal = 0;

  cart.forEach((cart: ProductModel) => {
    if (cart.salePrice > 0) {
      subTotal += cart.salePrice * cart.count;
    } else {
      subTotal += cart.regularPrice * cart.count;
    }
  });

  return subTotal;
};

export const calculateTax = (subTotal: number): number => {
  return subTotal * 0.13;
};
