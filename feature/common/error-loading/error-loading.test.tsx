import { render } from '@testing-library/react';
import React from 'react';
import { expectNoA11yViolations } from 'source/tests/util';

import ErrorLoading from './error-loading';

describe('Error Loading', () => {
  it('should render loading image if loading is true', async () => {
    const { getByRole, container } = render(
      <ErrorLoading isLoading error={undefined} errorMessage="Error" />,
    );

    const image = getByRole('img', {
      name: 'Loading',
    });

    await expectNoA11yViolations(container);
    expect(image).toBeInTheDocument();
  });

  it('should show an error message if error is defined', async () => {
    const { getByText, container } = render(
      <ErrorLoading
        error={new Error('Error!')}
        errorMessage="Error"
        isLoading={false}
      />,
    );

    const error = getByText('Error');

    await expectNoA11yViolations(container);
    expect(error).toBeInTheDocument();
  });

  it('should return null if loading is false and error is not defined', async () => {
    const { container } = render(
      <ErrorLoading errorMessage="Error" isLoading={false} />,
    );

    await expectNoA11yViolations(container);
    expect(container).toBeEmptyDOMElement();
  });
});
