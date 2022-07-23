import { isPlainObject, isObject, isArray, isFunction, NOOP, toTypeString, isString, toRawType } from '@vue/shared';

export { isArray, isPlainObject, isObject, isFunction, isString, NOOP, toTypeString };
/**
 * whether the object is a Regular Expression
 * @param {Object} object the given object
 * @return {Boolean}
 */
export function isRegExp(value: string): boolean {
  return toTypeString(value) === '[object RegExp]';
}
export const isServer = typeof window === 'undefined';
export const isBool = (val: unknown): boolean => typeof val === 'boolean';
export const isNumber = (val: unknown): boolean => typeof val === 'number';
export const isHTMLElement = (val: unknown): boolean => toRawType(val).startsWith('HTML');

/**
 * 判断传入的日期是否是合法的
 * @param val Date
 * @returns boolean
 */
export const isValidDate = (val: Date): boolean =>
  toTypeString(val) === '[object Date]' && val.toString() !== 'Invalid Date';

/**
 * return a debounced version of the function
 * @param fn
 * @param delay
 */
export function debounce(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any[]) => unknown,
  delay: number
): typeof fn {
  let timerId: ReturnType<typeof setTimeout> | null;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flatten<T>(list: any[]): T[] {
  return list.reduce((a, b) => a.concat(isArray(b) ? flatten(b) : b), []);
}

export function omit<T extends object, K extends keyof T>(obj: T, fields: K[]): Omit<T, K> {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}
