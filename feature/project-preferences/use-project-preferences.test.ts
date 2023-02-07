import { act, renderHook } from '@testing-library/react';
import { type FormEvent } from 'react';
import { useProjectPreferences } from 'source/feature/project-preferences/use-project-preferences';
import { setTestUserCookie } from 'source/tests/util';

describe('useProjectPreferences', () => {
  it('should run create on submit', () => {
    const create = jest.fn();
    const refetch = jest.fn();
    setTestUserCookie();

    const { result } = renderHook(() => {
      return useProjectPreferences({
        create,
        refetch,
      });
    });

    expect(result.current.formState).toStrictEqual({
      name: '',
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as FormEvent);
    });

    expect(create).toHaveBeenCalledWith({
      username: 'developer',
      name: '',
    });
  });

  it('should not call create if user is undefined', () => {
    const create = jest.fn();
    const refetch = jest.fn();

    const { result } = renderHook(() => {
      return useProjectPreferences({
        create,
        refetch,
      });
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as FormEvent);
    });

    expect(create).not.toHaveBeenCalled();
  });
});
