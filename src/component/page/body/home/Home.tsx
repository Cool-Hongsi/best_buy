import React from 'react';
import useAppSelector from 'service/hook/useAppSelector';
import { getLocalStorage } from 'service/util/localStorage';
import { LOCALSTORAGE } from 'service/const/general';
import * as Styled from 'component/page/body/home/Styled.Home';

const { AUTH } = LOCALSTORAGE;

const Home = () => {
  const { isLoggedIn } = useAppSelector((state) => state.authReducer);

  return (
    <Styled.Home data-testid="home-component">
      {isLoggedIn ? (
        <div data-testid="home-text">Welcome, {getLocalStorage(AUTH)['username'] ?? ''}</div>
      ) : (
        <div data-testid="home-text">Home</div>
      )}
    </Styled.Home>
  );
};

export default Home;
