import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from 'service/store';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from 'Styled.GlobalStyle';
import 'index.css'; // font
import 'react-lazy-load-image-component/src/effects/blur.css'; // lazy load image blur effect

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Router>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </Router>,
);
reportWebVitals();
