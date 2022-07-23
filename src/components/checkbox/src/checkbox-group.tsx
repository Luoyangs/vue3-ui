import { toRefs, inject, provide, reactive, computed, defineComponent } from 'vue';
import mitt from 'mitt';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import { FormItemKey } from '@components/form/types';
import { checkboxGroupProps, CheckboxGroupKey } from '@components/checkbox/types';
import type { SetupContext } from 'vue';
import type { FormItemContext } from '@components/form/types';
import type { CheckboxGroupProps, CheckboxGroupMittEvent, IModelType } from '@components/checkbox/types';
import { useNamespace } from '@hooks/useNamespace';

export default defineComponent({
  name: 'YCheckboxGroup',
  props: checkboxGroupProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props: CheckboxGroupProps, { emit, slots }: SetupContext) {
    const ns = useNamespace('checkbox-group');
    const checkboxGroupMitt = mitt<CheckboxGroupMittEvent>();
    const formItem = inject(FormItemKey, {} as FormItemContext);
    const computedSize = computed(() => formItem?.size || props.size);
    const className = computed(() => {
      return [
        ns.b(),
        ns.m(computedSize.value),
        { [ns.m('vertical')]: props.vertical },
        { [ns.m(props.type)]: props.type },
        { [ns.m('disabled')]: props.disabled },
      ];
    });
    const changeEvent = ({ key, value }: { key: IModelType; value: boolean }) => {
      let newValue: IModelType[] = [];
      if (value) {
        if (!props.modelValue.includes(key)) {
          newValue = props.modelValue.concat(key);
        }
      } else {
        newValue = props.modelValue.filter((item) => item !== key);
      }

      emit(UPDATE_MODEL_EVENT, newValue);
      if (newValue !== props.modelValue) {
        emit(CHANGE_EVENT, newValue);
        formItem.validate?.(CHANGE_EVENT);
      }
    };
    provide(
      CheckboxGroupKey,
      reactive({
        name: CheckboxGroupKey,
        ...toRefs(props),
        changeEvent
      })
    );
    checkboxGroupMitt.on('checkboxChange', changeEvent);

    return () => <div class={className.value}>{slots.default?.()}</div>;
  }
});
