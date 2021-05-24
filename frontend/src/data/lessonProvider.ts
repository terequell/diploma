import axios from 'helpers/axios';
import { ExerciseType } from 'constants/lesson';

export type TypeGetNewLessonRequestResult = {
  lessonId: number;
  difficulty_level: number;
  words: {
    id: number;
    russian_wording: string;
    english_wording: string;
    exercise_type: ExerciseType;
    isRightAnswered: boolean | null;
  }[];
};

export async function getNewLesson(): Promise<TypeGetNewLessonRequestResult | null> {
  try {
    const response = await axios.post('/lesson/create');

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function finishLesson(data: {
  lessonId: number | null;
  answers: {
    wordId: number;
    index: number;
    answer: string;
    isRight: boolean;
  }[];
}): Promise<void | null> {
  try {
    const res = await axios.post('lesson/finish', data);
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
