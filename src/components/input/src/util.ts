import { TEXTAREA_MIN_ROW } from '@components/input/types';

export function lengthOf(str: string): number {
  if (typeof str === 'number' || typeof str === 'string') {
    const reg = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    return String(str).replace(reg, ' ').length;
  }

  return 0;
}

export function sliceStr(str: number | string, min: number, max: number): string {
  if (typeof str === 'number' || typeof str === 'string') {
    if (!String(str).length) {
      return '';
    }

    // eslint-disable-next-line no-control-regex
    const reg = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u0000-\uFFFF]/g;
    const matched = String(str).match(reg);
    if (matched) {
      return matched.slice(min, max).join('');
    }
  }

  return '';
}

/**
 * 直接截取value到指定的精度
 * @param {number} value
 * @param {number} precision
 */
export function valueToFixed(value: string | number, precision: number): string {
  // 是否是正数
  const isPositive = +value >= 0;
  // 转成字符串
  let newValue = value + '';
  // 去掉正负号，统一按照正数来处理，最后再加上符号
  newValue = newValue.replace(/^(?:-|\+)/gi, '');

  // 小数点过大
  if (precision > 20 || precision < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }

  // 如果是简写如.11则整数位补0，变成0.11
  if (/^\./gi.test(newValue)) {
    newValue = '0' + newValue;
  }

  // 非数字
  if (!/^\d+\.?\d*$/gi.test(newValue)) {
    return isPositive || newValue === '' ? '' : '-';
  }

  const values = newValue.split('.');
  let result = '';

  // 在str后面加n个0
  const paddingZero = (str: string, n: number) => {
    for (let i = 0; i < n; i++) {
      str += '0';
    }
    return str;
  };

  // 在str后面加0，直至str的长度达到n
  // 如果超过了n，则直接截取前n个字符串
  const paddingZeroTo = (str: string, n: number) => {
    if (str.length >= n) {
      return str.substr(0, n);
    }
    return paddingZero(str, n - str.length);
  };

  // 直接就是整数
  if (values.length < 2) {
    result = values[0] + '.' + paddingZero('', precision);
  } else {
    result = values[0] + '.' + paddingZeroTo(values[1], precision);
  }

  // 如果最后一位为.,则去除
  result = result.replace(/\.$/gi, '').replace(/^\./gi, '0.');

  // 加上符号位
  return isPositive ? result : '-' + result;
}

// https://github.com/ElemeFE/element/blob/dev/packages/input/src/calcTextareaHeight.js
let hiddenTextarea: HTMLTextAreaElement | null;
const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;
const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];
interface TextareaHeight {
  minHeight?: string;
  height?: string;
}
export const calcTextareaHeight = (
  ele: HTMLTextAreaElement,
  minRows: number = TEXTAREA_MIN_ROW,
  maxRows: number | null = null
): TextareaHeight => {
  const results: TextareaHeight = {};

  try {
    if (!hiddenTextarea) {
      hiddenTextarea = document.createElement('textarea');
      document.body.appendChild(hiddenTextarea);
    }

    const style = window.getComputedStyle(ele);
    const boxSizing = style.getPropertyValue('box-sizing');
    const paddingSize =
      parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));
    const borderSize =
      parseFloat(style.getPropertyValue('border-bottom-width')) +
      parseFloat(style.getPropertyValue('border-top-width'));
    const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(';');

    // set style
    hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
    hiddenTextarea.value = ele.value || ele.placeholder || '';

    let height = hiddenTextarea.scrollHeight;
    if (boxSizing === 'border-box') {
      height += borderSize;
    } else if (boxSizing === 'content-box') {
      height -= paddingSize;
    }

    // calc min-height
    hiddenTextarea.value = '';
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    let minHeight = singleRowHeight * minRows;

    if (boxSizing === 'border-box') {
      minHeight += paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    results.minHeight = `${minHeight}px`;

    // calc height
    if (maxRows !== null) {
      let maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight += paddingSize + borderSize;
      }

      height = Math.min(maxHeight, height);
    }
    results.height = `${height}px`;
    if (hiddenTextarea.parentNode) {
      hiddenTextarea.parentNode.removeChild(hiddenTextarea);
      hiddenTextarea = null;
    }
  } catch (error) {
    console.error(error);
  }

  return results;
};
