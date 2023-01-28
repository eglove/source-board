import styles from './error.module.css';

type ErrorProperties = {
  errorMessage: string;
};

export default function Error({ errorMessage }: ErrorProperties): JSX.Element {
  return (
    <div className={styles.ErrorContainer}>
      <p>{errorMessage}</p>
    </div>
  );
}
