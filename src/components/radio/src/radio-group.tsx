import { computed, defineComponent, inject, provide, reactive, toRefs } from 'vue';
import mitt from 'mitt';
import { useNamespace } from '@hooks/useNamespace';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import { FormItemKey } from '@components/form/types';
import { radioGroupProps, RadioGroupKey } from '@components/radio/types';
import type { SetupContext } from 'vue';
import type { RadioGroupProps, RadioGroupMittEvent } from '@components/radio/types';
import type { FormItemContext } from '@components/form/types';
import '../styles/radio-group.scss';

export default defineComponent({
  name: 'YRadioGroup',
  props: radioGroupProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props: RadioGroupProps, { slots, emit }: SetupContext) {
    const ns = useNamespace('radio-group');
    const radioGroupMitt = mitt<RadioGroupMittEvent>();
    const formItem = inject(FormItemKey, {} as FormItemContext);
    const className = computed(() => {
      return {
        [ns.b()]: true,
        [ns.m(props.size)]: props.size,
        [ns.m(props.type)]: props.type,
        [ns.m('vertical')]: props.vertical,
      };
    });

    const changeEvent = (value: string | number | boolean) => {
      emit(UPDATE_MODEL_EVENT, value);
      if (value !== props.modelValue) {
        emit(CHANGE_EVENT, value);
        formItem.validate?.('change');
      }
    };
    const radioGroup = reactive({
      name: 'YRadioGroup',
      ...toRefs(props),
      changeEvent
    });
    provide(RadioGroupKey, radioGroup);

    radioGroupMitt.on('radioChange', changeEvent);

    return () => <div class={className.value}>{slots.default?.()}</div>;
  }
});
