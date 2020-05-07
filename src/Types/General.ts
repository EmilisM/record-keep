export function isString<T>(x: string | T): x is string {
  return typeof x === 'string';
}

export function isNumber<T>(x: number | T): x is number {
  return typeof x === 'number';
}
