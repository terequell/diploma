import React, { memo } from 'react';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import styles from './Loader.module.scss';

function Loader(): JSX.Element {
  return (
    <div className={styles['loader__container']}>
      <Spin size="large" />
    </div>
  );
}

export default memo(Loader);
