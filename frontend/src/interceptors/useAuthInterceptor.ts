import { useAuth } from 'hooks';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from 'data/authProvider';

const PUBLIC_PATHS = ['/', '/register', '/login'];

export function useAuthInterceptor(): void {
  const { authenticated } = useAuth();
  const history = useHistory();
  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    if (
      authenticated &&
      mountedRef.current &&
      PUBLIC_PATHS.includes(history.location.pathname)
    ) {
      history.push('/home');
    }

    if (
      !authenticated &&
      mountedRef.current &&
      !PUBLIC_PATHS.includes(history.location.pathname)
    ) {
      history.push('/');

      logout();
    }
  }, [authenticated, history]);
}
