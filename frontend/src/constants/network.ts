export const API_URL = 'http://localhost:3005';

export enum RequestStatus {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
}

// try to make this enum synchronized with backend constant with similar name
export enum StatusCode {
  OK = '0',
  USER_ALREADY_EXISTS = '4',
  INVALID_PASSWORD = '5',
}

export enum Tokens {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}
