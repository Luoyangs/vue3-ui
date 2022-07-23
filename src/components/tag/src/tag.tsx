import { defineComponent, computed, CSSProperties } from 'vue';
import { CloseIcon } from '@components/base/icons';
import { tagProps, tagEmits } from '@components/tag/types';

const prefixCls = 'yoga-tag';

export default defineComponent({
  name: 'YTag',
  props: tagProps,
  emits: tagEmits,
  setup(props, { emit, slots }) {
    const className = computed(() => {
      const { size, type, closable, color, outline } = props;
      return {
        [prefixCls]: true,
        [`${prefixCls}--closable`]: closable,
        [`${prefixCls}--${type}`]: !!type,
        [`${prefixCls}--has-color`]: !!color && !outline,
        [`${prefixCls}--${size}`]: size
      };
    });

    const style = computed(() => {
      const { color, outline } = props;

      return outline ? {
        color: color,
        border: `1px solid ${color}`
      } as CSSProperties : {
        backgroundColor: color
      } as CSSProperties
    });

    const handleClose = async (event: MouseEvent) => {
      event.stopPropagation();
      emit('close', event);
    };

    const handleClick = (event: MouseEvent) => {
      emit('click', event);
    };

    return () => (
      <div
        class={className.value}
        style={style.value}
        onClick={handleClick}>
        {slots.default?.()}
        {props.closable && (
          <span class={`${prefixCls}__close`} onClick={handleClose}>
            <CloseIcon style={props.outline ? { fill: props.outline && props.color } : null} />
          </span>
        )}
      </div>
    );
  }
});