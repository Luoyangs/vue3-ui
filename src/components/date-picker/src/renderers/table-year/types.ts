import type { MonthItem } from '@components/date-picker/src/utils';

export interface YearTableProps {
  value: Date;
  start: number; // 展示的起始年份
  month: number;
  min: MonthItem;
  max: MonthItem;
  onSelect?: (year: number) => void;
}
