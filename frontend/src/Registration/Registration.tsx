import React, { memo } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import { registerUser } from './providers';
import styles from './Registration.module.scss';

const warningMessages = {
  username: 'Пожалуйста, придумайте никнейм!',
  email: 'Пожалуйста, введите корректную почту!',
  password: 'Пожалуйста, придумайте пароль!',
};

const labels = {
  username: 'Никнейм',
  email: 'E-mail',
  password: 'Пароль',
};

type TypeSubmitInfo = {
  username: string;
  email: string;
  password: string;
};

function Registration(): JSX.Element {
  const [form] = Form.useForm();

  function handleSubmit(values: TypeSubmitInfo): void {
    registerUser(values);
  }

  return (
    <div className={styles['registration__container']}>
      <Form labelCol={{ span: 4 }} form={form} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          label={labels.username}
          rules={[{ required: true, message: warningMessages.username }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label={labels.email}
          rules={[
            {
              required: true,
              type: 'email',
              message: warningMessages.email,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={labels.password}
          rules={[{ required: true, message: warningMessages.password }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default memo(Registration);
