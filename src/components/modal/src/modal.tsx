import { defineComponent, Fragment } from 'vue';
import { modalProps } from '@components/modal/types';
import { Button } from '@components/button';
import { Dialog } from '@components/base/dialog';
import { canUseDom } from '@utils/dom';

export const destroyFns: any[] = [];

const sizeMap: Record<string, number> = {
  small: 420,
  large: 680,
}

let mousePosition: { x: number; y: number } | null = null;
const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY
  };
  setTimeout(() => (mousePosition = null), 100);
};

if (canUseDom()) {
  document.documentElement.addEventListener('click', getClickPosition);
}

export default defineComponent({
  name: 'YModal',
  inheritAttrs: false,
  props: modalProps,
  setup(props, { emit, attrs, slots }) {
    const handleConfirm = (e: MouseEvent) => {
      emit('confirm', e);
    };
    const handleCancel = (e: Event) => {
      emit('update:visible', false);
      emit('cancel', e);
    };
    const handleClose = (e: Event) => {
      emit('update:visible', false);
      emit('close', e);
    };

    const renderFooter = () => {
      const { showCancel, showConfirm, confirmText, confirmButtonProps, cancelText, cancelButtonProps } = props;
      if (!showCancel && !showConfirm) {
        return null;
      }

      return (
        <Fragment>
          {showCancel && (
            <Button onClick={handleCancel} {...cancelButtonProps}>
              {cancelText}
            </Button>
          )}
          {showConfirm && (
            <Button type='primary' onClick={handleConfirm} {...confirmButtonProps}>
              {confirmText}
            </Button>
          )}
        </Fragment>
      );
    };

    return () => {
      const { size, ...restProps } = props;
      let width = props.width;
      if (size !== 'normal') {
        width = sizeMap[size];
      }
      const dialogProps = {
        ...restProps,
        ...attrs,
        onClose: restProps.onClose ?? handleClose,
      };

      return (
        <Dialog
          {...dialogProps}
          width={width}
          mousePosition={mousePosition!}
          transitionName={props.transitionName || 'zoom'}
          maskTransitionName={props.maskTransitionName || 'fade'}
          v-slots={{
            ...slots,
            default: slots.default,
            footer: slots.footer || renderFooter
          }}
        />
      );
    };
  }
});
