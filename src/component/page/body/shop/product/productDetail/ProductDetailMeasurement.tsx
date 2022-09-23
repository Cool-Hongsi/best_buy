import React, { useState } from 'react';
import Button from 'component/common/button/Button';
import { colorStyle } from 'Styled.GlobalStyle';
import { MEASUREMENT } from 'service/const/general';
import { ProductDetailPropsType } from 'component/page/body/shop/product/productDetail/ProductDetail.interface';
import * as Styled from 'component/page/body/shop/product/productDetail/Styled.ProductDetailMeasurement';

const { SIZE, COLOR, WEIGHT } = MEASUREMENT;

/*
  이렇게 Component를 구분한 이유는 (Main / Measurement)
  만약 한개의 Component에서 모든 ProductDetail 내용이 다 들어가 있을 시,
  하기처럼 state 한개 바꾸면 전체가 불필요하게 Rerender 된다.
  하지만 이런식으로 분리해 놓으면, state가 바뀌면 해당 Component (ProductDetailMeasurement)만 Rerender 되면서 Performance Up!
  즉, useState나 useSelector 써야하는데, 해당 Component에 UI가 많이 들어간다. => Split Component
*/
const ProductDetailMeasurement = ({ product }: ProductDetailPropsType) => {
  const [currentMeasurement, setCurrentMeasurement] = useState<string>(SIZE);

  // Measurement Data
  const measurementData = {
    [SIZE]: `(W) ${product.width} / (H) ${product.height} / (D) ${product.depth}`,
    [COLOR]: product.color,
    [WEIGHT]: product.weight,
  };

  return (
    <Styled.ProductDetailMeasurement data-testid="productDetailMeasurement-component">
      <div className="product-detail-measurement-selector">
        {Object.values(MEASUREMENT).map((measurement: string) => {
          return (
            <Button
              key={measurement}
              dataTestId={`productDetailMeasurementButton_${measurement}`}
              text={measurement}
              onClickFunc={() => setCurrentMeasurement(measurement)}
              backgroundColor={
                currentMeasurement === measurement ? colorStyle.dark : colorStyle.darkGrey
              }
              color={currentMeasurement === measurement ? colorStyle.white : colorStyle.white}
              width="140px"
            />
          );
        })}
      </div>
      <div
        data-testid="product-detail-measurement-data"
        className="product-detail-measurement-data"
      >
        {measurementData[currentMeasurement]}
      </div>
    </Styled.ProductDetailMeasurement>
  );
};

export default ProductDetailMeasurement;
