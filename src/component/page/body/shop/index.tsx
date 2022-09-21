import React, { Suspense } from 'react';
import LoadingSpinner from 'component/common/loadingSpinner/LoadingSpinner';
import * as Styled from 'component/page/body/shop/Styled.ShopContainer';

const Search = React.lazy(() => import('component/page/body/shop/search/Search'));
const ProductList = React.lazy(
  () => import('component/page/body/shop/product/productList/ProductList'),
);
const Pagination = React.lazy(() => import('component/page/body/shop/pagination/Pagination'));

const ShopContainer = () => {
  return (
    <Styled.ShopContainer data-testid="shopContainer-component">
      <Suspense fallback={<LoadingSpinner dataTestId="shop-loadding-spinner" />}>
        <Search />
        <ProductList />
        <Pagination />
      </Suspense>
    </Styled.ShopContainer>
  );
};

export default ShopContainer;
