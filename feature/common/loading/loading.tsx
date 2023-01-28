import Image from 'next/image';

import styles from './loading.module.css';

export default function Loading(): JSX.Element {
  return (
    <div className={styles.LoadingContainer}>
      <Image
        alt="Loading"
        height={50}
        src="/images/gif/source-allies-pulse.gif"
        width={50}
      />
    </div>
  );
}
