import { defineComponent, ref, inject, computed } from 'vue';
import { FormItemKey } from '@components/form/types';
import { switchProps } from '@components/switch/types';
import type { SetupContext } from 'vue';
import type { FormItemContext } from '@components/form/types';
import type { SwitchProps } from '@components/switch/types';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';

const prefixCls = 'yoga-switch';

export default defineComponent({
  name: 'YSwitch',
  props: switchProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props: SwitchProps, { emit }: SetupContext) {
    const formItem = inject(FormItemKey, {} as FormItemContext);
    const selfModel = ref(false);
    const size = computed(() => formItem?.size || props.size);
    const realValue = computed(() => props.modelValue ?? selfModel.value);
    const className = computed(() => {
      return {
        [prefixCls]: true,
        [`${prefixCls}--on`]: realValue.value,
        [`${prefixCls}--off`]: !realValue.value,
        [`${prefixCls}--${size.value}`]: true,
        [`${prefixCls}--disabled`]: props.disabled
      };
    });
    const labelText = computed(() => (realValue.value ? props.activeText : props.inactiveText));
    const handleClick = () => {
      if (props.disabled) {
        return;
      }
      const value = !realValue.value;
      emit(UPDATE_MODEL_EVENT, value);
      emit(CHANGE_EVENT, value);
      selfModel.value = value;
      formItem.validate?.('change');
    };

    return () => (
      <div class={className.value} onClick={handleClick}>
        {labelText.value && <div class={`${prefixCls}__label`}>{labelText.value}</div>}
      </div>
    );
  }
});
