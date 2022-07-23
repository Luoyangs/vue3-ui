import type { ExtractPropTypes, PropType } from 'vue';

export const SCROLLBAR_KEY = 'Scrollbar';
export const SCROLLBAR_WIDTH = 20;
export const MIN_SCROLL_THUMB_WIDTH = 24;

export const scrollbarProps = {
  hidden: {
    type: Boolean,
    default: false
  },
  hoverVisible: {
    type: Boolean,
    default: false
  },
  noresize: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String as PropType<'vertical' | 'horizontal' | 'vertical,horizontal'>,
    default: 'vertical,horizontal',
    validator(value: string) {
      return ['vertical', 'horizontal', 'vertical,horizontal'].indexOf(value) >= 0;
    }
  }
};

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>;
export interface ScrollbarState {
  heightSize: number;
  widthSize: number;
}
export type EmitType = 'scroll';
