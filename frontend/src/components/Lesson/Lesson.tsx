import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from 'redux/store';
import { getLesson } from 'redux/lesson';
import Exercise from 'components/Exercise';
import styles from './Lesson.module.scss';

function Lesson(): JSX.Element {
  const dispatch = useDispatch();

  const lessonState = useSelector((state: StateType) => {
    const { currentWordIndex, words } = state.lesson;
    const currentWord = words[currentWordIndex];

    return {
      currentWord,
      words,
    };
  });

  useEffect(() => {
    dispatch(getLesson());
  }, []);

  return (
    <div className={styles['lesson']}>
      <Exercise word={lessonState.currentWord} words={lessonState.words} />
    </div>
  );
}

export default memo(Lesson);
