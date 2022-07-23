import { computed, defineComponent, ref, Transition, nextTick } from 'vue';
import { CloseIcon } from '@components/base/icons';
import { dialogProps } from './types';
import { getTransitionProps, offset } from '@utils/dom';
import type { CSSProperties, PropType } from 'vue';
import { omit } from '@utils/helper';

const sentinelStyle: CSSProperties = { width: 0, height: 0, overflow: 'hidden', outline: 'none' };
export type ContentRef = {
  focus: () => void;
  changeActive: (next: boolean) => void;
};

export default defineComponent({
  name: 'Content',
  inheritAttrs: false,
  props: {
    ...omit(dialogProps, ['getContainer']),
    motionName: String,
    onVisibleChange: Function as PropType<(visible: boolean) => void>,
    onMousedown: Function as PropType<(e: MouseEvent) => void>,
    onMouseup: Function as PropType<(e: MouseEvent) => void>
  },
  setup(props, { slots, attrs, expose }) {
    /**
     * sentinel主要用来控制在打开弹窗后，使用tab键时不会跳出弹窗
     */
    const sentinelStartRef = ref<HTMLDivElement>();
    const sentinelEndRef = ref<HTMLDivElement>();
    const dialogRef = ref<HTMLDivElement>();
    const transformOrigin = ref<string>();

    expose({
      focus: () => {
        sentinelStartRef.value?.focus();
      },
      changeActive: (next: boolean) => {
        // 当dialog打开时，activeElement仅限dialog图层内部切换
        // 否则，会导致keyboard不生效
        const { activeElement } = document;
        if (next && activeElement === sentinelEndRef.value) {
          sentinelStartRef.value?.focus();
        } else if (!next && activeElement === sentinelStartRef.value) {
          sentinelEndRef.value?.focus();
        }
      },
    });

    const contentStyle = computed(() => {
      const { height, width } = props;
      const styles: CSSProperties = {};

      if (width !== undefined) {
        styles.width = typeof width === 'number' ? `${width}px` : width;
      }
      if (height !== undefined) {
        styles.height = typeof height === 'number' ? `${height}px` : height;
      }
      if (transformOrigin.value) {
        styles.transformOrigin = transformOrigin.value;
      }

      return styles;
    });

    const onVisibleChange = (visible: boolean) => {
      props?.onVisibleChange?.(visible);
    };

    const onPrepare = () => {
      nextTick(() => {
        if (dialogRef.value) {
          const dialogOffset = offset(dialogRef.value);
          transformOrigin.value = props.mousePosition
            ? `${props.mousePosition.x - dialogOffset.left}px ${props.mousePosition.y - dialogOffset.top}px`
            : '';
        }
      });
    };

    return () => {
      const {
        prefixCls,
        footer = slots.footer?.(),
        title = slots.title?.(),
        closeable,
        closeIcon = slots.closeIcon?.(),
        bodyStyle,
        bodyProps,
        visible,
        destroyOnClose,
        motionName,
        modalRender = slots.modalRender,
        onClose,
        onMouseup,
        onMousedown
      } = props;

      let footNode = null;
      if (footer) {
        footNode = <div class={`${prefixCls}-footer`}>{footer}</div>;
      }

      let headerNode = null;
      if (title) {
        headerNode = (
          <div class={`${prefixCls}-header`}>
            <div class={`${prefixCls}-title`}>{title}</div>
          </div>
        );
      }

      let closeNode = null;
      if (closeable) {
        closeNode = (
          <div class={`${prefixCls}-close`} onClick={onClose}>
            {closeIcon || <CloseIcon class={`${prefixCls}-close-icon`} />}
          </div>
        );
      }

      const content = (
        <div class={`${prefixCls}-content`}>
          {closeNode}
          {headerNode}
          <div class={`${prefixCls}-body`} style={bodyStyle} {...bodyProps}>
            {slots.default?.()}
          </div>
          {footNode}
        </div>
      );
      const transitionProps = getTransitionProps(motionName);
      return (
        <Transition
          {...transitionProps}
          onBeforeEnter={onPrepare}
          onAfterEnter={() => onVisibleChange(true)}
          onAfterLeave={() => onVisibleChange(false)}
        >
          {visible || !destroyOnClose ? (
            <div
              {...attrs}
              ref={dialogRef}
              key="dialog-element"
              style={[contentStyle.value, attrs.style as CSSProperties]}
              class={[prefixCls, attrs.class]}
              v-show={visible}
              onMouseup={onMouseup}
              onMousedown={onMousedown}
            >
              <div tabindex={0} ref={sentinelStartRef} style={sentinelStyle} aria-hidden="true"></div>
              {modalRender ? modalRender({ originNode: content }) : content}
              <div tabindex={0} ref={sentinelEndRef} style={sentinelStyle} aria-hidden="true"></div>
            </div>
          ) : null}
        </Transition>
      );
    };
  }
});
