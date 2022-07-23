import { h } from 'vue';
import { compareMonth } from '@components/date-picker/src/utils';
import type { YearTableProps } from '@components/date-picker/src/renderers/table-year/types';

export default function renderYearTable(props: YearTableProps): JSX.Element {
  const { value, start, month, min, max, onSelect } = props;
  const prefixCls = 'yoga-year-table';

  const isDisabled = (year: number): boolean => {
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
    const year = start + row * 3 + col;

    return {
      [`${prefixCls}__col`]: true,
      current: year === new Date().getFullYear(),
      selected: value && year === value.getFullYear(),
      disabled: isDisabled(year)
    };
  };

  const onYearSelect = (year: number): void => {
    if (isDisabled(year)) {
      return;
    }

    onSelect?.(year);
  };

  return h('div', { class: prefixCls }, [
    [0, 1, 2, 3].map((row) =>
      h('div', { key: row, class: `${prefixCls}__row` }, [
        [0, 1, 2].map((col) => {
          // 每页只展示10个
          if (row * 3 + col > 9) {
            return null;
          }
          return h(
            'div',
            {
              key: col,
              class: getCellClass(row, col),
              onClick: () => onYearSelect(start + row * 3 + col)
            },
            [start + row * 3 + col]
          );
        })
      ])
    )
  ]);
}
