import { defineComponent } from 'vue';
import { useNamespace } from '@hooks/useNamespace';

export default defineComponent({
  name: 'YInputGroup',
  setup(_, { slots }) {
    const ns = useNamespace('input-group');
    const defaultSlot = slots.default?.();
    return () => <div class={ns.b()}>{defaultSlot}</div>;
  }
});
