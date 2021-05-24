/* eslint-disable react/button-has-type */
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StateType } from 'redux/store';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd';
import { ExerciseType } from 'constants/lesson';
import styles from './ResultsDetails.module.scss';
import 'antd/dist/antd.css';

type TypeDetailsDataTable = {
  key: string;
  word: string;
  answer: string;
  isRight: string;
};

function ResultsDetails(): JSX.Element {
  const history = useHistory();
  const detailsState = useSelector((state: StateType) => {
    const { words, answers } = state.lesson;

    return {
      words,
      answers,
    };
  });

  useEffect(() => {
    // TODO: dispatch here action for save lesson results on backend
  }, []);

  function handleClickBack(): void {
    history.push('/results');
  }

  function getTableData(): TypeDetailsDataTable[] {
    return detailsState.answers.map((answer) => {
      const word = detailsState.words[answer.index];

      return {
        word:
          word.exercise_type === ExerciseType.ENG_RUS
            ? word.english_wording
            : word.russian_wording,
        answer: answer.answer,
        isRight: answer.isRight ? 'Да' : 'Нет',
        key: answer.answer,
      };
    });
  }

  const columns = [
    {
      title: 'Слово',
      dataIndex: 'word',
      key: 'word',
    },
    {
      title: 'Ваш ответ',
      dataIndex: 'answer',
      key: 'answer',
    },
    {
      title: 'Правильно?',
      dataIndex: 'isRight',
      key: 'isRight',
    },
  ];

  return (
    <div className={styles['details']}>
      <span className={styles['details__title']}>Детали урока</span>
      <Table
        dataSource={getTableData()}
        columns={columns}
        className={styles['details__table']}
        pagination={false}
      />
      <button className={styles['details__button']} onClick={handleClickBack}>
        Назад
      </button>
    </div>
  );
}

export default memo(ResultsDetails);
