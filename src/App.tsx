import React from 'react';
// import ReduxToastr from "react-redux-toastr";

import { Provider } from 'react-redux';
import Main from './pages/Main';
import store from './store';
// import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <Provider store={store}>
    <Main />
    {/* <ReduxToastr /> */}
    <GlobalStyle />
  </Provider>
);

export default App;
