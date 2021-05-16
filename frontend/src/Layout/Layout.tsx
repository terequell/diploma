import React, { memo } from 'react';
import { Route, NavLink, Switch, useLocation } from 'react-router-dom';
import Registration from 'components/Registration';
import StartPage from 'components/StartPage';
import Login from 'components/Login';
import Home from 'components/Home';
import Lesson from 'components/Lesson';
import { useAuth } from 'hooks';
import { Layout as AntdLayout, Menu } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = AntdLayout;

const PATHS_WITHOUT_LAYOUT = ['/', '/register', '/login'];

function Layout(): JSX.Element {
  const location = useLocation();
  const { authenticated } = useAuth();
  const selectedKeys = [location.pathname];

  return (
    <AntdLayout style={{ height: '100%' }}>
      {authenticated && !PATHS_WITHOUT_LAYOUT.includes(location.pathname) && (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            activeKey={location.pathname}
            selectedKeys={selectedKeys}
          >
            <Menu.Item key="/home">
              <NavLink to="/home">Домой</NavLink>
            </Menu.Item>
          </Menu>
        </Header>
      )}
      <Content
        className="site-layout"
        style={{ marginTop: 64, height: '100%' }}
      >
        <div className="site-layout-background" style={{ padding: 24 }}>
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/lesson" component={Lesson} />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Alexey Tereshenko 2021</Footer>
    </AntdLayout>
  );
}

export default memo(Layout);
