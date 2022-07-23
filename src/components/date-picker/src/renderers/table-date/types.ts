import type { ExtractPropTypes, PropType } from 'vue';

export type DateCellType = 'normal' | 'current' | 'date' | 'week' | 'range' | 'last-month' | 'next-month';
export interface DateCell {
  type: DateCellType;
  date: Date;
  text: string;
  disabled: boolean;
  selected: boolean;
  isStart: boolean; // date-table的开始日期
  isEnd: boolean; // date-table的结束日期
  /** type range时使用 */
  inRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  /** 当固定range的start或end后，选定了start和end后再选日期，此时触发 */
  inSelectingRange: boolean;
  isSelectingRangeStart: boolean;
  isSelectingRangeEnd: boolean;
  isMonthStart: boolean; // 月的第一天
  isMonthEnd: boolean; // 月的最后一天
  isWeekSelection: boolean; // week picker in range
  isWeekSelecting: boolean; // week picker active
}

export interface IDateRange {
  startDate: Date;
  endDate: Date;
}

export interface ISelection {
  type: 'date' | 'week' | 'range';
  date?: Date;
  startDate?: Date;
  endDate?: Date;
}

export interface ISelectingRange {
  active?: boolean;
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  isSelecting: boolean;
}

export const dateTableProps = {
  year: {
    type: Number,
    default: () => new Date().getFullYear()
  },
  month: {
    type: Number,
    default: () => new Date().getMonth()
  },
  selection: {
    type: Object as PropType<ISelection>,
    default: () => ({})
  },
  selectingRange: {
    type: Object as PropType<ISelectingRange>,
    default: () => ({})
  },
  disabledDate: {
    type: Function as PropType<(cell: Date) => boolean>
  },
  disabled: Boolean,
  min: Date,
  max: Date,
  /** 是否展示非本月的日期 */
  showOverflowDate: Boolean,
  /** 一周以周几开始，默认0表示周日，1表示周一 */
  startOfWeek: {
    type: Number,
    default: 0,
    validator: (val: number) => [0, 1, 2, 3, 4, 5, 6].includes(val)
  }
};

export type DateTableProps = ExtractPropTypes<typeof dateTableProps>;

export type EmitType = 'input' | 'enter-table' | 'leave-table' | 'selecting-range-update';
