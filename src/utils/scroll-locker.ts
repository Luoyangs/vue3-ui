import getScrollbarSize from '@utils/get-scrollbar-size';
import { setStyle } from '@utils/dom';
import type { CSSProperties } from 'vue';

interface ILock {
  target: number;
  container: HTMLElement;
}

let uuid = 0;
let locks: ILock[] = [];
const scrollingEffectClassName = 'yoga-scrolling-effect';
const scrollingEffectClassNameReg = new RegExp(`${scrollingEffectClassName}`, 'g');
const cachedStyle = new Map<Element, CSSProperties>();

export default class ScrollLocker {
  private target: number;
  private container: HTMLElement;

  constructor(container?: HTMLElement) {
    this.target = uuid++;
    this.container = container as HTMLElement;
  }

  getContainer = () => {
    return this.container;
  };

  lock = (): void => {
    if (locks.some(({ target }) => this.target === target)) {
      return;
    }

    if (locks.some(({ container }) => container === this.container)) {
      locks = [...locks, { target: this.target, container: this.container }];
      return;
    }

    let scrollbarSize = 0;
    const container = this.container || document.body;
    if (
      (container === document.body && window.innerWidth > document.documentElement.clientWidth) ||
      container.scrollHeight > container.clientHeight
    ) {
      scrollbarSize = getScrollbarSize();
    }

    cachedStyle.set(
      container,
      setStyle(
        {
          width: scrollbarSize !== 0 ? `calc(100% - ${scrollbarSize}px)` : undefined,
          overflow: 'hidden',
          overflowX: 'hidden',
          overflowY: 'hidden'
        },
        container
      )
    );

    const containerClassName = container.className;
    if (!scrollingEffectClassNameReg.test(containerClassName)) {
      const addClassName = `${containerClassName} ${scrollingEffectClassName}`;
      container.className = addClassName.trim();
    }
    locks = [...locks, { target: this.target, container: this.container }];
  };

  reLock = (container?: HTMLElement) => {
    const findLock = locks.find(({ target }) => target === this.target);
    if (findLock) {
      this.unLock();
    }

    this.container = container as HTMLElement;

    if (findLock) {
      findLock.container = container as HTMLElement;
      this.lock();
    }
  };

  unLock = () => {
    const findLock = locks.find(({ target }) => target === this.target);
    locks = locks.filter(({ target }) => target !== this.target);

    if (!findLock || locks.some(({ container }) => container === this.container)) {
      return;
    }

    const container = this.container || document.body;
    const containerClassName = container.className;

    if (!scrollingEffectClassNameReg.test(containerClassName)) {
      return;
    }

    // 将之前的style重新设置回来
    setStyle(cachedStyle.get(container) as CSSProperties, container);
    cachedStyle.delete(container);
    container.className = container.className.replace(scrollingEffectClassNameReg, '').trim();
  };
}
