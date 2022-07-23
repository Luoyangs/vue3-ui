import { popperProps, Theme } from '@components/popper/types';
import type { ExtractPropTypes, PropType } from 'vue';
import type { Placement } from '@popperjs/core';

export const tooltipProps = {
  ...popperProps,
  modelValue: {
    type: Boolean,
    default: undefined,
    validator: (value: boolean) => typeof value === 'boolean'
  },
  tabindex: {
    type: [Number, String],
    default: '0'
  },
  showArrow: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'top'
  },
  theme: {
    type: String as PropType<Theme>,
    default: Theme.DARK
  }
};

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>;
