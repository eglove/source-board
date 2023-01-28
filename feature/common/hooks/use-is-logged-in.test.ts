import { renderHook } from '@testing-library/react';
import useIsLoggedIn from 'source/feature/common/hooks/use-is-logged-in';

describe('useIsLoggedIn', () => {
  it('should return true', () => {
    const { result } = renderHook(() => {
      return useIsLoggedIn();
    });

    expect(result.current).toBe(true);
  });
});
