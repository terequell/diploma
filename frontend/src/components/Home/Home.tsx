import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { StateType } from 'redux/store';
import { getUserInfo } from 'redux/user';
import { getLesson } from 'redux/lesson';
import Loader from 'components/Loader';
import UserInfo from 'components/UserInfo';
import { useAuth } from 'hooks';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import styles from './Home.module.scss';

function Home(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const { logout } = useAuth();

  const currentState = useSelector((state: StateType) => {
    const { username, email, difficulty_level, dateRegistration } = state.user;

    return {
      username,
      email,
      difficulty_level,
      dateRegistration,
    };
  });
  const isLoading = useSelector((state: StateType) => state.user.isLoading);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleClickStartLesson(): void {
    history.push('/lesson');
  }

  async function handleLogout(): Promise<void> {
    const success = await logout();

    if (success) {
      history.push('/');
    }
  }

  const { username, difficulty_level } = currentState;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles['home']}>
      <UserInfo
        username={username || ''}
        difficulty_level={difficulty_level || 1}
      />
      <div className={styles['home__buttons']}>
        <Button
          className={styles['home__start-lesson']}
          type="primary"
          size="large"
          onClick={handleClickStartLesson}
        >
          Начать урок!
        </Button>
        <Button
          className={styles['home__logout']}
          type="primary"
          size="large"
          onClick={handleLogout}
        >
          Выход
        </Button>
      </div>
    </div>
  );
}

export default memo(Home);
