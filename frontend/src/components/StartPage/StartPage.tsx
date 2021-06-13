import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import classNames from 'classnames';
import 'antd/dist/antd.css';
import styles from './StartPage.module.scss';

function StartPage(): JSX.Element {
  return (
    <div className={styles['home__container']}>
      <h1 className={styles['home__title']}>
        Веб-приложение для тренировки английских слов.
      </h1>
      <Button className={classNames('cy-login', [styles['home__button']])}>
        <NavLink to="/login">Войти</NavLink>
      </Button>
      <Button
        className={classNames('cy-register', [styles['home__button']])}
        type="primary"
      >
        <NavLink to="/register">Зарегистрироваться</NavLink>
      </Button>
    </div>
  );
}

export default memo(StartPage);
