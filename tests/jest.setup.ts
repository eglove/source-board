import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { configureAxe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const axe = configureAxe({
  impactLevels: ['minor', 'moderate', 'serious', 'critical'],
});

export default {
  axe,
};
