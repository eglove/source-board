import Error from 'source/feature/common/error/error';
import Loading from 'source/feature/common/loading/loading';

type ErrorLoadingProperties = {
  isLoading: boolean;
  error?: unknown;
  errorMessage: string;
};

export default function ErrorLoading({
  errorMessage,
  isLoading,
  error,
}: ErrorLoadingProperties): JSX.Element | null {
  if (isLoading) {
    return <Loading />;
  }

  if (error !== undefined) {
    return <Error errorMessage={errorMessage} />;
  }

  return null;
}
