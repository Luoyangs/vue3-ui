import type { ExtractPropTypes, PropType } from 'vue';

export const pickerHeaderProps = {
  viewType: {
    type: String as PropType<'date' | 'month' | 'year'>
  },
  year: {
    type: Number,
    default: () => new Date().getFullYear()
  },
  month: {
    type: Number,
    default: () => new Date().getMonth()
  },
  yearRange: {
    type: Object as PropType<{ start: number; end: number }>,
    default: () => ({})
  },
  disabled: Boolean,
  hidePrevMonth: Boolean,
  hideNextMonth: Boolean,
  hidePrevYear: Boolean,
  hideNextYear: Boolean
};

export type PickerHeaderProps = ExtractPropTypes<typeof pickerHeaderProps>;

export type EmitType = 'month-click' | 'year-click' | 'next' | 'prev';
