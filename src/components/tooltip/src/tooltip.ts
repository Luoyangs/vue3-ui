import { h, defineComponent, cloneVNode } from 'vue';
import { UPDATE_MODEL_EVENT } from '@components/base';
import { Popper } from '@components/popper';
import { getFirstValidNode } from '@utils/vnode';
import { tooltipProps } from '@components/tooltip/types';
import type { SetupContext } from 'vue';
import type { TooltipProps } from '@components/tooltip/types';

export default defineComponent({
  name: 'YTooltip',
  props: tooltipProps,
  emits: [UPDATE_MODEL_EVENT],
  setup(props: TooltipProps, { emit, slots }: SetupContext) {
    const onUpdateVisible = (value: boolean) => {
      emit(UPDATE_MODEL_EVENT, value);
    };

    return () => {
      const { content, tabindex, modelValue, ...popperProps } = props;

      return h(
        Popper,
        {
          ...popperProps,
          ref: 'popper',
          visible: modelValue,
          'onUpdate:visible': onUpdateVisible
        },
        {
          default: () => (slots.content ? slots.content() : content),
          trigger: () => {
            if (slots.default) {
              const firstNode = getFirstValidNode(slots.default(), 1);
              if (firstNode) {
                return cloneVNode(firstNode, { tabindex }, true);
              }
            }

            throw new Error('[yoga-ui]: tooltip need trigger slot');
          }
        }
      );
    };
  }
});
