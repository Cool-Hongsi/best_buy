import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { dateFormat } from 'service/util/dateFormat';
import Button from 'component/common/button/Button';
import { colorStyle } from 'Styled.GlobalStyle';
import { ProductDetailPropsType } from 'component/page/body/shop/product/productDetail/ProductDetail.interface';
import useAppSelector from 'service/hook/useAppSelector';
import { useAppDispatch } from 'service/hook/useAppDispatch';
import { setCartDataToAuthLocalStorage, setExistingAuthCart } from 'service/util/localStorage';
// For Redux
import { addCart } from 'component/redux/bestbuy/bestbuyAction';
// For Slice
// import { addCart } from 'component/slice/bestbuy/bestbuySlice';
import { ProductModel } from 'service/type/model/bestbuy';
import * as Styled from 'component/page/body/shop/product/productDetail/Styled.ProductDetailMain';

const ProductDetailMain = ({ id, product }: ProductDetailPropsType) => {
  const [count, setCount] = useState<number>(1);
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  // Check Sale Price
  const salePrice =
    product.salePrice && product.salePrice !== product.regularPrice ? (
      <span> / ${product.salePrice}</span>
    ) : null;

  const onClickCartButton = () => {
    // Update product count (Default 1 => User selected count)
    // product.count = count; // Uncaught TypeError: Cannot assign to read only property 'count'
    const copyProduct: ProductModel = { ...product };
    copyProduct.count = count;
    // Update local storage (순서 중요!)
    setCartDataToAuthLocalStorage(isLoggedIn, copyProduct);
    isLoggedIn && setExistingAuthCart(); // 'anonymous'는 필요 없는 작업
    // Update cart state
    dispatch(addCart(copyProduct));
  };

  return (
    <Styled.ProductDetailMain data-testid="productDetailMain-component">
      <LazyLoadImage
        data-testid="product-detail-main-image"
        alt={product.name}
        src={product.image}
        effect="blur"
        className="product-detail-main-image"
      />
      <div className="product-detail-main-description">
        <div className="product-detail-main-manufacturer-modelNumber-container">
          <span data-testid="product-detail-main-manufacturer">{product.manufacturer}</span>
          <span> / </span>
          <span data-testid="product-detail-main-modelNumber">{product.modelNumber}</span>
        </div>
        <div data-testid="product-detail-main-name" className="product-detail-main-name">
          {product.name}
        </div>
        <div className="product-detail-main-price-container">
          <span
            data-testid="product-detail-main-regularPrice"
            className={salePrice ? 'product-detail-main-regularPrice-with-salePrice' : ''}
          >
            ${product.regularPrice}
          </span>
          <span data-testid="product-detail-main-salePrice">{salePrice}</span>
        </div>
        <div className="product-detail-main-quantity">
          <span data-testid="product-detail-main-quantityLimit">
            {product.quantityLimit}ea left
          </span>
          <span data-testid="product-detail-main-itemUpdateDate">
            {' '}
            (Updated at {dateFormat(product.itemUpdateDate)})
          </span>
        </div>
        <div
          data-testid="product-detail-main-description"
          className="product-detail-main-description"
        >
          {product.longDescription}
        </div>
        <div className="product-detail-main-count-container">
          <Button
            dataTestId="productDetailMainDecreaseButtonTestId"
            text="-"
            width="45px"
            color={colorStyle.white}
            backgroundColor={colorStyle.dark}
            onClickFunc={() => count > 1 && setCount(count - 1)}
          />
          <div data-testid="product-detail-main-count">{count}</div>
          <Button
            dataTestId="productDetailMainIncreaseButtonTestId"
            text="+"
            width="45px"
            color={colorStyle.white}
            backgroundColor={colorStyle.dark}
            onClickFunc={() => count < product.quantityLimit && setCount(count + 1)}
          />
        </div>
        <div className="product-detail-main-buy-cart-button-container">
          <Button
            dataTestId="productDetailMainBuyButtonTestId"
            text="Buy"
            width="145px"
            onClickFunc={() => console.log('Click Buy Button')}
          />
          <Button
            dataTestId="productDetailMainCartButtonTestId"
            text="Add to cart"
            width="145px"
            color={colorStyle.white}
            backgroundColor={colorStyle.darkGrey}
            onClickFunc={onClickCartButton}
          />
        </div>
      </div>
    </Styled.ProductDetailMain>
  );
};

export default ProductDetailMain;
