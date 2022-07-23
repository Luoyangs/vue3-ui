import type { CSSProperties, TransitionProps } from 'vue';

/**
 * scroll animation: ease-in-out
 * @param el 滚动的元素
 * @param direction 滚动方向
 * @param scrollTo 将要滚动的距离
 * @param duration 时间间距
 * @returns void
 */
export const scrollAnimation = (params: {
  el: HTMLElement;
  direction: 'vertical' | 'horizontal';
  scrollTo: number;
  duration: number;
}): void => {
  const { el, direction, scrollTo, duration } = params;
  const scrollAttr = direction === 'horizontal' ? 'scrollLeft' : 'scrollTop';
  const minInterval = 15;
  if (duration < minInterval) {
    el[scrollAttr] = scrollTo;
    return;
  }

  const scrollOffset = el[scrollAttr];
  const scrollHeight = scrollTo - scrollOffset;
  const cosParameter = scrollHeight / 2;
  const step = Math.floor(duration / minInterval);

  let count = 0;
  let margin = 0;
  const scrollInterval = window.setInterval(() => {
    if (count < step) {
      count++;
      margin = cosParameter * (1 - Math.cos(Math.PI * (count / step)));

      if (Math.abs(scrollTo - scrollOffset) < Math.abs(margin)) {
        el[scrollAttr] = scrollOffset;
      } else {
        el[scrollAttr] = screenTop + margin;
      }
    } else {
      clearInterval(scrollInterval);
    }
  }, minInterval);
};

export const getTransitionProps = (transitionName?: string, opt: TransitionProps = {}): TransitionProps => {
  return transitionName
    ? {
        name: transitionName,
        appear: true,
        enterFromClass: `${transitionName}-enter ${transitionName}-enter-prepare`,
        enterActiveClass: `${transitionName}-enter ${transitionName}-enter-prepare`,
        enterToClass: `${transitionName}-enter ${transitionName}-enter-active`,
        leaveFromClass: ` ${transitionName}-leave`,
        leaveActiveClass: `${transitionName}-leave`,
        leaveToClass: `${transitionName}-leave ${transitionName}-leave-active`,
        ...opt
      }
    : { css: false, ...opt };
};

export const canUseDom = (): boolean =>
  !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Easy to set element style, return previous style
 * IE browser compatible(IE browser doesn't merge overflow style, need to set it separately)
 * https://github.com/ant-design/ant-design/issues/19393
 *
 */
export const setStyle = (style: CSSProperties, element: HTMLElement = document.body): CSSProperties => {
  const oldStyle: CSSProperties = {};
  const styleKeys = Object.keys(style);

  styleKeys.forEach((key) => {
    oldStyle[key] = element.style[key];
  });

  styleKeys.forEach((key) => {
    element.style[key] = style[key];
  });

  return oldStyle;
};

const getScroll = (w: Window, top?: boolean): number => {
  let ret = top ? w.pageYOffset : w.pageXOffset;
  if (typeof ret !== 'number') {
    const d = w.document.documentElement;
    ret = top ? d.scrollTop : d.scrollLeft;
    if (typeof ret !== 'number') {
      const body = w.document.body;
      ret = top ? body.scrollTop : body.scrollLeft;
    }
  }

  return ret;
};

type CompatibleDocument = {
  parentWindow?: Window;
} & Document;

export const offset = (e: Element): { top: number; left: number } => {
  const rect = e.getBoundingClientRect();
  const pos = {
    top: rect.top,
    left: rect.left
  };
  const doc = e.ownerDocument as CompatibleDocument;
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w!);
  pos.top += getScroll(w!, true);

  return pos;
};

export function getContainer(appendToBody: boolean, id: string) {
  if (!appendToBody) {
    return document.body;
  }

  let container = document.querySelector(id);
  if (container) {
    return container;
  }

  container = document.createElement('div');
  container.setAttribute('id', id.slice(1));
  document.body.appendChild(container);
  return container;
}
