import { computed, defineComponent } from 'vue';
import type { PropType, CSSProperties } from 'vue';

const prefixCls = 'yoga-select-option'

export default defineComponent({
  name: 'YOption',
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: Number,
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    disabled: Boolean,
    selected: Boolean,
    created: Boolean,
    hovering: Boolean,
  },
  emits: ['hover', 'select'],
  setup(props, { emit, slots }) {
    const className = computed(() => {
      const { disabled, selected, created, hovering } = props;
      return {
        [prefixCls]: true,
        disabled: disabled,
        selected: selected,
        created: created,
        hovering: hovering,
      };
    });

    const handleHoverItem = () => {
      if (!props.disabled) {
        emit('hover', props.index);
      }
    };
    const handleChecked = (e: MouseEvent) => {
      e.stopPropagation();
      if (!props.disabled) {
        emit('select', props.item, props.index);
      }
    };

    return () => {
      const { style, item } = props;
      return (
        <div
          class={className.value}
          style={style}
          onMouseenter={handleHoverItem}
          onClick={handleChecked}
          v-slots={{
            default: ({ item, index, disabled }: any) => slots.default?.(item, index, disabled)
          }}>
          <span>{item.label}</span>
        </div>
      );
    };
  }
})