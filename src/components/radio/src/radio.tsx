import { defineComponent, computed } from 'vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import { radioProps } from '@components/radio/types';
import { useNamespace } from '@hooks/useNamespace';
import useRadio from '@components/radio/src/use-radio';
import type { SetupContext } from 'vue';
import type { RadioProps } from '@components/radio/types';

export default defineComponent({
  name: 'YRadio',
  props: radioProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup: (props: RadioProps, { slots }: SetupContext) => {
    const ns = useNamespace('radio');
    const { isDisabled, checkedValue, handleValueChange } = useRadio(props);
    const radioClass = computed(() => {
      return {
        [ns.b()]: true,
        [ns.m('disabled')]: isDisabled.value,
        [ns.m('checked')]: checkedValue.value,
      };
    });

    return () => (
      <label id={props.name} class={radioClass.value}>
        <input
          type="radio"
          class={ns.e('input')}
          name={props.name}
          value={props.value}
          checked={checkedValue.value}
          disabled={isDisabled.value}
          onChange={handleValueChange}
        />
        <span class={ns.e('indicator')}></span>
        {slots.default && <span class={ns.e('label')}>{slots.default?.()}</span>}
      </label>
    );
  }
});
