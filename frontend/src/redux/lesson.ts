/* eslint-disable import/no-cycle */
import { ExerciseType } from 'constants/lesson';
import { getNewLesson } from 'data/lessonProvider';
import { TypeLesson } from 'types';
import { BaseThunkType, InferActionsTypes } from './store';

type ActionsType = ReturnType<InferActionsTypes<typeof actions>>;
type ThunkType = BaseThunkType<ActionsType>;

const SET_LESSON = 'lesson/SET_LESSON';

export const actions = {
  setLesson: (lessonData: TypeLesson) =>
    ({ type: SET_LESSON, lessonData } as const),
};

export function getLesson(): ThunkType {
  return async (dispatch) => {
    const lessonData = await getNewLesson();

    if (lessonData) {
      dispatch(actions.setLesson(lessonData));
    }
  };
}

type TypeInitialState = {
  id: number | null;
  difficulty_level: number | null;
  words: {
    russian_wording: string;
    english_wording: string;
    exercise_type: ExerciseType;
    isRightAnswered: boolean | null;
  }[];
  currentWordIndex: number;
};

const initialState: TypeInitialState = {
  id: null,
  difficulty_level: null,
  words: [],
  currentWordIndex: 0,
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
      };
    default:
      return { ...state };
  }
}

export default lessonReducer;
