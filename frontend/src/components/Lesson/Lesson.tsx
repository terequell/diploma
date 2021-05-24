import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { StateType } from 'redux/store';
import { getLesson, actions } from 'redux/lesson';
import Exercise from 'components/Exercise';
import styles from './Lesson.module.scss';

function Lesson(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  const lessonState = useSelector((state: StateType) => {
    const { currentWordIndex, words, answers } = state.lesson;
    const currentWord = words[currentWordIndex];

    return {
      currentWord,
      words,
      currentWordIndex,
      answers,
    };
  });

  useEffect(() => {
    dispatch(getLesson());
  }, []);

  useEffect(() => {
    if (lessonState.answers.length === 7) {
      history.push('/results');
    }
  }, [lessonState.answers]);

  function handleAnswer(answer: string, isRight: boolean, id: number): void {
    dispatch(actions.setAnswer(answer, isRight, id));
  }

  return (
    <div className={styles['lesson']}>
      {lessonState.currentWord && (
        <Exercise
          onAnswer={handleAnswer}
          word={lessonState.currentWord}
          words={lessonState.words}
          wordIndex={lessonState.currentWordIndex}
        />
      )}
    </div>
  );
}

export default memo(Lesson);
