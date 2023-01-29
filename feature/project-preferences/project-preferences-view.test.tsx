import { generateMock } from '@anatine/zod-mock';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectPreferencesView from 'source/feature/project-preferences/project-preferences-view';
import { projectPreferenceGetForUserReturnSchema } from 'source/feature/server/routers/project-preference';
import { expectNoA11yViolations, mockTrpcError } from 'source/tests/util';

describe('ProjectPreferences', () => {
  it('should show loading image while loading', () => {
    const { getByRole } = render(<ProjectPreferencesView isLoading />);

    const element = getByRole('img', {
      name: 'Loading',
    });

    expect(element).toBeInTheDocument();
  });

  it('should show the correct error message when there is an error', () => {
    const { getByText } = render(
      <ProjectPreferencesView error={mockTrpcError()} isLoading={false} />,
    );

    const element = getByText('Error! Failed to get preferences!');

    expect(element).toBeInTheDocument();
  });

  it('should render the correct elements with data', async () => {
    const mockData = generateMock(projectPreferenceGetForUserReturnSchema);
    const { container, getByText, getAllByRole, getByRole } = render(
      <ProjectPreferencesView data={mockData} isLoading={false} />,
    );

    await expectNoA11yViolations(container);

    const heading = getByText('Project Preferences');

    expect(heading).toBeInTheDocument();

    const button = getByRole('button', {
      name: 'Add',
    });
    expect(button).toBeInTheDocument();

    const items = getAllByRole('listitem');

    expect(items).toHaveLength(mockData.length);
    expect(items[0]).toHaveTextContent(mockData[0].name);
  });

  it('should be able to fill out form and submit', async () => {
    const { getByRole } = render(<ProjectPreferencesView isLoading={false} />);

    const inputElement = getByRole('textbox', {
      name: 'Add',
    }) as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();

    await userEvent.type(inputElement, 'Text Input');
    expect(inputElement.value).toBe('Text Input');
  });
});
