import { defineComponent, ref, watchEffect } from 'vue';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import Mask from './mask';
import Content, { ContentRef } from './content';
import { dialogProps } from './types';
import ScrollLocker from '@utils/scroll-locker';
import PopupManager from '@utils/popup-manager';
import type { PropType } from 'vue';
import { omit } from '@utils/helper';

export default defineComponent({
  name: 'Dialog',
  inheritAttrs: false,
  props: {
    ...omit(dialogProps, ['getContainer']),
    getOpenCount: Function as PropType<() => number>,
    scrollLocker: Object as PropType<ScrollLocker>
  },
  setup(props, { attrs, slots }) {
    const wrapRef = ref<HTMLDivElement>();
    const contentRef = ref<ContentRef>();
    const contentClicked = ref<boolean>(false);
    const onWrapClick = (e: MouseEvent) => {
      if (!props.maskCloseable) {
        return null;
      }

      if (contentClicked.value) {
        contentClicked.value = false;
      } else if (wrapRef.value === e.target) {
        props.onClose?.(e);
      }
    };

    const onContentMousedown = () => {
      contentClicked.value = true;
    };

    const onContentMouseup = () => {
      contentClicked.value = false;
    };

    const onDialogVisibleChanged = (newVisible: boolean) => {
      if (!newVisible) {
        props.afterClose?.();
      } else {
        contentRef.value?.focus();
      }
    };

    const onWrapperKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 27 || e.which === 27) { // ESC
        e.stopPropagation();
        props.onClose?.(e);
        return;
      }

      if (props.visible) {
        if (e.keyCode === 9) { // TAB
          contentRef.value?.changeActive(!e.shiftKey);
        }
      }
    };

    watchEffect(() => {
      props.scrollLocker?.unLock();
      if (props.visible) {
        props.scrollLocker?.lock();
      }
    });
    
    return () => {
      const {
        prefixCls,
        mask,
        maskStyle,
        maskProps,
        maskTransitionName,
        visible,
        zIndex,
        wrapStyle = {},
        wrapProps,
        wrapClassName,
        closeable,
        transitionName,
        onClose
      } = props;
      const finalZIndex = zIndex || PopupManager.nextZIndex();

      return (
        <div class={`${prefixCls}-root`}>
          <Mask
            prefixCls={prefixCls}
            visible={mask && visible}
            style={{
              zIndex: finalZIndex,
              ...maskStyle
            }}
            {...maskProps}
            motionName={maskTransitionName}
          />
          <div
            tabindex={-1}
            ref={wrapRef}
            onClick={onWrapClick}
            onKeydown={onWrapperKeyDown}
            class={[`${prefixCls}-wrapper`, wrapClassName]}
            style={{
              zIndex: finalZIndex,
              ...wrapStyle,
              display: !visible ? 'none' : 'unset'
            }}
            {...wrapProps}
          >
            <Content
              {...omit(props, ['scrollLocker'])}
              style={attrs.style}
              class={attrs.class}
              v-slots={slots}
              ref={contentRef}
              onMousedown={onContentMousedown}
              onMouseup={onContentMouseup}
              closeable={closeable}
              prefixCls={prefixCls}
              visible={visible}
              onClose={onClose}
              onVisibleChange={onDialogVisibleChanged}
              motionName={transitionName}
            />
          </div>
        </div>
      );
    };
  }
});
