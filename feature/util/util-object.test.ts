import { faker } from '@faker-js/faker';
import { replaceAllValuesShallow } from 'source/feature/util/util-object';

describe('replaceAllValuesShallow', () => {
  it('should replace all values of an object with the correct new value', () => {
    const mock = {
      name: faker.datatype.string(),
      number: faker.datatype.number(),
      nullGuy: null,
      arrayGuy: faker.datatype.array(4),
    };

    expect(replaceAllValuesShallow(mock)).toStrictEqual({
      name: undefined,
      number: undefined,
      nullGuy: undefined,
      arrayGuy: undefined,
    });

    expect(replaceAllValuesShallow(mock, null)).toStrictEqual({
      name: null,
      number: null,
      nullGuy: null,
      arrayGuy: null,
    });

    const random = faker.lorem.word();
    expect(replaceAllValuesShallow(mock, random)).toStrictEqual({
      name: random,
      number: random,
      nullGuy: random,
      arrayGuy: random,
    });
  });
});
