import React, { useState } from 'react';
import useForm from 'service/hook/useForm';
import { SEARCH } from 'service/const/general';
import Input from 'component/common/input/Input';
import Button from 'component/common/button/Button';
import useAppSelector from 'service/hook/useAppSelector';
import { useAppDispatch } from 'service/hook/useAppDispatch';
import { inputValidation } from 'service/util/inputValidation';
import { searchRequest } from 'component/redux/bestbuy/bestbuyAction';
import LoadingSpinner from 'component/common/loadingSpinner/LoadingSpinner';
import * as Styled from 'component/page/body/shop/search/Styled.Search';

const { SEARCH_TERM } = SEARCH;

const Search = () => {
  const { loading, error } = useAppSelector((state) => state.bestbuyReducer);
  const dispatch = useAppDispatch();

  const [{ searchTerm }, onFormChange] = useForm({
    [SEARCH_TERM]: '',
  });

  const [formValid, setFormValid] = useState<boolean>(true);

  const onClickFunc = () => {
    if (!inputValidation({ searchTerm })) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    dispatch(searchRequest({ searchTerm }));
  };

  const onKeyDownFunc = (key: string) => {
    key === 'Enter' && onClickFunc();
  };

  return (
    <Styled.Search data-testid="search-component">
      <span className="search-instruction">Let's search products</span>
      <Input
        width="300px"
        dataTestId="searchTermInputTestId"
        placeholder="What are you looking for?"
        name={SEARCH_TERM}
        value={searchTerm}
        onChangeFunc={onFormChange(SEARCH_TERM)}
        onKeyDownFunc={onKeyDownFunc}
      />
      <Button
        width="300px"
        dataTestId="searchSubmitButtonTestId"
        text="Search"
        onClickFunc={onClickFunc}
      />
      {!formValid && (
        <div className="search-input-validation-error" data-testid="search-input-validation-error">
          Please check search input
        </div>
      )}
      {loading && <LoadingSpinner dataTestId="loadingSpinner-component" />}
      {error && (
        <div className="search-process-error" data-testid="search-process-error">
          {error.toString()}
        </div>
      )}
    </Styled.Search>
  );
};

export default Search;
