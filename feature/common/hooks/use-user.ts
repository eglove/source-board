import useIsLoggedIn from 'source/feature/common/hooks/use-is-logged-in';

type UseUserReturn =
  | {
      isLoggedIn: boolean;
      username: string;
    }
  | undefined;

export default function useUser(): UseUserReturn {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return {
      isLoggedIn,
      username: 'developer',
    };
  }
}
