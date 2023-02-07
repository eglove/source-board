import { generateMock } from '@anatine/zod-mock';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectPreferencesView from 'source/feature/project-preferences/project-preferences-view';
import {
  expectNoA11yViolations,
  mockTrpcError,
  setTestUserCookie,
} from 'source/tests/util';

import { projectPreferenceGetForUserReturnSchema } from '../server/routers/project-preference/get-for-user';

describe('ProjectPreferences', () => {
  it('should show loading image while loading', async () => {
    const { getByRole } = render(
      <ProjectPreferencesView
        isLoading
        create={jest.fn()}
        refetch={jest.fn()}
      />,
    );

    const element = getByRole('img', {
      name: 'Loading',
    });

    expect(element).toBeInTheDocument();
  });

  it('should show the correct error message when there is an error', () => {
    const { getByText } = render(
      <ProjectPreferencesView
        create={jest.fn()}
        error={mockTrpcError()}
        isLoading={false}
        refetch={jest.fn()}
      />,
    );

    const element = getByText('Error! Failed to get preferences!');

    expect(element).toBeInTheDocument();
  });

  it('should render the correct elements with data', async () => {
    const mockData = generateMock(projectPreferenceGetForUserReturnSchema);
    const { container, getByText, getAllByRole, getByRole } = render(
      <ProjectPreferencesView
        create={jest.fn()}
        data={mockData}
        isLoading={false}
        refetch={jest.fn()}
      />,
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
    const create = jest.fn();
    const refetch = jest.fn();
    setTestUserCookie();

    const { getByRole } = render(
      <ProjectPreferencesView
        create={create}
        isLoading={false}
        refetch={refetch}
      />,
    );

    const inputElement = getByRole('textbox', {
      name: 'Add',
    }) as HTMLInputElement;
    const submitButton = getByRole('button', {
      name: 'Add',
    });

    expect(inputElement).toBeInTheDocument();

    await userEvent.type(inputElement, 'Text Input');
    expect(inputElement.value).toBe('Text Input');

    await userEvent.click(submitButton);
    expect(create).toHaveBeenCalledWith({
      name: 'Text Input',
      username: 'developer',
    });
    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
