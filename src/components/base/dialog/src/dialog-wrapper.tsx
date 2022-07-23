import { defineComponent, ref, watch } from 'vue';
import { Portal } from '@components/base/portal';
import Dialog from './dialog';
import { dialogProps } from './types';
import type { IDialogChildProps } from './types';

export default defineComponent({
  name: 'DialogWrapper',
  inheritAttrs: false,
  props: dialogProps,
  setup(props, { slots, attrs }) {
    const animatedVisible = ref<boolean>(props.visible);

    watch(
      () => props.visible,
      () => {
        if (props.visible) {
          animatedVisible.value = true;
        }
      },
      { flush: 'post' }
    );

    return () => {
      const { prefixCls, visible, getContainer, forceRender, destroyOnClose, lockScroll, afterClose } = props;
      const composeProps = {
        ...props,
        ...attrs
      };

      if (!getContainer) {
        return <Dialog {...composeProps} getOpenCount={() => 2} v-slots={slots} />;
      }

      if (!forceRender && destroyOnClose && !animatedVisible.value) {
        return null;
      }

      return (
        <Portal
          prefixCls={prefixCls!}
          visible={visible}
          lockScroll={lockScroll}
          forceRender={forceRender}
          getContainer={getContainer!}
          v-slots={{
            default: (childProps: IDialogChildProps) => (
              <Dialog
                {...composeProps}
                {...childProps}
                v-slots={slots}
                afterClose={() => {
                  afterClose?.();
                  animatedVisible.value = false;
                }}
              />
            )
          }}
        />
      );
    };
  }
});
