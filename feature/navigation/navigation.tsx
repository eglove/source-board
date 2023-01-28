import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import useUser from 'source/feature/common/hooks/use-user';
import { getUrl } from 'source/feature/util/routes';

import styles from './navigation.module.css';

export default function Navigation(): JSX.Element {
  const user = useUser();

  return (
    <NavigationMenu.Root className={styles.NavigationMenuRoot}>
      <NavigationMenu.List className={styles.NavigationMenuList}>
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild className={styles.NavigationMenuLink}>
            <Link href={getUrl()}>Home</Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        {user?.isLoggedIn === true && (
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild className={styles.NavigationMenuLink}>
              <Link href={getUrl([user.username, 'project-preferences'])}>
                Project Preferences
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
