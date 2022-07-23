import { h, defineComponent, computed } from 'vue';
import { isFunction } from '@utils/helper';
import {
  isInRange,
  isSameDay,
  isInRange2,
  compareDate,
  getLastMonth,
  getNextMonth,
  getWeekRange,
  getFirstDayOfYearMonth,
  getStartDateOfCalendar,
  getMaxDayNumOfYearMonth
} from '@components/date-picker/src/utils';
import renderHeader from '@components/date-picker/src/renderers/table-date/header';
import renderTable from '@components/date-picker/src/renderers/table-date/table';
import { dateTableProps } from '@components/date-picker/src/renderers/table-date/types';
import type { SetupContext } from 'vue';
import type { DateCell, EmitType, DateTableProps } from '@components/date-picker/src/renderers/table-date/types';
import { useLocale } from '@hooks/useLocale';

const getDateByCalendarCell = (cell: DateCell, year: number, month: number): Date => {
  switch (cell.type) {
    case 'last-month':
      const last = getLastMonth(year, month);
      return new Date(last.year, last.month, +cell.text);
    case 'next-month':
      const next = getNextMonth(year, month);
      return new Date(next.year, next.month, +cell.text);
    default:
      return new Date(year, month, +cell.text);
  }
};

export default defineComponent({
  name: 'DateTable',
  props: dateTableProps,
  emits: ['input', 'enter-table', 'leave-table', 'selecting-range-update'],
  setup(props: DateTableProps, { slots, emit }: SetupContext<EmitType[]>) {
    const { t } = useLocale();
    // 获取星期列表
    const headers = computed(() => {
      const startOfWeek = props.startOfWeek;
      const headers: string[] = [];

      for (let i = 0; i < 7; i++) {
        headers.push(t(`ele.datepicker.weeks.${(startOfWeek + i) % 7}`));
      }
      return headers;
    });

    // 获取当月的日期列表
    const calendar = computed(() => {
      const year = props.year;
      const month = props.month;
      const startOfWeek = props.startOfWeek;
      const startDateOfCalendar = getStartDateOfCalendar(year, month, startOfWeek).getDate();
      const maxDayOfMonth = getMaxDayNumOfYearMonth(year, month);
      const dayOfLastMonth = (getFirstDayOfYearMonth(year, month) - startOfWeek + 7) % 7;
      const totalDayInCalendar = Math.ceil((maxDayOfMonth + dayOfLastMonth) / 7) * 7;
      const calendar: DateCell[][] = [];

      let row: DateCell[] = [];
      for (let i = 0; i < totalDayInCalendar; i++) {
        const cell = computedTableCellText(i, dayOfLastMonth, maxDayOfMonth, startDateOfCalendar);

        // not showOverflowDate
        if (cell.text === '') {
          cell.date = undefined;
        } else {
          if (i % 7 === 0) {
            cell.isStart = true;
          } else if (i % 7 === 6) {
            cell.isEnd = true;
          }

          const parsedCellText = +(cell.text as string);
          if (parsedCellText === 1) {
            cell.isStart = true;
            cell.isMonthStart = true;
          } else if (parsedCellText === maxDayOfMonth) {
            cell.isEnd = true;
            cell.isMonthEnd = true;
          }

          let currentDate = new Date(year, month, parsedCellText);
          if (props.showOverflowDate) {
            currentDate = getDateByCalendarCell(cell as DateCell, year, month);
          }
          cell.date = currentDate;

          // 如果设置了min date, 小于min date的日期disabled
          if (props.min && compareDate(currentDate, props.min) === -1) {
            cell.disabled = true;
          }
          if (props.max && compareDate(currentDate, props.max) === 1) {
            cell.disabled = true;
          }

          // 设置了disabled function props
          if (props.disabledDate && isFunction(props.disabledDate)) {
            cell.disabled = cell.disabled || props.disabledDate(currentDate);
          }

          // 传入的props disabled
          cell.disabled = cell.disabled || props.disabled;

          if (cell.type === 'normal' || cell.type === 'current') {
            const selection = props.selection;
            const selectingRange = props.selectingRange;

            if (selection.type === 'date') {
              // date picker
              cell.selected = isSameDay(currentDate, selection.date as Date);
            } else {
              // week or range picker
              if (selection.type === 'week') {
                // week picker
                cell.isWeekSelection = isInRange2(
                  currentDate,
                  selection.startDate as Date,
                  selection.endDate as Date,
                  true
                );
                cell.isWeekSelecting =
                  selectingRange.active &&
                  isInRange2(currentDate, selectingRange.startDate as Date, selectingRange.endDate as Date, true);
              } else if (selection.type === 'range') {
                // range picker
                cell.selected =
                  selectingRange.active &&
                  isInRange(currentDate, [selectingRange.startDate as Date, selectingRange.endDate as Date]);
              }

              cell.selected = isInRange(currentDate, [selection.startDate as Date, selection.endDate as Date]);
              cell.inRange = isInRange2(currentDate, selection.startDate as Date, selection.endDate as Date);
              cell.isRangeStart = isSameDay(currentDate, selection.startDate as Date);
              cell.isRangeEnd = isSameDay(currentDate, selection.endDate as Date);

              if (selectingRange.active) {
                // range picker fixed start或者end, 且已经选好了，然后又开始重新选择时
                const isOnReSelecting = selectingRange.isSelecting && !!selection.endDate;
                if (isInRange2(currentDate, selectingRange.startDate as Date, selectingRange.endDate as Date)) {
                  if (isOnReSelecting) {
                    cell.inSelectingRange = true;
                  } else {
                    cell.inRange = true;
                  }
                } else if (isSameDay(currentDate, selectingRange.startDate as Date)) {
                  if (isOnReSelecting) {
                    cell.isSelectingRangeStart = true;
                  } else {
                    cell.isRangeStart = true;
                  }
                } else if (isSameDay(currentDate, selectingRange.endDate as Date)) {
                  if (isOnReSelecting) {
                    cell.isSelectingRangeEnd = true;
                  } else {
                    cell.isRangeEnd = true;
                  }
                }
              }
            }
          }
        }

        if (i % 7 === 0) {
          row = [];
        }

        row.push(cell as DateCell);
        if (i % 7 === 6) {
          calendar.push(row);
        }
      }

      return calendar;
    });

    const computedTableCellText = (
      index: number,
      dayOfLastMonth: number,
      maxDayOfMonth: number,
      startDayOfCalendar: number
    ): Partial<DateCell> => {
      const startDayOfMonthDiff = index - dayOfLastMonth + 1;
      // 上个月的数据
      if (startDayOfMonthDiff <= 0) {
        return {
          type: 'last-month',
          text: props.showOverflowDate ? String(startDayOfCalendar + index) : ''
        };
      } else if (startDayOfMonthDiff < maxDayOfMonth) {
        // 当前月的数据
        return {
          text: String(startDayOfMonthDiff),
          type: isSameDay(new Date(props.year, props.month, startDayOfMonthDiff), new Date()) ? 'current' : 'normal'
        };
      }

      return {
        text: props.showOverflowDate ? String(startDayOfMonthDiff - maxDayOfMonth) : '',
        type: 'next-month'
      };
    };

    const onClick = (cell: DateCell) => {
      if (cell.text === '' || cell.disabled) {
        return;
      }

      let clickDate = new Date(props.year, props.month, +cell.text);
      if (props.showOverflowDate) {
        clickDate = getDateByCalendarCell(cell, props.year, props.month);
      }

      const selection = props.selection;
      let newSelection = null;

      if (selection.type === 'range') {
        const selectingRange = props.selectingRange;
        // 重新开始选择一个date range
        if (!selectingRange.startDate || !selectingRange.isSelecting) {
          newSelection = {
            startDate: clickDate,
            endDate: undefined,
            isSelecting: true
          };
        } else if (selectingRange.startDate.getTime() > clickDate.getTime()) {
          newSelection = {
            startDate: clickDate,
            endDate: selectingRange.startDate,
            isSelecting: false
          };
        } else {
          newSelection = {
            startDate: selectingRange.startDate,
            endDate: clickDate,
            isSelecting: false
          };
        }

        emit('selecting-range-update', newSelection);
        emit('input', {
          startDate: newSelection.startDate,
          endDate: newSelection.endDate
        });
      } else if (selection.type === 'week') {
        let [startDate, endDate] = getWeekRange(clickDate, props.startOfWeek);

        if (props.min) {
          startDate = compareDate(props.min, startDate) === 1 ? props.min : startDate;
        }
        if (props.max) {
          endDate = compareDate(props.max, endDate) === 1 ? endDate : props.max;
        }

        emit('selecting-range-update', {});
        emit('input', { startDate, endDate });
      } else {
        emit('input', clickDate);
      }
    };

    const onMouseEnter = (cell: DateCell) => {
      if (cell.text === '' || cell.disabled) {
        return;
      }

      emit('enter-table');

      let currentDate = new Date(props.year, props.month, +cell.text);
      if (props.showOverflowDate) {
        currentDate = getDateByCalendarCell(cell, props.year, props.month);
      }

      if (props.selection.type === 'week') {
        let [startDate, endDate] = getWeekRange(currentDate, props.startOfWeek);

        if (props.min) {
          startDate = compareDate(props.min, startDate) === 1 ? props.min : startDate;
        }
        if (props.max) {
          endDate = compareDate(props.max, endDate) === 1 ? endDate : props.max;
        }

        emit('selecting-range-update', { startDate, endDate });
      } else if (props.selectingRange.startDate && props.selectingRange.isSelecting) {
        // 固定start或者end, 并且已经选了一开始结束时间，在次选了start后，鼠标hover的当前cell被标记为end
        emit('selecting-range-update', {
          startDate: props.selectingRange.startDate,
          endDate: currentDate,
          isSelecting: true
        });
      }
    };

    const onMouseLeave = () => {
      emit('leave-table');
    };

    return () =>
      h('div', { class: 'yoga-date-table' }, [
        renderHeader(headers.value),
        renderTable({
          slots,
          list: calendar.value,
          onClick,
          onMouseEnter,
          onMouseLeave
        })
      ]);
  }
});
