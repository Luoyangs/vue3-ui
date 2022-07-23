import { defineComponent, computed } from 'vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import { radioProps } from '@components/radio/types';
import useRadio from '@components/radio/src/use-radio';
import type { SetupContext } from 'vue';
import type { RadioProps } from '@components/radio/types';

const prefixCls = 'yoga-radio';

export default defineComponent({
  name: 'YRadio',
  props: radioProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup: (props: RadioProps, { slots }: SetupContext) => {
    const { isDisabled, checkedValue, handleValueChange } = useRadio(props);
    const radioClass = computed(() => {
      return [prefixCls, isDisabled.value ? 'disabled' : '', checkedValue.value ? 'checked' : ''];
    });

    return () => (
      <label id={props.name} class={radioClass.value}>
        <input
          type="radio"
          class={`${prefixCls}__input`}
          name={props.name}
          value={props.value}
          checked={checkedValue.value}
          disabled={isDisabled.value}
          onChange={handleValueChange}
        />
        <span class={`${prefixCls}__indicator`}></span>
        {slots.default && <span class={`${prefixCls}__label`}>{slots.default?.()}</span>}
      </label>
    );
  }
});
