import { ExerciseType } from 'constants/lesson';

export type TypeLesson = {
  lessonId: number;
  difficulty_level: number;
  words: TypeLessonWord[];
};

export type TypeLessonWord = {
  russian_wording: string;
  english_wording: string;
  exercise_type: ExerciseType;
  isRightAnswered: boolean | null;
};
