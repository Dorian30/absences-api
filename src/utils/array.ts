export const filterBy =
  <T>(fn: (arg: T) => boolean) =>
  (collection: Array<T>) =>
    collection.filter(fn);

export const mapBy =
  <T, U>(fn: (arg: T) => U) =>
  (collection: Array<T>) =>
    collection.map(fn);

export const slice =
  (from: number, to: number) =>
  <T>(collection: Array<T>) =>
    collection.slice(from, to);
