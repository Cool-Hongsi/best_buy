import React, { Suspense } from 'react';
import LoadingSpinner from 'component/common/loadingSpinner/LoadingSpinner';
import { useLocation, useParams } from 'react-router-dom';
import { ProductModel } from 'service/type/model/bestbuy';
import * as Styled from 'component/page/body/shop/product/productDetail/Styled.ProductDetailContainer';

// Image + Description
const ProductDetailMain = React.lazy(
  () => import('component/page/body/shop/product/productDetail/ProductDetailMain'),
);
// Measurement
const ProductDetailMeasurement = React.lazy(
  () => import('component/page/body/shop/product/productDetail/ProductDetailMeasurement'),
);

const ProductDetailContainer = () => {
  const { id } = useParams<string>();
  const product = useLocation().state as ProductModel;

  return (
    <Styled.ProductDetailContainer data-testid="productDetailContainer-component">
      <Suspense fallback={<LoadingSpinner dataTestId="productDetailContainer-loadding-spinner" />}>
        <ProductDetailMain id={id} product={product} />
        <ProductDetailMeasurement product={product} />
      </Suspense>
    </Styled.ProductDetailContainer>
  );
};

export default ProductDetailContainer;
