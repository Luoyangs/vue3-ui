import { defineComponent, computed } from 'vue';
import { CloseIcon } from '@components/base/icons';
import { tagProps, tagEmits } from '@components/tag/types';
import { useNamespace } from '@hooks/useNamespace';
import type { CSSProperties } from 'vue';

export default defineComponent({
  name: 'YTag',
  props: tagProps,
  emits: tagEmits,
  setup(props, { emit, slots }) {
    const ns = useNamespace('tag');
    const className = computed(() => {
      const { size, type, closable, color, outline } = props;
      return {
        [ns.m('closable')]: closable,
        [ns.m(type)]: !!type,
        [ns.m('has-color')]: !!color && !outline,
        [ns.m(size)]: size,
        [ns.b()]: true
      };
    });

    const style = computed(() => {
      const { color, outline } = props;

      return outline ? {
        color,
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
      <div class={className.value} style={style.value} onClick={handleClick}>
        {slots.default?.()}
        {props.closable && (
          <span class={ns.e('close')} onClick={handleClose}>
            <CloseIcon style={props.outline ? { fill: props.outline && props.color } : null} />
          </span>
        )}
      </div>
    );
  }
});