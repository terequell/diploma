import { Tokens } from 'constants/network';
import { logout as logoutRequest } from 'data/authProvider';

type TypeUseAuthHook = {
  authenticated: boolean;
  logout: () => Promise<boolean>;
};

export function useAuth(): TypeUseAuthHook {
  const accessToken = localStorage.getItem(Tokens.ACCESS_TOKEN);
  const hasAccessToken =
    typeof accessToken !== 'undefined' && accessToken !== null;

  async function logout(): Promise<boolean> {
    const { success } = await logoutRequest();

    return success;
  }

  return {
    authenticated: hasAccessToken,
    logout,
  };
}
