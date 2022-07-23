import { UI_SIZE_PROP } from '@components/base';
import type { ExtractPropTypes } from 'vue';

export const tagProps = {
  type: {
    type: String,
    values: ['success', 'info', 'warning', 'danger', ''],
    default: ''
  },
  size: UI_SIZE_PROP,
  color: String,
  closable: Boolean,
  outline: Boolean
};

export type TagProp = ExtractPropTypes<typeof tagProps>;

export const tagEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
  click: (evt: MouseEvent) => evt instanceof MouseEvent
};

export type TagEmits = typeof tagEmits;
