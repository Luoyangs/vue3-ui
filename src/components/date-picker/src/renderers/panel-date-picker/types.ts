import type { ExtractPropTypes, PropType, ComputedRef } from 'vue';
import type { YearRange } from '@components/date-picker/src/utils';
import type { ViewType } from '@components/date-picker/types';
import type {
  ISelection,
  ISelectingRange,
  DateTableProps,
  IDateRange
} from '@components/date-picker/src/renderers/table-date/types';
import type { YearTableProps } from '@components/date-picker/src/renderers/table-year/types';
import type { MonthTableProps } from '@components/date-picker/src/renderers/table-month/types';
import type { PickerHeaderProps } from '@components/date-picker/src/renderers/picker-header/types';

export const datePickerPanelProps = {
  modelValue: {
    type: Object as PropType<IDateRange | Date>,
    default: () => ({})
  },
  type: {
    type: String as PropType<'year' | 'month' | 'week' | 'date' | 'datetime'>,
    default: 'date'
  },
  min: Date,
  max: Date,
  disabledDate: Function as PropType<(value: Date) => boolean>,
  showOverflowDate: {
    type: Boolean,
    default: true
  },
  startOfWeek: {
    type: Number,
    default: 0,
    validator: (val: number) => [0, 1, 2, 3, 4, 5, 6].includes(val)
  },
  timePickerProps: {
    // TODO:
    type: Object
  }
};

export type DatePickerPanelProps = ExtractPropTypes<typeof datePickerPanelProps>;

export interface IHook {
  showDateTable: ComputedRef<boolean>;
  showYearTable: ComputedRef<boolean>;
  showMonthTable: ComputedRef<boolean>;
  showTimePanel: ComputedRef<boolean>;
  pickerHeaderProps: ComputedRef<Partial<PickerHeaderProps>>;
  dateTableProps: ComputedRef<Partial<DateTableProps>>;
  yearTableProps: ComputedRef<YearTableProps>;
  monthTableProps: ComputedRef<MonthTableProps>;
}

export interface IState {
  year: number | null;
  month: number | null;
  selection: ISelection;
  selectingRange: ISelectingRange;
  time: Date | null;
  viewType: ViewType;
  viewHistory: ViewType[];
  yearRange: YearRange;
}
