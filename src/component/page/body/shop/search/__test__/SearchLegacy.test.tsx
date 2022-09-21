/* This is another way to test API with Axios */

import { searchResult } from 'service/api/bestbuy';
import { mockProductData } from 'service/mock/data/bestbuy';
import { SearchRequestPayload } from 'component/redux/bestbuy/bestbuyAction.interface';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('src/component/page/body/shop/search/SearchLegacy', () => {
  it('test searchResult api (legacy)', async () => {
    mockedAxios.get.mockResolvedValue({ data: { products: mockProductData } }); // axios.get을 만나면, 미리 설정한 값 return
    const value: SearchRequestPayload = {
      searchTerm: 'oven',
    };
    const result = await searchResult(value);
    expect(axios.get).toHaveBeenCalled();
    expect(result).toStrictEqual(mockProductData);
  });
});
