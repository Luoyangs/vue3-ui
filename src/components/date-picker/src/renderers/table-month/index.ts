import { h } from 'vue';
import { useLocale } from '@hooks/useLocale';
import { compareMonth } from '@components/date-picker/src/utils';
import type { MonthTableProps } from '@components/date-picker/src/renderers/table-month/types';
import type { ISelectingRange, ISelection } from '@components/date-picker/src/renderers/table-date/types';

export default function renderMonthTable(props: MonthTableProps): JSX.Element {
  const {
    value,
    year,
    min,
    max,
    selection = {} as ISelection,
    selectingRange = {} as ISelectingRange,
    onSelect,
    onMouseEnter,
    onMouseLeave
  } = props;
  const prefixCls = 'yoga-month-table';
  const { t } = useLocale();

  const isDisabled = (month: number): boolean => {
    const current = {
      year,
      month
    };

    if (min && compareMonth(min, current) === 1) {
      return true;
    }
    if (max && compareMonth(current, max) === 1) {
      return true;
    }

    return false;
  };

  const getCellClass = (row: number, col: number): Record<string, boolean> => {
    const month = row * 3 + col;
    const today = new Date();
    const finalStartDate = selection.startDate || selectingRange.startDate;
    const finalEndDate = selection.endDate || selectingRange.endDate;
    let inRange = false;
    if (
      finalStartDate &&
      compareMonth(
        { year, month },
        {
          year: finalStartDate.getFullYear(),
          month: finalStartDate.getMonth()
        }
      ) > 0 &&
      finalEndDate &&
      compareMonth(
        { year, month },
        {
          year: finalEndDate.getFullYear(),
          month: finalEndDate.getMonth()
        }
      ) < 0
    ) {
      inRange = true;
    }

    return {
      [`${prefixCls}__col`]: true,
      disabled: isDisabled(month),
      'in-range': inRange,
      'line-start': col === 0,
      'line-end': col === 2,
      'range-start': !!finalStartDate && year === finalStartDate.getFullYear() && month === finalStartDate.getMonth(),
      'range-end': !!finalEndDate && year === finalEndDate.getFullYear() && month === finalEndDate.getMonth(),
      'in-range-start':
        inRange && !!finalStartDate && year === finalStartDate.getFullYear() && month === finalStartDate.getMonth() + 1,
      'in-range-end':
        inRange && !!finalEndDate && year === finalEndDate.getFullYear() && month + 1 === finalEndDate.getMonth(),
      current: year === today.getFullYear() && month === today.getMonth(), // 当前年月
      selected: value && year === value.getFullYear() && month === value.getMonth() // 选中的年月
    };
  };

  const onMonthSelect = (month: number): void => {
    if (isDisabled(month)) {
      return;
    }

    onSelect(month);
  };

  const onMonthMouseEnter = (month: number): void => {
    if (isDisabled(month)) {
      return;
    }

    onMouseEnter?.(year, month);
  };

  return h('div', { class: prefixCls }, [
    // 四行
    [0, 1, 2, 3].map((row) =>
      h('div', { class: `${prefixCls}__row`, key: row }, [
        // 三列
        [0, 1, 2].map((col) =>
          h(
            'div',
            {
              key: col,
              class: getCellClass(row, col),
              onClick: () => onMonthSelect(row * 3 + col),
              onMouseenter: () => onMonthMouseEnter(row * 3 + col),
              onMouseleave: onMouseLeave
            },
            t(`ele.datepicker.months.${row * 3 + col}`)
          )
        )
      ])
    )
  ]);
}
