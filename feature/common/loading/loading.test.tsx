import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import Loading from 'source/feature/common/loading/loading';

import styles from './loading.module.css';

describe('Loading', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<Loading />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  it('should render loading image', () => {
    const { getByRole } = render(<Loading />);

    const image = getByRole('img', {
      name: 'Loading',
    });

    expect(image).toBeInTheDocument();
    expect(image.parentElement).toHaveClass(styles.LoadingContainer);
  });
});
