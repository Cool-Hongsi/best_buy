import React from 'react';
import useAppSelector from 'service/hook/useAppSelector';
import { useAppDispatch } from 'service/hook/useAppDispatch';
import { searchRequest } from 'component/redux/bestbuy/bestbuyAction';
import * as Styled from 'component/page/body/shop/pagination/Styled.Pagination';

const Pagination = () => {
  const { products, searchTerm } = useAppSelector((state) => state.bestbuyReducer);
  const dispatch = useAppDispatch();

  // Initial
  if (!products || products.length === 0) {
    return <div data-testid="pagination-component-null" />;
  }

  const currentPage: number = products[products.length - 1].currentPage;
  const totalPages: number = products[products.length - 1].totalPages;

  const onClickPagination = (pagination?: number) => {
    window.scrollTo(0, 0);
    dispatch(searchRequest({ searchTerm, pagination }));
  };

  // Search Result
  return (
    <Styled.Pagination data-testid="pagination-component">
      {/* < Button */}
      <i
        data-testid="backButtonTestId"
        className={`arrow left ${currentPage === 1 && 'inactive'}`}
        onClick={() => currentPage !== 1 && onClickPagination(currentPage - 1)}
      />
      {/* First Page */}
      <span
        data-testid="firstPageButtonTestId"
        onClick={() => currentPage !== 1 && onClickPagination()}
      >
        1
      </span>
      {/* Current Page */}
      <span data-testid="currentPageTestId">{currentPage}</span>
      {/* Last Page */}
      <span
        data-testid="lastPageButtonTestId"
        onClick={() => currentPage !== totalPages && onClickPagination(totalPages)}
      >
        {totalPages}
      </span>
      {/* > Button */}
      <i
        data-testid="forwardButtonTestId"
        className={`arrow right ${currentPage === totalPages && 'inactive'}`}
        onClick={() => currentPage !== totalPages && onClickPagination(currentPage + 1)}
      />
    </Styled.Pagination>
  );
};

export default Pagination;
