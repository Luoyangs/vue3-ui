import { defineComponent, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Portal from './portal';
import raf from '@utils/raf';
import { canUseDom } from '@utils/dom';
import { isFunction } from '@utils/helper';
import ScrollLocker from '@utils/scroll-locker';
import { getContainer as getPortalContainer } from '@utils/dom';
import type { PropType } from 'vue';

let openCount = 0;
const supportDom = canUseDom();
export type GetContainer = string | HTMLElement | (() => HTMLElement);
const getParent = (getContainer: GetContainer): HTMLElement | undefined => {
  if (!supportDom) {
    return undefined;
  }

  if (getContainer) {
    if (typeof getContainer === 'string') {
      return document.querySelectorAll(getContainer)[0] as HTMLElement;
    }

    if (typeof getContainer === 'function') {
      return getContainer();
    }

    if (typeof getContainer === 'object' && getContainer instanceof window.HTMLElement) {
      return getContainer;
    }
  }

  return document.body;
};

export default defineComponent({
  name: 'PortalWrapper',
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String,
      required: true
    },
    forceRender: {
      type: Boolean,
      default: true
    },
    getContainer: {
      type: [String, Function] as PropType<GetContainer>,
      default: 'body',
    },
    visible: Boolean,
    lockScroll: Boolean,
    disabled: Boolean
  },
  setup(props, { slots }) {
    const container = ref<Element>();
    const componentRef = ref<typeof Portal>();
    const rafId = ref<number>(0);
    const scrollLocker = new ScrollLocker(getParent(props.getContainer));

    const removeCurrentContainer = () => {
      if (container.value) {
        container.value.parentNode?.removeChild(container.value);
        container.value = undefined;
      }
    };

    const attachToParent = (force = false): boolean => {
      if (force || (container.value && !container.value.parentNode)) {
        const parent = getParent(props.getContainer);
        if (parent) {
          parent.appendChild(container.value!);
          return true;
        }

        return false;
      }

      return true;
    };

    const getContainer = () => {
      if (!supportDom) {
        return null;
      }

      if (!container.value) {
        container.value = getPortalContainer(true, `#${props.prefixCls}-container`);
        attachToParent(true);
      }

      return container.value;
    };

    const instance = getCurrentInstance();
    onMounted(() => {
      let init = false;

      watch(
        [() => props.visible, () => props.getContainer],
        ([visible, getContainer], [prevVisible, prevGetContainer]) => {
          if (supportDom && getParent(props.getContainer) === document.body) {
            if (visible && !prevVisible) {
              openCount += 1;
            } else if (init) {
              openCount -= 1;
            }
          }

          if (init) {
            const getContainerIsFunc = isFunction(getContainer) && isFunction(prevGetContainer);
            if (
              getContainerIsFunc
                ? getContainer.toString() !== prevGetContainer.toString()
                : getContainer !== prevGetContainer
            ) {
              removeCurrentContainer();
            }

            if (
              props.lockScroll &&
              visible &&
              visible !== prevVisible &&
              supportDom &&
              getParent(getContainer) !== scrollLocker.getContainer()
            ) {
              scrollLocker.reLock(getParent(getContainer));
            }
          }

          init = true;
        },
        { immediate: true, flush: 'post' }
      );

      nextTick(() => {
        if (!attachToParent()) {
          rafId.value = raf(() => {
            instance?.update();
          });
        }
      });
    });

    onBeforeUnmount(() => {
      const { visible, getContainer } = props;

      if (supportDom && getParent(getContainer) === document.body) {
        openCount = visible && openCount ? openCount - 1 : openCount;
      }

      removeCurrentContainer();
      raf.cancel(rafId.value);
    });

    return () => {
      let portal = null;
      const { forceRender, visible, disabled, lockScroll } = props;

      if (forceRender || visible || componentRef.value) {
        const childProps = {
          getOpenCount: () => openCount,
          getContainer
        };
        if (lockScroll) {
          Object.assign(childProps, { scrollLocker });
        }
        portal = <Portal ref={componentRef} disabled={disabled} getContainer={getContainer} v-slots={{ default: () => slots.default?.(childProps) }} />;
      }

      return portal;
    };
  }
});
