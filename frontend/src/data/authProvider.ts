import { TypeRegistrationFormData } from 'components/Registration';
import { TypeLoginForm } from 'components/Login';
import axios, { destroyTokens } from 'helpers/axios';
import { StatusCode, API_URL } from 'constants/network';

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
  [StatusCode.USER_ALREADY_EXISTS]:
    'Такой пользователь уже зарегистрирован! Пожалуйста, войдите с помощью email.',
  [StatusCode.INVALID_PASSWORD]: 'Неверный логин или пароль.',
};

export async function register(
  data: TypeRegistrationFormData,
): Promise<TypeRegisterRequestResult> {
  try {
    const response = await axios.post('auth/register', data);

    if (response.data.statusCode === StatusCode.OK) {
      return {
        success: true,
        userInfo: { ...response.data.user },
      };
    }

    if (response.data.statusCode === StatusCode.USER_ALREADY_EXISTS) {
      return {
        success: false,
        errorWording: statusCodeWording[StatusCode.USER_ALREADY_EXISTS],
      };
    }

    return {
      success: false,
    };
  } catch (error) {
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
    const response = await axios.post('auth/login', data);

    if (response.data.statusCode === StatusCode.OK) {
      const { accessToken, refreshToken } = response.data.tokens;

      return {
        success: true,
        accessToken,
        refreshToken,
      };
    }

    if (response.data.statusCode === StatusCode.INVALID_PASSWORD) {
      return {
        success: false,
        errorWording: statusCodeWording[StatusCode.INVALID_PASSWORD],
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}

type TypeLogoutRequestResult = {
  success: boolean;
};

export async function logout(): Promise<TypeLogoutRequestResult> {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`);

    if (response.data.statusCode === StatusCode.OK) {
      destroyTokens();

      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
