/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import axios, { AxiosInstance } from 'axios';
import { API_URL, RequestStatus, Tokens } from 'constants/network';

function createSession(data: any): void {
  const accessToken = data.tokens?.accessToken ?? null;
  const refreshToken = data.tokens?.refreshToken ?? null;

  saveTokens({ accessToken, refreshToken });
}

function getToken(key: Tokens): string | null {
  return localStorage.getItem(key);
}

function saveTokens({ accessToken, refreshToken }: any): void {
  if (accessToken) {
    localStorage.setItem(Tokens.ACCESS_TOKEN, accessToken);
  }
  if (refreshToken) {
    localStorage.setItem(Tokens.REFRESH_TOKEN, refreshToken);
  }
}

function destroyTokens(): void {
  localStorage.removeItem(Tokens.ACCESS_TOKEN);
  localStorage.removeItem(Tokens.REFRESH_TOKEN);
}

function getAccessToken(): string {
  return `Bearer ${getToken(Tokens.ACCESS_TOKEN)}`;
}

function createAxiosRequestInterceptor(axiosInstance: any): any {
  axiosInstance.interceptors.request.use((config: any) => {
    config.headers.Authorization = getAccessToken();

    return config;
  });
}

function createAxiosResponseInterceptor(axiosInstance: any): void {
  const interceptor = axiosInstance.interceptors.response.use(
    (response: any) => {
      if (response.data) {
        createSession(response.data);
      }

      return response;
    },
    (error: any) => {
      const { config: sourceConfig, response = {} } = error;

      if (response.status === RequestStatus.UNAUTHORIZED) {
        axiosInstance.interceptors.response.eject(interceptor);

        return refreshSession(axiosInstance, sourceConfig);
      }

      return Promise.reject(error);
    },
  );
}

function refreshSession(axiosInstance: AxiosInstance, sourceConfig: any): any {
  return axios
    .post(`${API_URL}/auth/refresh`, {
      refreshToken: getToken(Tokens.REFRESH_TOKEN),
    })
    .then((response) => {
      const { accessToken, refreshToken } = response.data;

      saveTokens({ accessToken, refreshToken });
      sourceConfig.headers.Authorization = getAccessToken();

      return axios(sourceConfig);
    })
    .catch((error) => {
      destroyTokens();
      window.location.href = '/access/logout';

      return Promise.reject(error);
    })
    .finally(() => createAxiosResponseInterceptor(axiosInstance));
}

function wrapAxios(): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  createAxiosRequestInterceptor(axiosInstance);
  createAxiosResponseInterceptor(axiosInstance);

  return axiosInstance;
}

export default wrapAxios();
