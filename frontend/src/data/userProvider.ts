import axios from 'helpers/axios';
import { TypeUserInfo, TypeWordLearned } from 'types';

export type TypeUserDetailsRequestResult = {
  username: string;
  email: string;
  difficulty_level: number | null;
  dateRegistration: string;
  lessonsFinishedCount: number;
  wordsLearned: TypeWordLearned[];
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
