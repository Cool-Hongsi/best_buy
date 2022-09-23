import { calculateSubTotal, calculateTax } from 'service/util/calculate';
import { mockProductData } from 'service/mock/data/bestbuy';

describe('src/service/util/calculate', () => {
  it('should return correct subTotal', () => {
    let subTotal = 0;
    for (let i = 0; i < mockProductData.length; i++) {
      if (mockProductData[i].salePrice > 0) {
        subTotal += mockProductData[i].salePrice * mockProductData[i].count;
      } else {
        subTotal += mockProductData[i].regularPrice * mockProductData[i].count;
      }
    }
    const result = calculateSubTotal(mockProductData);
    expect(result).toStrictEqual(subTotal);
  });
  it('should return correct tax', () => {
    const subTotal = calculateSubTotal(mockProductData);
    const result = calculateTax(subTotal);
    expect(result).toStrictEqual(subTotal * 0.13);
  });
});
