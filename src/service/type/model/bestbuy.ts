// Project에서 진짜 필요한 데이터로 Model Base Parsing
// Response에서는 API 받은 그대로..

import { SearchResponse } from 'service/type/response/bestbuy';

export interface ProductModel {
  color: string;
  depth: string;
  height: string;
  image: string;
  itemUpdateDate: Date;
  longDescription: string;
  manufacturer: string;
  modelNumber: string;
  name: string;
  quantityLimit: number;
  regularPrice: number;
  salePrice: number;
  sku: number;
  weight: string;
  width: string;
  // For count
  count: number;
  // For pagination
  currentPage: number;
  totalPages: number;
}

export const parsingSearchResponseToProductModel = (
  searchResponse: SearchResponse,
): ProductModel[] => {
  try {
    return searchResponse.products.map((product: ProductModel) => {
      return {
        color: product.color ?? 'No color info',
        depth: product.depth ?? 'No depth info',
        height: product.height ?? 'No height info',
        image: product.image ?? 'No image info',
        itemUpdateDate: product.itemUpdateDate ?? Date.now(),
        longDescription: product.longDescription ?? 'No description info',
        manufacturer: product.manufacturer ?? 'No manufacturer info',
        modelNumber: product.modelNumber ?? 'No model number info',
        name: product.name ?? 'No name info',
        quantityLimit: product.quantityLimit ?? 0,
        regularPrice: product.regularPrice ?? 0,
        salePrice: product.salePrice ?? 0,
        sku: product.sku ?? 0,
        weight: product.weight ?? 'No weight info',
        width: product.width ?? 'No width info',
        // For count (Always default 1)
        count: 1,
        // For pagination
        currentPage: searchResponse.currentPage ?? 1,
        totalPages: searchResponse.totalPages ?? 1,
      };
    });
  } catch {
    return [];
  }
};
