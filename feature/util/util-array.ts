export function reorder<ArrayType extends unknown[]>(
  list: ArrayType,
  startIndex: number,
  endIndex: number,
): ArrayType {
  if (
    startIndex < 0 ||
    startIndex >= list.length ||
    endIndex < 0 ||
    endIndex >= list.length
  ) {
    return list;
  }

  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result as ArrayType;
}
