import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { configureAxe, toHaveNoViolations } from 'jest-axe';
import { clearTestUserCookie } from 'source/tests/util';

expect.extend(toHaveNoViolations);

const axe = configureAxe({
  impactLevels: ['minor', 'moderate', 'serious', 'critical'],
});

beforeEach(() => {
  clearTestUserCookie();
});

export default {
  axe,
};
