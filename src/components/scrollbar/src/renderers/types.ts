import type { ExtractPropTypes } from 'vue';

export const barProps = {
  vertical: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 0
  }
};

export type BarProps = ExtractPropTypes<typeof barProps>;

export interface BarState {
  isThumbDrag: boolean;
  visible: boolean;
}
