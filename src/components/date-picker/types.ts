import { UI_SIZE_PROP } from '@components/base';
import type { ExtractPropTypes, PropType } from 'vue';
import type { Placement } from '@popperjs/core';
import type { IDateRange } from '@components/date-picker/src/renderers/table-date/types';

export const datePickerProps = {
  modelValue: {
    type: Object as PropType<IDateRange | Date>,
    default: () => ({})
  },
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date'
  },
  size: UI_SIZE_PROP,
  clearable: {
    type: Boolean,
    default: true
  },
  shortcuts: Array,
  min: [Date, Function],
  max: [Date, Function],
  disabled: Boolean,
  disabledDate: Function as PropType<(value: Date) => boolean>,
  /** 一周以周几开始，默认0表示周日，1表示周一 */
  startOfWeek: {
    type: Number,
    default: 0,
    validator: (val: number) => [0, 1, 2, 3, 4, 5, 6].includes(val)
  },
  showOverflowDate: {
    type: Boolean,
    default: true
  },
  rangeSeparator: {
    type: String,
    default: ' – '
  },
  placeholder: String,
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-start'
  },
  appendToBody: {
    type: Boolean,
    default: true
  },
  fixed: [Boolean, String],
  /** 格式化时间展示，默认使用dayjs */
  format: [Function, String] as PropType<IFormat>
};

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>;

export type ViewType = 'month' | 'year' | 'date';

export type DatePickerType =
  | 'date'
  | 'month'
  | 'year'
  | 'daterange'
  | 'monthrange'
  | 'yearrange'
  | 'week'
  | 'datetime'
  | 'datetimerange';

export type IFormat = string | ((val: IDateRange | Date) => string);
export type EmitType = 'range-input' | 'update:modelValue' | 'change';
