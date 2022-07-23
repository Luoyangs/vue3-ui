import { computed, reactive, watch, onMounted } from 'vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import { isFunction, isValidDate } from '@utils/helper';
import {
  compareMonth,
  getLastMonth,
  getNextMonth,
  getYearRange,
  getEndOfDate,
  getStartOfDate,
  getMaxDayNumOfYearMonth
} from '@components/date-picker/src/utils';
import type { SetupContext } from 'vue';
import type { ButtonProps } from '@components/button/types';
import type { PickerHeaderProps } from '@components/date-picker/src/renderers/picker-header/types';
import type {
  IDateRange,
  DateTableProps,
  ISelectingRange
} from '@components/date-picker/src/renderers/table-date/types';
import type { YearTableProps } from '@components/date-picker/src/renderers/table-year/types';
import type { MonthTableProps } from '@components/date-picker/src/renderers/table-month/types';
import type {
  IHook,
  IState,
  EmitType,
  DaterangePickerPanelProp
} from '@components/date-picker/src/renderers/panel-daterange-picker/types';
import type { ViewType } from '@components/date-picker/types';

export const useHook = (props: DaterangePickerPanelProp, context: SetupContext<EmitType[]>): IHook => {
  const now = new Date();
  const state = reactive<IState>({
    fixedStartDate: undefined,
    selection: {
      type: 'range',
      startDate: undefined,
      endDate: undefined
    },
    selectingRange: {
      startDate: undefined,
      endDate: undefined,
      isSelecting: false,
      active: false
    },
    left: {
      viewType: 'date',
      viewHistory: [],
      time: now,
      month: now.getMonth(),
      year: now.getFullYear(),
      yearRange: getYearRange(now.getFullYear())
    },
    right: {
      viewType: 'date',
      viewHistory: [],
      time: now,
      month: now.getMonth(),
      year: now.getFullYear(),
      yearRange: getYearRange(now.getFullYear())
    }
  });
  /** 是否展示time panel */
  const showTimePanel = computed(() => props.type.indexOf('time') > -1);
  /** 如果左侧大于右侧，则disabled左侧的month next和右侧的month prev按钮 */
  const disabledNextMonth = computed(() => {
    const nextMonth = getNextMonth(state.left.year, state.left.month);
    return compareMonth(nextMonth, state.right) > -1;
  });
  const disabledRightPrevYear = computed(() => {
    if (props.type === 'monthrange') {
      return state.left.year >= state.right.year;
    }

    // 固定左侧，确定右侧范围：如果右边面板类型是year, 不允许右侧起始年份小于左侧选择的年月(可以等于)
    if (props.type === 'yearrange') {
      return state.left.yearRange.end >= state.right.yearRange.end;
    }

    if (state.right.viewType === 'year') {
      return (
        compareMonth(state.left, {
          year: state.right.yearRange.start - 1,
          month: state.right.month
        }) > -1
      );
    }

    return (
      compareMonth(state.left, {
        year: state.right.year - 1,
        month: state.right.month
      }) > -1
    );
  });
  const disabledRightNextYear = computed(() => {
    // year range fixed end禁止pre/next year操作
    return props.type === 'yearrange' && props.fixed === 'end' && !!state.selection.endDate;
  });
  const disabledLeftPrevYear = computed(() => {
    // year range fixed start禁止pre/next year操作
    return props.type === 'yearrange' && props.fixed === 'start' && !!state.selection.startDate;
  });
  const disabledNextYear = computed(() => {
    if (props.type === 'monthrange') {
      return state.left.year >= state.right.year;
    }

    // 固定右侧，确定左侧范围：如果左边面板类型是year, 不允许左侧选择的年月大于右侧起始年份(可以等于)
    if (props.type === 'yearrange') {
      return state.left.yearRange.end >= state.right.yearRange.end;
    }

    if (state.left.viewType === 'year') {
      return (
        compareMonth(
          {
            year: state.left.yearRange.end + 1,
            month: state.left.month
          },
          state.right
        ) > -1
      );
    }

    return (
      compareMonth(
        {
          year: state.left.year + 1,
          month: state.left.month
        },
        state.right
      ) > -1
    );
  });
  const computedMin = computed(() => {
    const min = props.min;

    return isFunction(min) ? min(state.selectingRange, state.selection) : min;
  });
  const computedMax = computed(() => {
    const max = props.max;

    return isFunction(max) ? max(state.selectingRange, state.selection) : max;
  });
  const minStartMonth = computed(() => {
    if (props.type === 'monthrange' && props.fixed === 'start' && state.selection.startDate) {
      return {
        year: state.selection.startDate.getFullYear(),
        month: state.left.month
      };
    }

    if (props.type === 'yearrange' && props.fixed === 'start' && state.selection.startDate) {
      return {
        year: state.selection.startDate.getFullYear(),
        month: 0
      };
    }

    const min = computedMin.value;
    if (min && isValidDate(min)) {
      return {
        year: min.getFullYear(),
        month: min.getMonth()
      };
    }

    return null;
  });
  const maxEndMonth = computed(() => {
    if (props.type === 'monthrange' && props.fixed === 'end' && state.selection.endDate) {
      return {
        year: state.selection.endDate.getFullYear(),
        month: state.right.month
      };
    }

    if (props.type === 'yearrange' && props.fixed === 'end' && state.selection.endDate) {
      return {
        year: state.selection.endDate.getFullYear(),
        month: 0
      };
    }

    const max = computedMax.value;
    if (max && isValidDate(max)) {
      return {
        year: max.getFullYear(),
        month: max.getMonth()
      };
    }

    return null;
  });
  const maxStartMonth = computed(() => {
    const selection = state.selection;
    // monthrange 左侧的panel最大最小值都是selection.startDate
    if (props.type === 'monthrange') {
      if (props.fixed === 'start' && selection.startDate) {
        return {
          year: selection.startDate.getFullYear(),
          month: state.left.month
        };
      }

      return selection.endDate
        ? {
            year: selection.endDate.getFullYear(),
            month: selection.endDate.getMonth()
          }
        : null;
    }

    if (props.type === 'yearrange') {
      if (props.fixed === 'start' && selection.startDate) {
        return {
          year: selection.startDate.getFullYear(),
          month: 0
        };
      }

      // 先选了end year还未选择start year, 则左侧可选year最大等于右侧year
      return selection.endDate
        ? {
            year: selection.endDate.getFullYear(),
            month: 0
          }
        : null;
    }

    const lastRightMonth = getLastMonth(state.right.year, state.right.month);
    if (maxEndMonth.value) {
      // 取小的
      return compareMonth(maxEndMonth.value, lastRightMonth) > -1 ? lastRightMonth : maxEndMonth.value;
    }

    return lastRightMonth;
  });
  const minEndMonth = computed(() => {
    if (props.type === 'monthrange') {
      // year range 选了左侧的年份，右侧的不允许小于左侧的年份
      const { startDate, endDate } = state.selection;
      if (props.fixed === 'end' && endDate) {
        return {
          year: endDate.getFullYear(),
          month: endDate.getMonth()
        };
      }

      return startDate
        ? {
            year: startDate.getFullYear(),
            month: startDate.getMonth()
          }
        : null;
    }

    const nextLeftMonth = getNextMonth(state.left.year, state.left.month);
    if (minStartMonth.value) {
      // 取大的
      return compareMonth(minStartMonth.value, nextLeftMonth) > -1 ? minStartMonth.value : nextLeftMonth;
    }

    return nextLeftMonth;
  });
  const minEndYearTable = computed(() => {
    if (props.type === 'yearrange') {
      // year range 选了左侧的年份，右侧的不允许小于左侧的年份
      const { startDate, endDate } = state.selection;
      if (props.fixed === 'end' && endDate) {
        return {
          year: endDate.getFullYear(),
          month: 0
        };
      }

      return startDate
        ? {
            year: startDate.getFullYear(),
            month: 0
          }
        : null;
    }

    return minEndMonth.value;
  });
  const leftHeaderProps = computed(
    () =>
      ({
        year: state.left.year,
        month: state.left.month,
        yearRange: state.left.yearRange,
        viewType: state.left.viewType,
        disabled: props.disabled,
        hidePrevYear: disabledLeftPrevYear.value,
        hideNextYear: disabledNextYear.value,
        hideNextMonth: disabledNextMonth.value,
        onYearClick: () => changeView('left', 'year'),
        onMonthClick: () => changeView('left', 'month'),
        onNext: (type: 'month' | 'year') => next('left', type),
        onPrev: (type: 'month' | 'year') => prev('left', type)
      } as Partial<PickerHeaderProps>)
  );
  const rightHeaderProps = computed(
    () =>
      ({
        year: state.right.year,
        month: state.right.month,
        yearRange: state.right.yearRange,
        viewType: state.right.viewType,
        disabled: props.disabled,
        hidePrevYear: disabledRightPrevYear.value,
        hideNextYear: disabledRightNextYear.value,
        hidePrevMonth: disabledNextMonth.value,
        onYearClick: () => changeView('right', 'year'),
        onMonthClick: () => changeView('right', 'month'),
        onNext: (type: 'month' | 'year') => next('right', type),
        onPrev: (type: 'month' | 'year') => prev('right', type)
      } as Partial<PickerHeaderProps>)
  );
  const leftDateTableProps = computed(
    () =>
      ({
        year: state.left.year,
        month: state.left.month,
        min: computedMin.value,
        max: computedMax.value,
        disabledDate: props.disabledDate,
        disabled: props.disabled,
        selection: state.selection,
        selectingRange: state.selectingRange,
        startOfWeek: props.startOfWeek,
        showOverflowDate: props.showOverflowDate,
        onInput: onSelectionInput,
        onSelectingRangeUpdate,
        onEnterTable,
        onLeaveTable
      } as Partial<DateTableProps>)
  );
  const rightDateTableProps = computed(
    () =>
      ({
        year: state.right.year,
        month: state.right.month,
        min: computedMin.value,
        max: computedMax.value,
        disabledDate: props.disabledDate,
        disabled: props.disabled,
        selection: state.selection,
        selectingRange: state.selectingRange,
        startOfWeek: props.startOfWeek,
        showOverflowDate: props.showOverflowDate,
        onInput: onSelectionInput,
        onSelectingRangeUpdate,
        onEnterTable,
        onLeaveTable
      } as Partial<DateTableProps>)
  );
  const leftYearTableProps = computed(
    () =>
      ({
        min: minStartMonth.value,
        max: maxStartMonth.value,
        month: state.left.month,
        value: state.selection.startDate,
        start: state.left.yearRange.start,
        onSelect: onStartYearInput
      } as YearTableProps)
  );
  const rightYearTableProps = computed(
    () =>
      ({
        min: minEndYearTable.value,
        max: maxEndMonth.value,
        month: state.right.month,
        value: state.selection.endDate,
        start: state.right.yearRange.start,
        onSelect: onEndYearInput
      } as YearTableProps)
  );
  const leftMonthTableProps = computed(
    () =>
      ({
        min: minStartMonth.value,
        max: maxStartMonth.value,
        year: state.left.year,
        value: state.selection.startDate,
        selection: state.selection,
        selectingRange: state.selectingRange,
        onSelect: onStartMonthInput,
        onMouseEnter: (year, month) => onHoverMonthTable('left', year, month),
        onMouseLeave: () => onLeaveRightYearMonthTable('left')
      } as MonthTableProps)
  );
  const rightMonthTableProps = computed(
    () =>
      ({
        min: minEndMonth.value,
        max: maxEndMonth.value,
        year: state.right.year,
        value: state.selection.endDate,
        selection: state.selection,
        selectingRange: state.selectingRange,
        onSelect: onEndMonthInput,
        onMouseEnter: (year, month) => onHoverMonthTable('right', year, month),
        onMouseLeave: () => onLeaveRightYearMonthTable('right')
      } as MonthTableProps)
  );
  const confirmBtnProps = computed(
    () =>
      ({
        type: 'primary',
        size: 'small',
        // 如果没有选择开始时间或者结束时间，则不允许点击confirm
        disabled: !state.selection.startDate || !state.selection.endDate,
        onClick: onConfirm
      } as Partial<ButtonProps>)
  );
  /**
   * 是否展示date table
   * @depend props.type和state.viewType
   */
  const showLeftDateTable = computed(() => state.left.viewType === 'date');
  const showRightDateTable = computed(() => state.right.viewType === 'date');
  /**
   * 是否展示month table
   * @depend props.type和state.viewType
   */
  const showLeftMonthTable = computed(() => props.type !== 'yearrange' && state.left.viewType === 'month');
  const showRightMonthTable = computed(() => props.type !== 'yearrange' && state.right.viewType === 'month');
  /**
   * 是否展示year table
   * @depend state.viewType
   */
  const showLeftYearTable = computed(() => state.left.viewType === 'year');
  const showRightYearTable = computed(() => state.right.viewType === 'year');

  //////////////////////////////// methods start ///////////////////////////
  const prev = (panel: 'left' | 'right', type: 'month' | 'year') => {
    switch (state[panel].viewType) {
      case 'month':
        state[panel].year -= 1;
        break;
      case 'year':
        const { start, end } = state[panel].yearRange;
        state[panel].yearRange = {
          start: start - 10,
          end: end - 10
        };
        break;
      case 'date':
        if (type === 'month') {
          const lastMonth = getLastMonth(state[panel].year, state[panel].month);
          state[panel].year = lastMonth.year;
          state[panel].month = lastMonth.month;
        } else {
          console.log('state[panel]x', state[panel].year);
          state[panel].year -= 1;
        }
        break;
    }
  };
  const next = (panel: 'left' | 'right', type: 'month' | 'year') => {
    switch (state[panel].viewType) {
      case 'month':
        state[panel].year += 1;
        break;
      case 'year':
        const { start, end } = state[panel].yearRange;
        state[panel].yearRange = {
          start: start + 10,
          end: end + 10
        };
        break;
      case 'date':
        if (type === 'month') {
          const lastMonth = getNextMonth(state[panel].year, state[panel].month);
          state[panel].year = lastMonth.year;
          state[panel].month = lastMonth.month;
        } else {
          state[panel].year += 1;
        }
        break;
    }
  };

  const resetView = () => {
    const type = props.type;
    const value = props.modelValue;
    const showTime = showTimePanel.value;
    state.selection.startDate = isValidDate(value?.startDate)
      ? showTime
        ? value.startDate
        : getStartOfDate(value.startDate)
      : undefined;
    state.selection.endDate = isValidDate(value?.endDate)
      ? showTime
        ? value.endDate
        : getStartOfDate(value.endDate)
      : undefined;
    let startDate = state.selection.startDate || new Date();
    let endDate = state.selection.endDate || new Date();
    // 调整顺序
    if (startDate && endDate) {
      if (startDate.getTime() > endDate.getTime()) {
        const temp = startDate;
        startDate = endDate;
        endDate = temp;
      }
    }

    // 初始化selecting range
    resetSelectingRange();
    // 初始化left/right panel
    const leftYear = startDate.getFullYear();
    const leftMonth = startDate.getMonth();
    let rightYear = endDate.getFullYear();
    let rightMonth = endDate.getMonth();
    if (leftYear === rightYear && leftMonth === rightMonth) {
      const nextMonth = getNextMonth(leftYear, leftMonth);
      rightYear = nextMonth.year;
      rightMonth = nextMonth.month;
    }
    let viewType: ViewType = 'date';
    if (type === 'year' || type === 'yearrange') {
      viewType = 'year';
    } else if (type === 'month' || type === 'monthrange') {
      viewType = 'month';
    }
    state.left.year = leftYear;
    state.left.month = leftMonth;
    state.left.yearRange = getYearRange(leftYear);
    state.left.viewType = viewType;
    state.right.year = rightYear;
    state.right.month = rightMonth;
    state.right.yearRange = getYearRange(rightYear);
    state.right.viewType = viewType;

    // 纠正一下月份，防止在Year Table里面的compareMonth比较时会出问题
    if (type === 'yearrange') {
      state.left.month = 0;
      state.right.month = 0;
    }

    if (type === 'monthrange' && !state.selection.startDate && !state.selection.endDate) {
      state.right.year = leftYear;
      state.right.month = 0;
    }
  };

  const resetSelectingRange = () => {
    if (props.fixed && state.fixedStartDate) {
      state.selectingRange = {
        startDate: state.fixedStartDate,
        endDate: undefined,
        isSelecting: true
      };
    } else {
      state.selectingRange = {
        startDate: undefined,
        endDate: undefined,
        isSelecting: false
      };
    }
  };

  const changeView = (panel: 'left' | 'right', type?: 'month' | 'year') => {
    if (type) {
      state[panel].viewHistory.push(state[panel].viewType);
      state[panel].viewType = type;
    } else {
      const lastView = state[panel].viewHistory.pop();
      state[panel].viewType = lastView as ViewType;
    }
  };

  const emitData = (selection: IDateRange) => {
    context.emit(UPDATE_MODEL_EVENT, selection);

    // 如果传入的value和当前选择的时间不一样，则触发change事件
    const { startDate, endDate } = selection;
    const { startDate: oldStartDate, endDate: oldEndDate } = props.modelValue || {};
    if (
      !(
        oldStartDate &&
        oldEndDate &&
        startDate.getTime() === oldStartDate.getTime() &&
        endDate.getTime() === oldEndDate.getTime()
      )
    ) {
      context.emit(CHANGE_EVENT, selection);
    }
  };

  // 选中日期触发的事件
  const onSelectionInput = (selection: IDateRange) => {
    state.selection = {
      ...selection,
      type: 'range'
    };

    context.emit('range-input', selection);

    if (selection.endDate) {
      resetSelectingRange();
    }

    if (!showTimePanel.value) {
      if (selection.startDate && selection.endDate) {
        selection.endDate = getEndOfDate(selection.endDate);
        emitData(selection);
      }
    }
  };

  const onSelectingRangeUpdate = (selectingRange: ISelectingRange) => {
    state.selectingRange = {
      ...selectingRange,
      active: true,
      isSelecting: !!props.fixed || selectingRange.isSelecting
    };
  };

  const onEnterTable = () => {
    if (state.selectingRange.startDate || state.selectingRange.endDate) {
      state.selectingRange.active = true;
    }
  };

  const onLeaveTable = () => {
    state.selectingRange.endDate = undefined;
    state.selectingRange.active = false;
  };

  const onHoverMonthTable = (panel: 'left' | 'right', year: number, month: number) => {
    if (panel === 'left' && state.selection.endDate) {
      state.selectingRange.startDate = getStartOfDate(new Date(year, month, 1));
    } else {
      state.selectingRange.endDate = getEndOfDate(new Date(year, month, getMaxDayNumOfYearMonth(year, month)));
    }
  };

  const onLeaveRightYearMonthTable = (panel: 'left' | 'right') => {
    if (panel === 'left') {
      state.selectingRange.startDate = undefined;
    } else {
      state.selectingRange.endDate = undefined;
    }
  };

  const onStartYearInput = (year: number) => {
    state.left.year = year;
    if (props.type !== 'yearrange') {
      changeView('left');
    } else {
      if (props.fixed === 'start' && state.selection.startDate) {
        return;
      }

      if (props.fixed !== 'end' && state.selection.startDate && state.selection.endDate) {
        state.selection.endDate = undefined;
      }
      state.selection.startDate = getStartOfDate(new Date(year, state.left.month, 1));
      const selection = state.selection;
      context.emit('range-input', selection);

      if (!showTimePanel.value) {
        if (selection.startDate && selection.endDate) {
          selection.endDate = getEndOfDate(selection.endDate);
          emitData(selection as IDateRange);
        }
      }
    }
  };

  const onEndYearInput = (year: number) => {
    state.right.year = year;
    if (props.type !== 'yearrange') {
      changeView('right');
    } else {
      if (props.fixed !== 'start' && state.selection.startDate && state.selection.endDate) {
        state.selection.startDate = undefined;
      }
      state.selection.endDate = getEndOfDate(
        new Date(year, state.right.month, getMaxDayNumOfYearMonth(year, state.right.month))
      );
      const selection = state.selection;
      context.emit('range-input', selection);

      if (!showTimePanel.value) {
        if (selection.startDate && selection.endDate) {
          selection.endDate = getEndOfDate(selection.endDate);
          emitData(selection as IDateRange);
        }
      }
    }
  };

  const onStartMonthInput = (month: number) => {
    state.left.month = month;
    if (props.type !== 'monthrange') {
      state.left.month = month;
      changeView('left');
    } else {
      if (props.fixed === 'start' && state.selection.startDate) {
        return;
      }

      if (props.fixed !== 'end' && state.selection.startDate && state.selection.endDate) {
        state.selection.endDate = undefined;
      }
      state.selection.startDate = getStartOfDate(new Date(state.left.year, month, 1));
      const selection = state.selection;
      context.emit('range-input', selection);

      if (!showTimePanel.value) {
        if (selection.startDate && selection.endDate) {
          selection.endDate = getEndOfDate(selection.endDate);
          emitData(selection as IDateRange);
        }
      }
    }
  };

  const onEndMonthInput = (month: number) => {
    state.right.month = month;
    if (props.type !== 'monthrange') {
      state.right.month = month;
      changeView('right');
    } else {
      if (props.fixed === 'end' && state.selection.endDate) {
        return;
      }

      if (props.fixed !== 'start' && state.selection.startDate && state.selection.endDate) {
        state.selection.startDate = undefined;
      }
      state.selection.endDate = getEndOfDate(
        new Date(state.right.year, month, getMaxDayNumOfYearMonth(state.right.year, month))
      );
      const selection = state.selection;
      context.emit('range-input', selection);

      if (!showTimePanel.value) {
        if (selection.startDate && selection.endDate) {
          selection.endDate = getEndOfDate(selection.endDate);
          emitData(selection as IDateRange);
        }
      }
    }
  };

  const onConfirm = () => {
    console.log('onConfirm');
  };

  //////////////////////////////// lifecycle ///////////////////////////
  onMounted(() => {
    resetView();
  });

  watch(() => props.modelValue, resetView);
  watch(
    () => props.fixed,
    (val: boolean | 'start' | 'end') => {
      if (val) {
        const { startDate, endDate } = props.modelValue;

        if (val === 'start' && startDate) {
          state.fixedStartDate = getStartOfDate(startDate);
        } else if (val === 'end' && endDate) {
          state.fixedStartDate = getEndOfDate(endDate);
        } else {
          console.warn(
            '[YogaUI warn][DatePicker]: should init the fixed date in modelValue when `fixed` is set other than false'
          );
        }
      } else {
        state.fixedStartDate = undefined;
      }
    },
    { immediate: true }
  );

  return {
    confirmBtnProps,
    leftHeaderProps,
    rightHeaderProps,
    leftDateTableProps,
    rightDateTableProps,
    leftYearTableProps,
    rightYearTableProps,
    leftMonthTableProps,
    rightMonthTableProps,
    showLeftMonthTable,
    showRightMonthTable,
    showLeftYearTable,
    showRightYearTable,
    showLeftDateTable,
    showRightDateTable,
    showTimePanel
  };
};
