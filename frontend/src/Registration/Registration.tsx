import React, { memo } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import styles from './Registration.module.scss';

function Registration(): JSX.Element {
  const [form] = Form.useForm();

  function handleSubmit(values: any): void {
    console.log(values);
  }

  function handleReset(): void {
    console.log('lolwo');
  }

  return (
    <div className={styles['registration__container']}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="username" label="Никнейм" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Пароль" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
          <Button htmlType="button" onClick={handleReset}>
            Сброс
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default memo(Registration);
