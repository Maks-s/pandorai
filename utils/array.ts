export function findLast<T>(array: T[], finder: (v: T) => boolean): T | null {
  for (let i = array.length - 1; i >= 0; --i) {
    if (finder(array[i])) {
      return array[i];
    }
  }

  return null;
}
