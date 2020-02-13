import React, { Fragment } from 'react';
// import ReduxToastr from "react-redux-toastr";

import Header from './components/Header';
// import store from "./store";
// import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <Fragment>
    <Header />
    {/* <ReduxToastr /> */}
    <GlobalStyle />
  </Fragment>
);

export default App;
