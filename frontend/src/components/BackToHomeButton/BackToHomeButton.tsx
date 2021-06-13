import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import styles from './BackToHomeButton.module.scss';

type Props = {
  link: string;
};

function BackToHomeButton(props: Props): JSX.Element {
  return (
    <NavLink exact to={props.link}>
      <div
        className={classNames('cy-back_button', [
          styles['back-button_container'],
        ])}
      >
        <LeftOutlined />
      </div>
    </NavLink>
  );
}

export default memo(BackToHomeButton);
