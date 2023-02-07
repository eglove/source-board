import { act, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Navigation from 'source/feature/navigation/navigation';
import { setTestUserCookie } from 'source/tests/util';

describe('Navigation', () => {
  it('should have no a11y violations', async () => {
    let a11y;

    await act(async () => {
      const { container } = render(<Navigation />);

      a11y = await axe(container);
    });

    expect(a11y).toHaveNoViolations();
  });

  it('should render navigation', () => {
    setTestUserCookie();

    const { getByRole } = render(<Navigation />);

    const links = [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: 'Project Preferences',
        path: '/developer/project-preferences',
      },
    ];

    for (const link of links) {
      const element = getByRole('link', {
        name: link.name,
      });
      const href = element.getAttribute('href');

      expect(element).toBeInTheDocument();
      expect(href).not.toBeNull();
      expect(new URL(href ?? '').pathname).toBe(link.path);
    }
  });
});
