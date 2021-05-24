/* eslint-disable import/no-cycle */
import { ExerciseType } from 'constants/lesson';
import { getNewLesson, finishLesson } from 'data/lessonProvider';
import { TypeLesson } from 'types';
import { BaseThunkType, InferActionsTypes } from './store';

type ActionsType = ReturnType<InferActionsTypes<typeof actions>>;
type ThunkType = BaseThunkType<ActionsType>;

const SET_LESSON = 'lesson/SET_LESSON';
const SET_ANSWER = 'lesson/SET_ANSWER';
const RESET_LESSON_DATA = 'lesson/RESET_LESSON_DATA';

export const actions = {
  setLesson: (lessonData: TypeLesson) =>
    ({ type: SET_LESSON, lessonData } as const),
  setAnswer: (answer: string, isRight: boolean, id: number) =>
    ({
      type: SET_ANSWER,
      answer,
      isRight,
      id,
    } as const),
  resetLessonData: () => ({ type: RESET_LESSON_DATA } as const),
};

export function getLesson(): ThunkType {
  return async (dispatch) => {
    const lessonData = await getNewLesson();

    if (lessonData) {
      dispatch(actions.setLesson(lessonData));
    }
  };
}

export function sendResults(): ThunkType {
  return async (dispatch, getState) => {
    const lessonState = getState().lesson;
    const { id, answers } = lessonState;

    const data = {
      lessonId: id,
      answers,
    };

    await finishLesson(data);
  };
}

type TypeInitialState = {
  id: number | null;
  difficulty_level: number | null;
  words: {
    id: number;
    russian_wording: string;
    english_wording: string;
    exercise_type: ExerciseType;
  }[];
  currentWordIndex: number;
  answers: {
    wordId: number;
    index: number;
    answer: string;
    isRight: boolean;
  }[];
};

const initialState: TypeInitialState = {
  id: null,
  difficulty_level: null,
  words: [],
  currentWordIndex: 0,
  answers: [],
};

function lessonReducer(
  state = initialState,
  action: ActionsType,
): TypeInitialState {
  switch (action.type) {
    case SET_LESSON:
      return {
        ...state,
        id: action.lessonData.lessonId,
        difficulty_level: action.lessonData.difficulty_level,
        words: action.lessonData.words,
        currentWordIndex: 0,
        answers: [],
      };
    case SET_ANSWER:
      return {
        ...state,
        answers: [
          ...state.answers,
          {
            index: state.currentWordIndex,
            wordId: action.id,
            answer: action.answer,
            isRight: action.isRight,
          },
        ],
        currentWordIndex: state.currentWordIndex + 1,
      };
    case RESET_LESSON_DATA:
      return {
        ...state,
        id: null,
        difficulty_level: null,
        words: [],
        currentWordIndex: 0,
        answers: [],
      };
    default:
      return { ...state };
  }
}

export default lessonReducer;
