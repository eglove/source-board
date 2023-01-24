import { expect } from '@storybook/jest';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { within } from '@storybook/testing-library';

import Navigation from './navigation';

export default {
  title: 'Common/Navigation',
  component: Navigation,
} satisfies ComponentMeta<typeof Navigation>;

export const Main: ComponentStory<typeof Navigation> = () => {
  return <Navigation />;
};

Main.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const homeLink = await canvas.findByRole('link', {
    name: 'Home',
  });

  expect(homeLink).toBeInTheDocument();
};
