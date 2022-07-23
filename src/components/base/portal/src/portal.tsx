import { watch, Teleport, onBeforeMount, onBeforeUnmount, defineComponent } from 'vue';
import { useInjectPortal } from '@hooks/usePortal';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'Portal',
  inheritAttrs: false, // 不希望组件的根元素继承特性
  props: {
    getContainer: Function as PropType<() => any>,
    disabled: Boolean
  },
  setup(props, { slots }) {
    let isSSR = true;
    let container: HTMLElement;
    const { shouldRender } = useInjectPortal();

    onBeforeMount(() => {
      isSSR = false;

      if (shouldRender.value) {
        container = props.getContainer?.();
      }
    });

    const stopWatch = watch(shouldRender, () => {
      if (shouldRender.value && !container) {
        container = props.getContainer?.();
      }

      if (container) {
        stopWatch();
      }
    });

    onBeforeUnmount(() => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    });

    return () => {
      if (!shouldRender.value) {
        return null;
      }

      if (isSSR) {
        return slots.default?.();
      }

      return container ? <Teleport disabled={props.disabled} to={container} v-slots={slots} /> : null;
    };
  }
});
