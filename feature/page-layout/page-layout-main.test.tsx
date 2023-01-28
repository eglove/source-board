import { act, render } from '@testing-library/react';
import { PageLayoutMain } from 'source/feature/page-layout/page-layout-main';
import { expectNoA11yViolations } from 'source/tests/util';

describe('PageLayoutMain', () => {
  it('should render with children', async () => {
    const { getByText } = await act(async () => {
      const { getByText, container } = render(
        <PageLayoutMain>
          <div>Test</div>
        </PageLayoutMain>,
      );

      await expectNoA11yViolations(container);

      return { getByText };
    });

    const element = getByText('Test');

    expect(element).toBeInTheDocument();
  });
});
