import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockProductData } from 'service/mock/data/bestbuy';
import { MEASUREMENT } from 'service/const/general';
import { ProductDetailPropsType } from 'component/page/body/shop/product/productDetail/ProductDetail.interface';
import ProductDetailMeasurement from 'component/page/body/shop/product/productDetail/ProductDetailMeasurement';

const { SIZE, COLOR, WEIGHT } = MEASUREMENT;

const renderComponent = (props: ProductDetailPropsType) =>
  render(
    <Router>
      <ProductDetailMeasurement {...props} />
    </Router>,
  );

describe('src/component/page/body/shop/product/productDetail/ProductDetailMeasurement', () => {
  let props: ProductDetailPropsType;

  beforeEach(() => {
    props = {
      product: mockProductData[0],
    };
  });

  it('renders ProductDetailMeasurement component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('productDetailMeasurement-component')).toBeInTheDocument();
  });
  it('test each measurement button and render correct data', () => {
    const { getByTestId } = renderComponent(props);

    for (let i = 0; i < Object.values(MEASUREMENT).length; i++) {
      expect(
        getByTestId(`productDetailMeasurementButton_${Object.values(MEASUREMENT)[i]}`),
      ).toBeInTheDocument();
    }

    const sizeButton = getByTestId(`productDetailMeasurementButton_${SIZE}`);
    const colorButton = getByTestId(`productDetailMeasurementButton_${COLOR}`);
    const weightButton = getByTestId(`productDetailMeasurementButton_${WEIGHT}`);

    fireEvent.click(sizeButton);
    expect(getByTestId('product-detail-measurement-data')).toHaveTextContent(
      mockProductData[0].width,
    ); // (W) 20.1 / (H) 2.5 / (D) 1.2
    fireEvent.click(colorButton);
    expect(getByTestId('product-detail-measurement-data')).toHaveTextContent(
      mockProductData[0].color,
    );
    fireEvent.click(weightButton);
    expect(getByTestId('product-detail-measurement-data')).toHaveTextContent(
      mockProductData[0].weight,
    );
  });
});
