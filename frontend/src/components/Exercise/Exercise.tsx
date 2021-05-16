import React, { memo, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { TypeLessonWord } from 'types';
import { ExerciseType } from 'constants/lesson';
import { getRandomEnumValue } from 'helpers/enum';
import lodash from 'lodash';
import { TypeWordForChoosing } from './types';
import { getWordsForChoosing } from './helpers';
import styles from './Exercise.module.scss';
import 'antd/dist/antd.css';

type Props = {
  word: TypeLessonWord;
  words: TypeLessonWord[];
};

function Exercise(props: Props): JSX.Element {
  const [wordsForChoosing, setWordsForChoosing] = useState<
    TypeWordForChoosing[]
  >([]);

  useEffect(() => {
    const exerciseType = getRandomEnumValue(ExerciseType);

    if (props.word) {
      setWordsForChoosing(
        getWordsForChoosing(props.word, props.words, exerciseType),
      );
    }
  }, [props.word]);

  console.log(lodash.shuffle(wordsForChoosing));

  return (
    <div className={styles['exercise']}>
      <div className={styles['exercise__word']}>Word</div>
      <div className={styles['exercise__answers']}>
        <Row gutter={[16, 16]}>
          <Col span={12} />
          <Col span={12} />
          <Col span={12} />
          <Col span={12} />
        </Row>
      </div>
    </div>
  );
}

export default memo(Exercise);
