import { defineComponent } from 'vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import { checkboxProps } from '@components/checkbox/types';
import { useCheckbox } from '@components/checkbox/src/use-checkbox';
import type { CheckboxProps } from '@components/checkbox/types';
import { useNamespace } from '@hooks/useNamespace';

export default defineComponent({
  name: 'YCheckbox',
  props: checkboxProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props: CheckboxProps, { slots }) {
    const ns = useNamespace('checkbox');
    const {
      labelRef,
      isDisabled,
      labelStyles,
      checkedValue,
      checkboxClass,
      fixedLabelStyle,
      handleValueChange
    } = useCheckbox(props);

    return () => (
      <label class={checkboxClass.value}>
        <input
          type="checkbox"
          class={ns.e('input')}
          name={props.name}
          value={props.value}
          checked={!!checkedValue.value}
          disabled={isDisabled.value}
          onChange={handleValueChange}
        />
        <span class={ns.e('indicator')} />
        {slots.default && (
          <span
            ref={labelRef}
            class={ns.e('label')}
            style={[fixedLabelStyle.value, labelStyles.value]}>
            {slots.default?.()}
          </span>
        )}
      </label>
    );
  }
});
