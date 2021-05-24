import React, { memo } from 'react';
import { Route, NavLink, Switch, useLocation } from 'react-router-dom';
import Registration from 'components/Registration';
import StartPage from 'components/StartPage';
import Login from 'components/Login';
import Home from 'components/Home';
import Lesson from 'components/Lesson';
import LessonResults from 'components/LessonResults';
import ResultsDetails from 'components/ResultsDetails';
import { Layout as AntdLayout, Menu } from 'antd';
import classNames from 'classnames';
import { useAuthInterceptor, useLessonInterceptor } from 'interceptors';
import 'antd/dist/antd.css';
import styles from './Layout.module.scss';

const { Header, Content, Footer } = AntdLayout;

const PATHS_WITHOUT_LAYOUT = ['/', '/register', '/login'];

function Layout(): JSX.Element {
  useAuthInterceptor();
  useLessonInterceptor();
  const location = useLocation();
  const selectedKeys = [location.pathname];

  return (
    <AntdLayout style={{ height: '100%' }}>
      {!PATHS_WITHOUT_LAYOUT.includes(location.pathname) && (
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
        className={classNames({
          [styles['content']]: !PATHS_WITHOUT_LAYOUT.includes(
            location.pathname,
          ),
        })}
      >
        <div
          className={classNames({
            [styles['content__container']]: !PATHS_WITHOUT_LAYOUT.includes(
              location.pathname,
            ),
          })}
        >
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/lesson" component={Lesson} />
            <Route path="/results" exact component={LessonResults} />
            <Route path="/results/details" exact component={ResultsDetails} />
          </Switch>
        </div>
      </Content>
      {!PATHS_WITHOUT_LAYOUT.includes(location.pathname) && (
        <Footer className={styles['footer']}>Alexey Tereshenko 2021</Footer>
      )}
    </AntdLayout>
  );
}

export default memo(Layout);
