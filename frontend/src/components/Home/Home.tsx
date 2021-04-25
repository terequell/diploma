import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from 'redux/store';
import { getUserInfo } from 'redux/user';
import Loader from 'components/Loader';

function Home(): JSX.Element {
  const dispatch = useDispatch();
  const currentState = useSelector((state: StateType) => {
    const { username, email, difficulty_level, dateRegistration } = state.user;

    return {
      username,
      email,
      difficulty_level,
      dateRegistration,
    };
  });
  const isLoading = useSelector((state: StateType) => state.user.isLoading);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  console.log(currentState);

  if (isLoading) {
    return <Loader />;
  }

  return <div>Home container</div>;
}

export default memo(Home);
