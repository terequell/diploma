/* eslint-disable react/button-has-type */
import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateType } from 'redux/store';
import { actions, sendResults } from 'redux/lesson';
import { useHistory } from 'react-router-dom';
import styles from './LessonResults.module.scss';

function LessonResults(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const resultsState = useSelector((state: StateType) => {
    const { answers } = state.lesson;
    const totalWords = answers.length;
    const rightAnswered = answers.filter((item) => item.isRight).length;

    return {
      totalWords,
      rightAnswered,
    };
  });

  useEffect(() => {
    dispatch(sendResults());
  }, []);

  function handleClickHome(): void {
    history.push('/home');
    dispatch(actions.resetLessonData());
  }

  function handleClickDetails(): void {
    history.push('/results/details');
  }

  return (
    <div className={styles['results']}>
      <div className={styles['results__header']}>
        <span className={styles['results__title']}>Урок пройден</span>
        <span className={styles['results__counter']}>
          Слов отвечено правильно: {resultsState.rightAnswered}/
          {resultsState.totalWords}
        </span>
      </div>
      <div className={styles['results__buttons']}>
        <button
          className={styles['results__button']}
          onClick={handleClickDetails}
        >
          Посмотреть детали
        </button>
        <button className={styles['results__button']} onClick={handleClickHome}>
          Домой
        </button>
      </div>
    </div>
  );
}

export default memo(LessonResults);
