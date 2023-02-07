import { parseCookies } from 'nookies';

type UseUserReturn = {
  isLoggedIn: boolean;
  username: string | undefined;
};

export default function useUser(): UseUserReturn {
  const { username, expires } = parseCookies();

  return {
    isLoggedIn:
      username !== undefined && new Date(expires).getTime() > Date.now(),
    username,
  };
}
