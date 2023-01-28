import { reorder } from 'source/feature/util/util-array';

describe('UtilArray', () => {
  it('reorder an array correctly', () => {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let reordered = reorder(testArray, 0, 7);
    expect(reordered).toEqual([2, 3, 4, 5, 6, 7, 8, 1, 9, 10]);

    reordered = reorder(reordered, 8, 0);
    expect(reordered).toEqual([9, 2, 3, 4, 5, 6, 7, 8, 1, 10]);
  });

  it('should return the original array unchanged if the params are incorrect', () => {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let reordered = reorder(testArray, 0, 99);
    expect(reordered).toEqual(testArray);

    reordered = reorder(testArray, -100, 0);
    expect(reordered).toEqual(testArray);
  });
});
