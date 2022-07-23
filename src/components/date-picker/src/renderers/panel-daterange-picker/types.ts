import type { PropType, ExtractPropTypes, ComputedRef } from 'vue';
import type { ButtonProps } from '@components/button/types';
import type { ViewType } from '@components/date-picker/types';
import type { YearRange } from '@components/date-picker/src/utils';
import type { MonthTableProps } from '@components/date-picker/src/renderers/table-month/types';
import type { YearTableProps } from '@components/date-picker/src/renderers/table-year/types';
import type { PickerHeaderProps } from '@components/date-picker/src/renderers/picker-header/types';
import type {
  IDateRange,
  DateTableProps,
  ISelection,
  ISelectingRange
} from '@components/date-picker/src/renderers/table-date/types';

export const datarangePickerProps = {
  modelValue: {
    type: Object as PropType<IDateRange>,
    default: () => ({})
  },
  type: {
    type: String as PropType<'year' | 'month' | 'yearrange' | 'monthrange' | 'week' | 'date' | 'datetime'>,
    default: 'date'
  },
  min: [Date, Function],
  max: [Date, Function],
  disabledDate: Function as PropType<(value: Date) => boolean>,
  disabled: Boolean,
  showOverflowDate: {
    type: Boolean,
    default: true
  },
  startOfWeek: {
    type: Number,
    default: 0,
    validator: (val: number) => [0, 1, 2, 3, 4, 5, 6].includes(val)
  },
  fixed: {
    type: [Boolean, String] as PropType<boolean | 'start' | 'end'>,
    default: false,
    validator(value = false) {
      return [false, 'start', 'end'].indexOf(value) >= 0;
    }
  },
  timePickerProps: Object
};

export type DaterangePickerPanelProp = ExtractPropTypes<typeof datarangePickerProps>;

export interface IDatePanel {
  viewType: ViewType;
  viewHistory: ViewType[];
  time: Date;
  year: number;
  month: number;
  yearRange: YearRange;
}

export interface IState {
  selection: ISelection;
  selectingRange: ISelectingRange;
  left: IDatePanel;
  right: IDatePanel;
  fixedStartDate?: Date;
}

export interface IHook {
  confirmBtnProps: ComputedRef<Partial<ButtonProps>>;
  // picker header props
  leftHeaderProps: ComputedRef<Partial<PickerHeaderProps>>;
  rightHeaderProps: ComputedRef<Partial<PickerHeaderProps>>;
  // date table props
  leftDateTableProps: ComputedRef<Partial<DateTableProps>>;
  rightDateTableProps: ComputedRef<Partial<DateTableProps>>;
  // year table props
  leftYearTableProps: ComputedRef<YearTableProps>;
  rightYearTableProps: ComputedRef<YearTableProps>;
  // month table props
  leftMonthTableProps: ComputedRef<MonthTableProps>;
  rightMonthTableProps: ComputedRef<MonthTableProps>;
  // 是否展示date table
  showLeftDateTable: ComputedRef<boolean>;
  showRightDateTable: ComputedRef<boolean>;
  // 是否展示year table
  showLeftYearTable: ComputedRef<boolean>;
  showRightYearTable: ComputedRef<boolean>;
  // 是否展示month table
  showLeftMonthTable: ComputedRef<boolean>;
  showRightMonthTable: ComputedRef<boolean>;
  // 是否展示time panel
  showTimePanel: ComputedRef<boolean>;
}

export type EmitType = 'range-input' | 'update:modelValue' | 'change';
