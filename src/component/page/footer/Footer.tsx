import React from 'react';
import * as Styled from 'component/page/footer/Styled.Footer';

const Footer = () => {
  return (
    <Styled.Footer data-testid="footer-component">
      <div>
        <div>Created by React</div>
        <div>Redux with Saga middleware</div>
        <div>Jest &amp; Testing-Library for unit / integration test</div>
      </div>
      <div>Jake Hong</div>
    </Styled.Footer>
  );
};

export default Footer;
