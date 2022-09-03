import React from 'react';
import environment from 'environment';

const App = () => {
  const data = 'abcd';

  return (
    <>
      <div data-testid="app-container">{environment.baseUrl}</div>
    </>
  );
};

export default App;
