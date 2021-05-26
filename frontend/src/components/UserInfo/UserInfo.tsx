import React, { memo } from 'react';
import { Card, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { tooltipsTranslations } from 'translations/tooltips';
import 'antd/dist/antd.css';

type Props = {
  username: string;
  difficulty_level: number;
  lessonsFinishedCount: number;
  wordsLearnedCount: number;
};

function UserInfo({
  username,
  difficulty_level,
  lessonsFinishedCount,
  wordsLearnedCount,
}: Props): JSX.Element {
  return (
    <div>
      <Card title="Информация о пользователе">
        <div>Имя пользователя: {username}</div>
        <Tooltip title={tooltipsTranslations.DIFFICULTY_LEVEL_TOOLTIP}>
          <div>
            Текущий уровень сложности: {difficulty_level}{' '}
            <QuestionCircleOutlined />
          </div>
        </Tooltip>
        <div>Уроков завершено: {lessonsFinishedCount}</div>
        <Tooltip title={tooltipsTranslations.LEARNED_WORD_COUNT_TOOLTIP}>
          <div>
            Слов выучено: {wordsLearnedCount} <QuestionCircleOutlined />
          </div>
        </Tooltip>
      </Card>
    </div>
  );
}

export default memo(UserInfo);
