import { axiosGetApi } from 'service/api/axios';
// For Redux
import { SearchRequestPayload } from 'component/redux/bestbuy/bestbuyAction.interface';
// For Slice
// import { SearchRequestPayload } from 'component/slice/bestbuy/bestbuySlice.interface';
import { parsingSearchResponseToProductModel, ProductModel } from 'service/type/model/bestbuy';

const bestbuyPageSize = 20;
const bestbuyResultFilter =
  'sku,name,regularPrice,salePrice,itemUpdateDate,manufacturer,modelNumber,image,quantityLimit,color,depth,height,weight,width,longDescription';

// searchRequest 보낼 때, pagination 값을 안넣으면 default로 1이 들어가고,
// pagination 값을 넣으면 해당 값이 pagination에 들어간다.
export const searchResult = async ({
  searchTerm,
  pagination = 1,
}: SearchRequestPayload): Promise<ProductModel[] | Error> => {
  try {
    const result: ProductModel[] = await axiosGetApi({
      endPoint: `/products(search=${searchTerm})?format=json&pageSize=${bestbuyPageSize}&page=${pagination}&show=${bestbuyResultFilter}&apiKey=${process.env.REACT_APP_BESTBUY_KEY}`,
    }).then((response) => parsingSearchResponseToProductModel(response.data));
    return result;
  } catch (err) {
    return err as Error;
  }
};
