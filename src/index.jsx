import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';
import { Provider } from 'react-redux';
import api from './api.js';
import { init, populate, store } from './store.js';

init();
populate();

const markup = 
<Provider store={store}>
  <AppContainer>
    <App/>
  </AppContainer>
</Provider>

render( markup, document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    const App = require('./app.jsx').default;
    render(
      {markup},
      document.querySelector("#app")
    );
  });
}

api.start();
