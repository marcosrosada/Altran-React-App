import React, { Fragment } from 'react';
// import ReduxToastr from "react-redux-toastr";

import Main from './pages/Main';
// import store from "./store";
// import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <Fragment>
    <Main />
    {/* <ReduxToastr /> */}
    <GlobalStyle />
  </Fragment>
);

export default App;
