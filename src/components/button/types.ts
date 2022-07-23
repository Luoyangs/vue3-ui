import { UI_SIZE_PROP } from '@components/base';
import type { ExtractPropTypes, PropType, VNode } from 'vue';

export type ButtonType = 'primary' | 'secondary' | 'link';
export type ButtonNativeType = 'button' | 'reset' | 'submit';

export const buttonProps = {
  type: String as PropType<ButtonType>,
  size: UI_SIZE_PROP,
  outline: Boolean,
  disabled: Boolean,
  dashed: Boolean,
  fullWidth: Boolean,
  round: Boolean,
  circle: Boolean,
  icon: Object as PropType<JSX.Element | VNode>,
  suffixIcon: Object as PropType<JSX.Element | VNode>,
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
    validator: (value = 'button') => ['button', 'reset', 'submit'].indexOf(value) >= 0
  },
  href: String,
  target: {
    type: String,
    default: 'self'
  },
  loading: Boolean,
  tag: String,
  onClick: Function as PropType<(e: MouseEvent) => void>
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
