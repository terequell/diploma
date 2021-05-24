/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect, useState, useMemo } from 'react';
import { TypeLessonWord } from 'types';
import { ExerciseType } from 'constants/lesson';
import lodash from 'lodash';
import { TypeWordForChoosing } from './types';
import { getWordsForChoosing } from './helpers';
import styles from './Exercise.module.scss';
import 'antd/dist/antd.css';

type Props = {
  onAnswer: (answer: string, isRight: boolean, id: number) => void;
  word: TypeLessonWord;
  words: TypeLessonWord[];
  wordIndex: number;
};

function Exercise(props: Props): JSX.Element {
  const [wordsForChoosing, setWordsForChoosing] = useState<
    TypeWordForChoosing[]
  >([]);

  useEffect(() => {
    const exerciseType = props.word.exercise_type;

    if (props.word) {
      setWordsForChoosing(
        getWordsForChoosing(props.word, props.words, exerciseType),
      );
    }
  }, [props.word]);

  // useEffect(() => {
  //   const timeout = setTimeout(
  //     () => props.onAnswer('', false, props.word.id),
  //     5000,
  //   );

  //   return () => clearTimeout(timeout);
  // }, [props.word]);

  function getWordQuestion(): string {
    const { exercise_type } = props.word;

    switch (exercise_type) {
      case ExerciseType.ENG_RUS:
        return props.word.english_wording;
      case ExerciseType.RUS_ENG:
        return props.word.russian_wording;
      default:
        throw new Error('Cant get word for question!');
    }
  }

  function handleChooseAnswer(answer: string, isRight: boolean): () => void {
    return () => {
      props.onAnswer(answer, isRight, props.word.id);
    };
  }

  const wordQuestion = useMemo(() => getWordQuestion(), [props.word]);
  const wordNumber = props.wordIndex + 1;
  const totalWords = props.words.length;

  return (
    <div className={styles['exercise']}>
      <div className={styles['exercise__header']}>
        <div className={styles['exercise__counter']}>
          Слово {wordNumber}/{totalWords}
        </div>
        <div className={styles['exercise__title']}>
          <span className={styles['exercise__question']}>
            Выберите правильный перевод слова
          </span>
          <span className={styles['exercise__word']}>{wordQuestion}</span>
        </div>
      </div>
      <div className={styles['exercise__answers']}>
        {lodash.shuffle(wordsForChoosing).map((word) => (
          <div
            key={word.text}
            className={styles['exercise__answer']}
            onClick={handleChooseAnswer(word.text, word.isRight)}
          >
            {word.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Exercise);
