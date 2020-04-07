import React from 'react';
import { Layout, Row, Col, BackTop } from 'antd';
import Header from './header';
// import SideBar from './sidebar';
import AppMain from './AppMain';

// 响应式
const contentLayout = { xxl: 24, xl: 24, lg: 24, sm: 24, xs: 24 };

const WebLayout = props => {
  return (
    <Layout className="app-container">
      <Header />
      <Row className="app-wrapper">
        <Col {...contentLayout}>
          <AppMain {...props} />
        </Col>
      </Row>
      <BackTop target={() => document.querySelector('.app-main')} />
    </Layout>
  );
};

export default WebLayout;
