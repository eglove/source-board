import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';

import styles from './navigation.module.css';

export default function Navigation(): JSX.Element {
  return (
    <NavigationMenu.Root className={styles.NavigationMenuRoot}>
      <NavigationMenu.List className={styles.NavigationMenuList}>
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild className={styles.NavigationMenuLink}>
            <Link href="/">Home</Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
