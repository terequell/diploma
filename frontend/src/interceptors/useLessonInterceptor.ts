import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateType } from 'redux/store';

const LESSON_PATHS = ['/results', '/results/details'];

export function useLessonInterceptor(): void {
  const history = useHistory();
  const mountedRef = useRef<boolean>(true);

  const lessonState = useSelector((state: StateType) => {
    const { id } = state.lesson;
    const hasCurrentLesson = id !== null;

    return {
      hasCurrentLesson,
    };
  });

  useEffect(() => {
    if (
      mountedRef.current &&
      LESSON_PATHS.includes(history.location.pathname) &&
      !lessonState.hasCurrentLesson
    ) {
      history.push('/home');
    }
  }, [history]);
}
