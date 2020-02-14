import React from 'react';

import { Container } from './styles';
import Header from '../../components/Header';
import SideBar from '../../components/Sidebar';
// import Content from "../../components/Content";

const Main = () => (
  <>
    <Header />
    <Container>
      <SideBar />
      {/* <Content /> */}
    </Container>
  </>
);

export default Main;
