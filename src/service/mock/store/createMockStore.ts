import configureStore from 'redux-mock-store';
import { Store } from '@reduxjs/toolkit';
import { RootState } from 'service/store';

export const createMockStore = (mockState: Partial<RootState>): Store => {
  const mockStore = configureStore([]); // thunk? saga?
  const store = mockStore(mockState);
  return store;
};
