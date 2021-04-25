import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import styles from './StartPage.module.scss';

function StartPage(): JSX.Element {
  return (
    <div className={styles['home__container']}>
      <Button className={styles['home__button']}>
        <NavLink to="/login">Войти</NavLink>
      </Button>
      <Button className={styles['home__button']} type="primary">
        <NavLink to="/register">Зарегистрироваться</NavLink>
      </Button>
    </div>
  );
}

export default memo(StartPage);
