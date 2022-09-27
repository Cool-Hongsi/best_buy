import { searchRequestFunc, setDefaultCartRequestFunc } from 'component/redux/bestbuy/bestbuySaga';
import bestbuyReducer from 'component/redux/bestbuy/bestbuyReducer';
import { BestbuyState } from 'component/redux/bestbuy/bestbuyReducer.interface';
import {
  SearchRequest,
  SearchRequestPayload,
} from 'component/redux/bestbuy/bestbuyAction.interface';
import { mockProductData } from 'service/mock/data/bestbuy';
import { BESTBUY_ACTION } from 'service/const/action';

const { SEARCH_REQUEST } = BESTBUY_ACTION;

jest.mock('axios', () => ({
  get: (url: string) => {
    if (url.includes('/products(search=')) {
      return Promise.resolve({ data: { products: mockProductData } }); // 실제 API 부르지 않고 MockData로 대체
    }
    return Promise.reject(new Error('Error occured'));
  },
}));

// 실제 function 안부르게 하기 위해 mock 선언
jest.mock('service/util/localStorage', () => ({
  getLocalStorage: jest.fn(),
  getExistingAuthCart: jest.fn(),
}));

describe('src/component/redux/bestbuy/bestbuySaga', () => {
  let initialState: BestbuyState;

  beforeEach(() => {
    initialState = {
      loading: false,
      error: null,
      searchTerm: '',
      products: [],
      cart: [],
    };
  });

  test('tests searchRequestFunc (success)', () => {
    const searchRequestPayload: SearchRequestPayload = {
      searchTerm: 'desk',
    };
    const action: SearchRequest = {
      type: SEARCH_REQUEST,
      payload: searchRequestPayload,
    };

    const generator: Generator = searchRequestFunc(action);
    generator.next(); // Face first yield (call)
    const result = generator.next(mockProductData).value.payload.action; // Set the result of first yield (call) as mockProductData and Face second yield (put(searchSuccess(result as ProductModel[])))
    // console.log(result); // { type: 'SEARCH_SUCCESS', payload: mockProductData }
    const newState = bestbuyReducer(initialState, result);
    expect(newState).toStrictEqual({ ...initialState, products: mockProductData });
    expect(generator.next().done).toBeTruthy(); // No more yield
  });

  test('tests searchRequestFunc (failure)', () => {
    const searchRequestPayload: SearchRequestPayload = {
      searchTerm: 'desk',
    };
    const action: SearchRequest = {
      type: SEARCH_REQUEST,
      payload: searchRequestPayload,
    };

    const generator: Generator = searchRequestFunc(action);
    generator.next(); // Face first yield (call)
    const error = new Error('Error while processing searchRequest');
    const result = generator.next(error).value.payload.action; // Set the result of first yield (call) as error and Face second yield (put(searchFailure(result as Error)))
    // console.log(result); // { type: 'SEARCH_FAILURE', payload: Error: Error while processing searchRequest }
    const newState = bestbuyReducer(initialState, result);
    expect(newState).toStrictEqual({ ...initialState, error: error });
    expect(generator.next().done).toBeTruthy(); // No more yield
  });

  test('tests setDefaultCartRequestFunc (success)', () => {
    const generator: Generator = setDefaultCartRequestFunc();
    generator.next(); // Face first yield ([])
    const result = generator.next([]).value.payload.action; // Set the result of first yield ([]) as [] and Face second yield (put(setDefaultCartSuccess(defaultCartData)))
    // console.log(result); // { type: 'SET_DEFAULT_CART_SUCCESS', payload: [] }
    const newState = bestbuyReducer(initialState, result);
    expect(newState).toStrictEqual({ ...initialState });
    expect(generator.next().done).toBeTruthy(); // No more yield
  });
});
