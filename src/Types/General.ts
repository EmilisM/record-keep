export function isString<T>(x: string | T): x is string {
  return typeof x === 'string';
}
