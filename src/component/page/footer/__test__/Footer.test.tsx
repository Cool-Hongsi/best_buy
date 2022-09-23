import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from 'component/page/footer/Footer';

const renderComponent = () =>
  render(
    <Router>
      <Footer />
    </Router>,
  );

describe('src/component/page/footer/Footer', () => {
  it('renders Footer component', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('footer-component')).toBeInTheDocument();
  });
});
