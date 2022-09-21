import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ProductPropsType } from 'component/page/body/shop/product/productList/Product.interface';
import * as Styled from 'component/page/body/shop/product/productList/Styled.Product';

const Product = ({ dataTestId, product }: ProductPropsType) => {
  // Check Sale Price
  const salePrice =
    product.salePrice && product.salePrice !== product.regularPrice ? (
      <span> / ${product.salePrice}</span>
    ) : null;

  return (
    <Styled.Product data-testid={dataTestId}>
      <LazyLoadImage
        data-testid="product-image"
        alt={product.name}
        width={'200px'}
        height={'200px'}
        src={product.image}
        effect="blur"
      />
      <div className="product-manufacturer-modelNumber-container">
        <span data-testid="product-manufacturer">{product.manufacturer}</span>
        <span> / </span>
        <span data-testid="product-modelNumber">{product.modelNumber}</span>
      </div>
      <div data-testid="product-name" className="product-name">
        {product.name}
      </div>
      <div className="product-price-container">
        <span
          data-testid="product-regularPrice"
          className={salePrice ? 'product-regularPrice-with-salePrice' : ''}
        >
          ${product.regularPrice}
        </span>
        <span data-testid="product-salePrice">{salePrice}</span>
      </div>
    </Styled.Product>
  );
};

export default Product;
