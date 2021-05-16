import React, { memo } from 'react';
import { Card } from 'antd';
import styles from './UserInfo.module.scss';
import 'antd/dist/antd.css';

type Props = {
  username: string;
  difficulty_level: number;
};

function UserInfo({ username, difficulty_level }: Props): JSX.Element {
  return (
    <div className={styles['userinfo']}>
      <Card title="Информация о пользователе">
        <div>Никнейм: {username}</div>
        <div>Текущий уровень сложности: {difficulty_level}</div>
      </Card>
    </div>
  );
}

export default memo(UserInfo);
