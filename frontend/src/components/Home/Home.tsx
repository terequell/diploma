import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { StateType } from 'redux/store';
import { getUserInfo } from 'redux/user';
import Loader from 'components/Loader';
import { actions } from 'redux/lesson';
import UserInfo from 'components/UserInfo';
import { useAuth } from 'hooks';
import { Button, Table } from 'antd';
import 'antd/dist/antd.css';
import styles from './Home.module.scss';

type TypeLearnedWordsTableData = {
  key: string;
  english_wording: string;
  russian_wording: string;
  difficulty_level: number;
};

function Home(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const { logout } = useAuth();

  const currentState = useSelector((state: StateType) => {
    const {
      username,
      email,
      difficulty_level,
      dateRegistration,
      lessonsFinishedCount,
      wordsLearned,
    } = state.user;

    return {
      username,
      email,
      difficulty_level,
      dateRegistration,
      lessonsFinishedCount,
      wordsLearned,
    };
  });
  const isLoading = useSelector((state: StateType) => state.user.isLoading);

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(actions.resetLessonData());
  }, []);

  function handleClickStartLesson(): void {
    history.push('/lesson');
  }

  async function handleLogout(): Promise<void> {
    const success = await logout();

    if (success) {
      history.push('/');
    }
  }

  const {
    username,
    difficulty_level,
    lessonsFinishedCount,
    wordsLearned,
  } = currentState;

  const learnedWordsColumns = [
    {
      title: 'Английский перевод',
      dataIndex: 'english_wording',
      key: 'english_wording',
    },
    {
      title: 'Русский перевод',
      dataIndex: 'russian_wording',
      key: 'russian_wording',
    },
    {
      title: 'Уровень сложности',
      dataIndex: 'difficulty_level',
      key: 'difficulty_level',
    },
  ];

  function getLearnedWordsTableData(): TypeLearnedWordsTableData[] {
    return wordsLearned.map((word) => ({
      key: word.english_wording,
      english_wording: word.english_wording,
      russian_wording: word.russian_wording,
      difficulty_level: word.difficulty_level,
    }));
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles['home']}>
      <UserInfo
        username={username || ''}
        difficulty_level={difficulty_level || 1}
        lessonsFinishedCount={lessonsFinishedCount || 0}
        wordsLearnedCount={wordsLearned.length}
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
      {wordsLearned.length > 0 && (
        <div className={styles['home__learned-words']}>
          <h1>Выученные слова</h1>
          <Table
            dataSource={getLearnedWordsTableData()}
            columns={learnedWordsColumns}
            className={styles['home__learned-table']}
            pagination={false}
            scroll={{ y: 500 }}
          />
        </div>
      )}
    </div>
  );
}

export default memo(Home);
