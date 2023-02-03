import { isDevelopment } from 'source/feature/util/constants';

// Allow any string, defined strings are IDE suggestions.
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
type Paths = string | 'project-preferences';

export const baseUrl = isDevelopment
  ? 'http://localhost:3000'
  : 'http://localhost:3000';

export function getUrl(
  paths?: Paths[],
  parameters?: Array<{ name: string; value: string }>,
  base = baseUrl,
): string {
  let url = new URL(base).toString();

  if (!url.endsWith('/')) {
    url = `${url}/`;
  }

  if (paths !== undefined) {
    for (const path of paths) {
      url = new URL(`${url}${path}/`).toString();
    }
  }

  const urlObject = new URL(url);
  if (parameters !== undefined) {
    for (const parameter of parameters) {
      urlObject.searchParams.set(parameter.name, parameter.value);
    }
  }

  return urlObject.toString();
}
