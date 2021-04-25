import React, { memo } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, notification } from 'antd';
import BackToHomeButton from 'components/BackToHomeButton';
import { register, TypeRegisterRequestResult } from 'data/authProvider';
import { fieldsTranslations } from 'translations/fields';
import { useHistory } from 'react-router-dom';
import { TypeRegistrationFormData } from './types';
import styles from './Registration.module.scss';

function Registration(): JSX.Element {
  const [form] = Form.useForm();
  const history = useHistory();

  async function handleSubmit(values: TypeRegistrationFormData): Promise<void> {
    const {
      success,
      userInfo,
      errorWording,
    }: TypeRegisterRequestResult = await register(values);

    if (success) {
      notification['success']({
        message: 'Выполнено!',
        description: `Регистрация пользователя ${userInfo?.email} успешно выполнена. Вы будете переадресованы на страницу, с которой сможете войти в свой аккаунт.`,
      });

      setTimeout(() => history.push('/login'), 1500);
    } else {
      notification['error']({
        message: 'Ошибка!',
        description:
          errorWording || `Что-то пошло не так... Попробуйте еще раз позднее.`,
      });
    }
  }

  return (
    <>
      <BackToHomeButton link="/" />
      <div className={styles['registration__container']}>
        <Form labelCol={{ span: 4 }} form={form} onFinish={handleSubmit}>
          <Form.Item
            name="username"
            label={fieldsTranslations.usernameLabel}
            rules={[
              { required: true, message: fieldsTranslations.usernameWarning },
            ]}
          >
            <Input />
          </Form.Item>
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
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default memo(Registration);
