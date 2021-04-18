import { TypeRegistrationFormData } from 'components/Registration';
import { TypeLoginForm } from 'components/Login';
import { STATUS_CODES } from 'constants/network';
import api from 'API';

export type TypeRegisterRequestResult = {
  success: boolean;
  userInfo?: {
    username: string;
    email: string;
    difficulty_level: string | number;
  };
  errorWording?: string;
};

const statusCodeWording = {
  [STATUS_CODES.USER_ALREADY_EXISTS]:
    'Такой пользователь уже зарегистрирован! Пожалуйста, войдите с помощью email.',
  [STATUS_CODES.INVALID_PASSWORD]: 'Неверный логин или пароль.',
};

export async function register(
  data: TypeRegistrationFormData,
): Promise<TypeRegisterRequestResult> {
  try {
    const response = await api.post('auth/register', data);

    if (response.data.statusCode === STATUS_CODES.OK) {
      return {
        success: true,
        userInfo: { ...response.data.user },
      };
    }

    if (response.data.statusCode === STATUS_CODES.USER_ALREADY_EXISTS) {
      return {
        success: false,
        errorWording: statusCodeWording[STATUS_CODES.USER_ALREADY_EXISTS],
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
}

type TypeLoginRequestResult = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  errorWording?: string;
};

export async function login(
  data: TypeLoginForm,
): Promise<TypeLoginRequestResult> {
  try {
    const response = await api.post('auth/login', data);
    console.log(response);

    if (response.data.statusCode === STATUS_CODES.OK) {
      const { accessToken, refreshToken } = response.data.tokens;

      return {
        success: true,
        accessToken,
        refreshToken,
      };
    }

    if (response.data.statusCode === STATUS_CODES.INVALID_PASSWORD) {
      return {
        success: false,
        errorWording: statusCodeWording[STATUS_CODES.INVALID_PASSWORD],
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
}
