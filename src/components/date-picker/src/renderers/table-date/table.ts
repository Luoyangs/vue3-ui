import { h, renderSlot, toDisplayString } from 'vue';
import type { Slots } from 'vue';
import type { DateCell } from '@components/date-picker/src/renderers/table-date/types';

interface TableProp {
  list: DateCell[][];
  slots: Slots;
  onClick: (cell: DateCell) => void;
  onMouseEnter: (cell: DateCell) => void;
  onMouseLeave: () => void;
}

const getTableCellClassName = (cell: DateCell, prevCell: DateCell, nextCell: DateCell): Record<string, boolean> => {
  const {
    type,
    text,
    selected,
    inRange,
    isRangeStart,
    isRangeEnd,
    isSelectingRangeStart,
    isSelectingRangeEnd,
    inSelectingRange,
    isStart,
    isEnd,
    isMonthStart,
    isMonthEnd,
    isWeekSelecting,
    isWeekSelection,
    disabled
  } = cell;
  return {
    'out-of-month': type === 'next-month' || type === 'last-month',
    normal: type === 'normal',
    'normal current': type === 'current',
    selected,
    'in-range': inRange,
    'range-start': isRangeStart,
    'range-end': isRangeEnd,
    'in-selecting-range': inSelectingRange,
    'selecting-range-start': isSelectingRangeStart,
    'selecting-range-end': isSelectingRangeEnd,
    'line-start': isStart,
    'line-end': isEnd,
    'is-empty': text === '',
    'month-start': isMonthStart,
    'month-end': isMonthEnd,
    'week-selection': isWeekSelection,
    'week-selecting': isWeekSelecting,
    disabled,
    'disabled-prev': !disabled && nextCell && nextCell.disabled,
    'disabled-next': !disabled && prevCell && prevCell.disabled
  };
};

export default (props: TableProp, prefix = 'yoga-date-table__table'): JSX.Element => {
  const { list, slots, onClick, onMouseEnter, onMouseLeave } = props;
  return h('div', { class: prefix }, [
    list.map((row) =>
      h('div', { class: `${prefix}__row` }, [
        row.map((col, index) => {
          const autoClass = getTableCellClassName(col, row[index - 1], row[index + 1]);
          return h(
            'div',
            {
              key: index + col.text,
              class: [`${prefix}__cell`, autoClass],
              onClick: () => onClick(col),
              onMouseenter: () => onMouseEnter(col),
              onMouseleave: onMouseLeave
            },
            [
              h(
                'span',
                { class: [`${prefix}__cell-inner`, autoClass] },
                // 这里将cell作为default slot的参数传递给scoped slot
                // 如果自定义cell, 则默认使用col.text
                [renderSlot(slots, 'default', { ...col }, () => [toDisplayString(col.text)])]
              )
            ]
          );
        })
      ])
    )
  ]);
};
