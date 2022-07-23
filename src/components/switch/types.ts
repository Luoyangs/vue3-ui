import { UI_SIZE_PROP } from '@components/base';
import type { ExtractPropTypes } from 'vue';

export const switchProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  disabled: Boolean,
  activeText: String,
  inactiveText: String,
  size: UI_SIZE_PROP
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;
