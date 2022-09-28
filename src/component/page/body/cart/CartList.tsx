import React, { useState } from 'react';
import { CartListModalState } from 'component/page/body/cart/CartList.interface';
import Button from 'component/common/button/Button';
import Modal from 'component/common/modal/Modal';
import { CART } from 'service/const/general';
import useAppSelector from 'service/hook/useAppSelector';
import { useAppDispatch } from 'service/hook/useAppDispatch';
import { ProductModel } from 'service/type/model/bestbuy';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { colorStyle } from 'Styled.GlobalStyle';
import {
  deleteCartDataFromAuthLocalStorage,
  deleteAllCartDataFromAuthLocalStorage,
  setExistingAuthCart,
} from 'service/util/localStorage';
// For Redux
import { deleteEachCart, deleteAllCart } from 'component/redux/bestbuy/bestbuyAction';
// For Slice
// import { deleteEachCart, deleteAllCart } from 'component/slice/bestbuy/bestbuySlice';
import * as Styled from 'component/page/body/cart/Styled.CartList';

const { DELETE_ALL, DELETE_EACH } = CART;

const CartList = () => {
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector((state) => state.authReducer);
  const { cart } = useAppSelector((state) => state.bestbuyReducer);

  const [showModal, setShowModal] = useState<CartListModalState>({
    [DELETE_ALL]: false,
    [DELETE_EACH]: false,
    selectedCart: null,
  });

  const onClickDeleteButton = (key: string, selectedCart?: ProductModel) => {
    if (selectedCart) {
      setShowModal({ ...showModal, [key]: true, selectedCart });
    } else {
      setShowModal({ ...showModal, [key]: true });
    }
  };

  const onClickDeleteAllCartWithYes = () => {
    // Local Storage
    deleteAllCartDataFromAuthLocalStorage(isLoggedIn);
    isLoggedIn && setExistingAuthCart();
    // Store State
    dispatch(deleteAllCart());
    // Local State
    onClickCloseModal();
  };

  const onClickDeleteEachCartWithYes = () => {
    // Local Storage
    deleteCartDataFromAuthLocalStorage(isLoggedIn, showModal.selectedCart as ProductModel);
    isLoggedIn && setExistingAuthCart();
    // Store State
    dispatch(deleteEachCart(showModal.selectedCart as ProductModel));
    // Local State
    onClickCloseModal();
  };

  const onClickCloseModal = () => {
    setShowModal({ ...showModal, [DELETE_ALL]: false, [DELETE_EACH]: false, selectedCart: null });
  };

  if (cart.length === 0) {
    return (
      <Styled.CartList data-testid="cartList-component-without-cart-data">
        Empty Cart!
      </Styled.CartList>
    );
  }

  return (
    <Styled.CartList data-testid="cartList-component">
      <div className="cartList-deleteAll-button">
        <Button
          dataTestId="deleteAllCartButtonTestId"
          text="Delete All"
          backgroundColor={colorStyle.dark}
          onClickFunc={() => onClickDeleteButton(DELETE_ALL)}
        />
      </div>

      <table className="cartList-table">
        <thead>
          <tr>
            {['', 'Name', 'Qty', 'Price', 'Total', ''].map((thead: string, index: number) => {
              return <th key={index}>{thead}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {cart.map((cart: ProductModel) => {
            return (
              <tr key={cart.sku} data-testid="cartList-each-cell">
                <th>
                  <LazyLoadImage
                    data-testid="cartList-each-cell-image"
                    alt={cart.name}
                    src={cart.image}
                    effect="blur"
                    className="cartList-each-cell-image"
                  />
                </th>
                <th data-testid="cartList-each-cell-name" className="cartList-each-cell-name">
                  {cart.name}
                </th>
                <th data-testid="cartList-each-cell-count">{cart.count}</th>
                <th data-testid="cartList-each-cell-price">
                  ${cart.salePrice > 0 ? cart.salePrice.toFixed(2) : cart.regularPrice.toFixed(2)}
                </th>
                <th data-testid="cartList-each-cell-totalPrice">
                  $
                  {cart.salePrice > 0
                    ? (cart.salePrice * cart.count).toFixed(2)
                    : (cart.regularPrice * cart.count).toFixed(2)}
                </th>
                <th>
                  <div
                    className="cartList-each-cell-delete"
                    data-testid={`deleteEachCartButtonTestId_${cart.sku}`}
                    onClick={() => onClickDeleteButton(DELETE_EACH, cart)}
                  >
                    X
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal[DELETE_ALL] && (
        <Modal
          dataTestId="deleteAllCartModalTestId"
          title="Delete All Cart"
          content="Do you want to delete all cart?"
          yesButtonText="YES"
          noButtonText="NO"
          onClickYesButton={onClickDeleteAllCartWithYes}
          onClickNoButton={onClickCloseModal}
        />
      )}
      {showModal[DELETE_EACH] && (
        <Modal
          dataTestId="deleteEachCartModalTestId"
          // title={`Delete ${showModal.selectedCart.name}`} // showModal.selectedCart가 nullable이라 .name을 못 읽음
          title={`Delete ${(showModal.selectedCart as ProductModel).name}`}
          content={`Do you want to delete ${(showModal.selectedCart as ProductModel).name}?`}
          yesButtonText="YES"
          noButtonText="NO"
          onClickYesButton={onClickDeleteEachCartWithYes}
          onClickNoButton={onClickCloseModal}
        />
      )}
    </Styled.CartList>
  );
};

export default CartList;
