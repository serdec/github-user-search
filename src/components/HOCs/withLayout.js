import React from 'react';
import Header from '../Header/header';
import Body from '../Body/body';

const withLayout = (Component) => (props) =>
  (function WithLayout() {
    return (
      <>
        <Header />
        <Body>
          <Component {...props} />
        </Body>
      </>
    );
  })();

export default withLayout;
