/* eslint-disable import/no-cycle */
import { getUserDetails } from 'data/userProvider';
import { TypeUserInfo } from 'types';
import { BaseThunkType, InferActionsTypes } from './store';

type ActionsType = ReturnType<InferActionsTypes<typeof actions>>;
type ThunkType = BaseThunkType<ActionsType>;

const TOGGLE_IS_LOADING = 'user/TOGGLE_IS_LOADING';
const SET_USER_INFO = 'user/SET_USER_INFO';

const actions = {
  setUserInfo: (userInfo: TypeUserInfo) =>
    ({ type: SET_USER_INFO, userInfo } as const),
  toggleIsLoading: (isLoading: boolean) =>
    ({
      type: TOGGLE_IS_LOADING,
      isLoading,
    } as const),
};

export function getUserInfo(): ThunkType {
  return async (dispatch) => {
    dispatch(actions.toggleIsLoading(true));

    const userInfo = await getUserDetails();

    if (userInfo) {
      dispatch(actions.setUserInfo(userInfo));
    }

    dispatch(actions.toggleIsLoading(false));
  };
}

type TypeInitialState = {
  username: string | null;
  email: string | null;
  difficulty_level: number | null;
  dateRegistration: string | null;
  isLoading: boolean;
};

const initialState: TypeInitialState = {
  username: null,
  email: null,
  difficulty_level: null,
  dateRegistration: null,
  isLoading: false,
};

function userReducer(
  state = initialState,
  action: ActionsType,
): TypeInitialState {
  switch (action.type) {
    case TOGGLE_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        dateRegistration: action.userInfo.dateRegistration,
        email: action.userInfo.email,
        difficulty_level: action.userInfo.difficulty_level,
        username: action.userInfo.username,
      };
    }
    default:
      return { ...state };
  }
}

export default userReducer;
