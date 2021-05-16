import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';
import BackToHomeButton from 'components/BackToHomeButton';
import { fieldsTranslations } from 'translations/fields';
import { login } from 'data/authProvider';
import { TypeLoginForm } from './types';
import styles from './Login.module.scss';

function Login(): JSX.Element {
  const [form] = Form.useForm();
  const history = useHistory();

  async function handleSubmit(formData: TypeLoginForm): Promise<void> {
    const { success } = await login(formData);

    if (success) {
      history.push('/home');
    }
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
