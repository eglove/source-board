import * as Label from '@radix-ui/react-label';
import { type ProjectPreferencesData } from 'source/pages/[user]/project-preferences';

import styles from './project-preferences.module.css';

type ProjectPreferencesProperties = {
  preferences: ProjectPreferencesData['preferences'];
};

export default function ProjectPreferences({
  preferences,
}: ProjectPreferencesProperties): JSX.Element {
  return (
    <div className={styles.Container}>
      <h1>Project Preferences</h1>
      <form>
        <input className={styles.Input} id="addPreference" type="text" />
        <Label.Root className={styles.LabelRoot} htmlFor="addPreference">
          <button className={styles.SubmitButton} type="submit">
            Add
          </button>
        </Label.Root>
      </form>
      <br />
      <ul>
        {preferences.map(preference => {
          return <li key={preference.id}>{preference.name}</li>;
        })}
      </ul>
    </div>
  );
}
