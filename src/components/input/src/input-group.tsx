import { defineComponent } from 'vue';

export default defineComponent({
  name: 'YInputGroup',
  setup(_, { slots }) {
    const defaultSlot = slots.default?.();
    return () => <div class="yoga-input__group">{defaultSlot}</div>;
  }
});
