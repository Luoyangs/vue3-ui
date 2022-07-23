import type { MonthItem } from '@components/date-picker/src/utils';
import type { ISelectingRange, ISelection } from '@components/date-picker/src/renderers/table-date/types';

export interface MonthTableProps {
  value: Date;
  year: number;
  min: MonthItem;
  max: MonthItem;
  selection?: ISelection;
  selectingRange: ISelectingRange; // month range hover date
  onSelect: (month: number) => void;
  onMouseEnter?: (year: number, month: number) => void;
  onMouseLeave?: () => void;
}
