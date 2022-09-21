import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockProductData } from 'service/mock/data/bestbuy';
import { ProductPropsType } from 'component/page/body/shop/product/productList/Product.interface';
import Product from 'component/page/body/shop/product/productList/Product';

const renderComponent = (props: ProductPropsType) =>
  render(
    <Router>
      <Product {...props} />
    </Router>,
  );

describe('src/component/page/body/shop/product/productList/Product', () => {
  let props: ProductPropsType;

  beforeEach(() => {
    props = {
      dataTestId: mockProductData[0].sku.toString(),
      product: mockProductData[0],
    };
  });

  it('renders Product component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId(mockProductData[0].sku)).toBeInTheDocument();
  });

  it('tests each element', () => {
    const { getByTestId } = renderComponent(props);
    // image
    expect(getByTestId('product-image')).toBeInTheDocument();
    expect(getByTestId('product-image')).toHaveAttribute('src', mockProductData[0].image);
    // manufacturer
    expect(getByTestId('product-manufacturer')).toBeInTheDocument();
    expect(getByTestId('product-manufacturer')).toHaveTextContent(mockProductData[0].manufacturer);
    // modelNumber
    expect(getByTestId('product-modelNumber')).toBeInTheDocument();
    expect(getByTestId('product-modelNumber')).toHaveTextContent(mockProductData[0].modelNumber);
    // name
    expect(getByTestId('product-name')).toBeInTheDocument();
    expect(getByTestId('product-name')).toHaveTextContent(mockProductData[0].name);
    // regularPrice
    expect(getByTestId('product-regularPrice')).toBeInTheDocument();
    expect(getByTestId('product-regularPrice')).toHaveTextContent(
      mockProductData[0].regularPrice.toString(),
    );
    // salePrice
    expect(getByTestId('product-salePrice')).toBeInTheDocument();
    expect(getByTestId('product-salePrice')).toHaveTextContent(
      mockProductData[0].salePrice.toString(),
    );
  });
});
