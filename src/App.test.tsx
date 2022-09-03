import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders app component', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('app-container')).toBeInTheDocument();
});
