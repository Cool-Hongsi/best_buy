import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { BodyContainerPropsType } from 'component/page/body/BodyContainer.interface';
import BodyContainer from 'component/page/body/BodyContainer';

const renderComponent = (props: BodyContainerPropsType) =>
  render(
    <Router>
      <BodyContainer children={props.children} />
    </Router>,
  );

describe('src/component/page/body/BodyContainer', () => {
  let props: BodyContainerPropsType;
  beforeEach(() => {
    props = {
      children: <div />,
    };
  });

  it('renders BodyContainer component', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('bodyContainer-component')).toBeInTheDocument();
  });
});
