import React from 'react';
import useAppSelector from 'service/hook/useAppSelector';
import { ProductModel } from 'service/type/model/bestbuy';
import Product from 'component/page/body/shop/product/productList/Product';
import { Link } from 'react-router-dom';
import { ROUTE } from 'service/const/route';
import * as Styled from 'component/page/body/shop/product/productList/Styled.ProductList';

const { SHOP } = ROUTE;

const ProductList = () => {
  const { loading, products } = useAppSelector((state) => state.bestbuyReducer);

  // console.log(products);

  // Initial
  if (!products) {
    return <div data-testid="productList-component-null" />;
  }
  // No Search Result
  if (!loading && products?.length === 0) {
    return <div data-testid="productList-component-no-result">There is no search result</div>;
  }
  // Search Result
  return (
    <Styled.ProductList data-testid="productList-component">
      {products.map((product: ProductModel) => {
        return (
          <Link
            data-testid={product.sku.toString() + '_link'}
            key={product.sku.toString()}
            to={`${SHOP}/${product.sku.toString()}`}
            state={product}
            onClick={() => window.scrollTo(0, 0)}
          >
            <Product dataTestId={product.sku.toString()} product={product} />
          </Link>
        );
      })}
    </Styled.ProductList>
  );
};

export default ProductList;
