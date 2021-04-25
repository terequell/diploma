import axios from 'helpers/axios';
import { TypeUserInfo } from 'types';

export type TypeUserDetailsRequestResult = {
  username: string;
  email: string;
  difficulty_level: number | null;
  dateRegistration: string;
};

export async function getUserDetails(): Promise<TypeUserInfo | null> {
  try {
    const response = await axios.get('/me');
    const userDetails = response.data;

    return userDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
}
