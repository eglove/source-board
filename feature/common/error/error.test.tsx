import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import Error from 'source/feature/common/error/error';

import styles from './error.module.css';

describe('Error', () => {
  it('should have no a11y violations', async () => {
    const { container } = render(<Error errorMessage="message" />);

    const a11y = await axe(container);

    expect(a11y).toHaveNoViolations();
  });

  it('should render with the correct message', () => {
    const errorMessage = faker.lorem.sentence();
    const { getByText } = render(<Error errorMessage={errorMessage} />);

    const element = getByText(errorMessage);

    expect(element).toBeInTheDocument();
    expect(element.parentElement).toHaveClass(styles.ErrorContainer);
  });
});
