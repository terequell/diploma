import React, { memo } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, notification } from 'antd';
import BackToHomeButton from 'components/BackToHomeButton';
import { fieldsTranslations } from 'translations/fields';
import { login } from 'data/userProvider';
import { TypeLoginForm } from './types';
import styles from './Login.module.scss';

function Login(): JSX.Element {
  const [form] = Form.useForm();

  async function handleSubmit(formData: TypeLoginForm): Promise<void> {
    console.log(formData);
    await login(formData);
  }

  return (
    <>
      <BackToHomeButton link="/" />
      <div className={styles['login__container']}>
        <Form labelCol={{ span: 4 }} form={form} onFinish={handleSubmit}>
          <Form.Item
            name="email"
            label={fieldsTranslations.emailLabel}
            rules={[
              {
                required: true,
                type: 'email',
                message: fieldsTranslations.emailWarning,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={fieldsTranslations.passwordLabel}
            rules={[
              { required: true, message: fieldsTranslations.passwordWarning },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default memo(Login);
