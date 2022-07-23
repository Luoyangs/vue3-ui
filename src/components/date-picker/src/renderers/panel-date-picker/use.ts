import { reactive, computed, unref, watch, onMounted } from 'vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import { isValidDate } from '@utils/helper';
import { getLastMonth, getNextMonth, getYearRange } from '@components/date-picker/src/utils';
import type { SetupContext } from 'vue';
import type {
  ISelection,
  ISelectingRange,
  DateTableProps,
  IDateRange
} from '@components/date-picker/src/renderers/table-date/types';
import type { YearTableProps } from '@components/date-picker/src/renderers/table-year/types';
import type { MonthTableProps } from '@components/date-picker/src/renderers/table-month/types';
import type { PickerHeaderProps } from '@components/date-picker/src/renderers/picker-header/types';
import type {
  IHook,
  IState,
  DatePickerPanelProps
} from '@components/date-picker/src/renderers/panel-date-picker/types';

export const useHook = (props: DatePickerPanelProps, { emit }: SetupContext): IHook => {
  const state = reactive<IState>({
    year: null,
    month: null,
    selection: {} as ISelection,
    selectingRange: {} as ISelectingRange,
    time: null,
    viewType: 'date',
    viewHistory: [],
    yearRange: getYearRange()
  });
  /**
   * 是否展示时间选择器
   * @depend props.type
   */
  const showTimePanel = computed(() => props.type.indexOf('time') > -1);
  /**
   * 是否展示date table
   * @depend props.type和state.viewType
   */
  const showDateTable = computed(() => props.type !== 'year' && props.type !== 'month' && state.viewType === 'date');
  /**
   * 是否展示month table
   * @depend props.type和state.viewType
   */
  const showMonthTable = computed(() => props.type !== 'year' && state.viewType === 'month');
  /**
   * 是否展示year table
   * @depend state.viewType
   */
  const showYearTable = computed(() => state.viewType === 'year');

  const pickerHeaderProps = computed(
    () =>
      ({
        year: state.year,
        month: state.month,
        yearRange: state.yearRange,
        viewType: state.viewType,
        onYearClick: () => changeView('year'),
        onMonthClick: () => changeView('month'),
        onNext: handleNext,
        onPrev: handlePrev
      } as Partial<PickerHeaderProps>)
  );
  const dateTableProps = computed(
    () =>
      ({
        year: state.year,
        month: state.month,
        min: props.min,
        max: props.max,
        disabledDate: props.disabledDate,
        selection: state.selection,
        selectingRange: state.selectingRange,
        startOfWeek: props.startOfWeek,
        showOverflowDate: props.showOverflowDate,
        onInput: onDateInput,
        onSelectingRangeUpdate,
        onEnterTable,
        onLeaveTable
      } as Partial<DateTableProps>)
  );
  const minMonth = computed(() => {
    if (props.min && isValidDate(props.min)) {
      const minDate = props.min;
      return {
        year: minDate.getFullYear(),
        month: minDate.getMonth()
      };
    }

    return null;
  });
  const maxMonth = computed(() => {
    if (props.max && isValidDate(props.max)) {
      const maxDate = props.max;
      return {
        year: maxDate.getFullYear(),
        month: maxDate.getMonth()
      };
    }

    return null;
  });
  const yearTableProps = computed(
    () =>
      ({
        min: minMonth.value,
        max: maxMonth.value,
        month: state.month,
        start: state.yearRange.start,
        value: state.selection.date || state.selection.startDate,
        onSelect: onYearSelect
      } as YearTableProps)
  );
  const monthTableProps = computed(
    () =>
      ({
        min: minMonth.value,
        max: maxMonth.value,
        year: state.year,
        value: state.selection.date || state.selection.startDate || new Date(),
        onSelect: onMonthSelect
      } as MonthTableProps)
  );

  const changeView = (type?: 'year' | 'month'): void => {
    if (type) {
      // 这里会把当前的viewType存起来，提供给回退时候使用
      state.viewHistory.push(state.viewType);
      state.viewType = type;
    } else {
      const lastViewType = state.viewHistory.pop();
      state.viewType = lastViewType!;
    }
  };

  const handleNext = (type: 'year' | 'month') => {
    switch (state.viewType) {
      case 'month':
        // 当展示的是month table时，点击next操作，直接展示下一年
        state.year = ++state.year!;
        break;
      case 'year':
        // 当展示的是year table时，每次仅展示10年(如：2020~2029)
        // 切换下一年的时候，直接将起始和结束年份都加10就好了
        const { start, end } = state.yearRange;
        state.yearRange = {
          start: start + 10,
          end: end + 10
        };
        break;
      case 'date':
        if (type === 'month') {
          const { year, month } = getNextMonth(state.year!, state.month!);
          state.year = year;
          state.month = month;
        } else {
          state.year = ++state.year!;
        }
        break;
    }
  };

  const handlePrev = (type: 'year' | 'month') => {
    switch (state.viewType) {
      case 'month':
        // 当展示的是month table时，点击prev操作，直接展示上一年
        state.year = --state.year!;
        break;
      case 'year':
        // 当展示的是year table时，每次仅展示10年(如：2020~2029)
        // 切换上一年的时候，直接将起始和结束年份都减10就好了
        const { start, end } = state.yearRange;
        state.yearRange = {
          start: start - 10,
          end: end - 10
        };
        break;
      case 'date':
        if (type === 'month') {
          const { year, month } = getLastMonth(state.year!, state.month!);
          state.year = year;
          state.month = month;
        } else {
          state.year = --state.year!;
        }
        break;
    }
  };

  const onDateInput = (date: IDateRange | Date) => {
    if (!unref(showTimePanel)) {
      emitData(date);
    } else {
      state.selection.date = date as Date;
    }
  };

  const onSelectingRangeUpdate = (range: ISelectingRange) => {
    if (props.type === 'week') {
      state.selectingRange = {
        ...range,
        active: true
      };
    }
  };

  const onEnterTable = () => {
    const selectingRange = state.selectingRange;
    if (selectingRange && (selectingRange.startDate || selectingRange.endDate)) {
      state.selectingRange = {
        ...selectingRange,
        active: true
      };
    }
  };

  const onLeaveTable = () => {
    // 当鼠标离开date table而没有触发click事件时，
    // 应该将endDate变成空
    state.selectingRange = {
      ...state.selectingRange,
      endDate: undefined,
      active: false
    };
  };

  const onYearSelect = (year: number) => {
    state.year = year;

    if (props.type === 'year') {
      const date = new Date((state.selection.date || new Date()).getTime());
      date.setFullYear(year);
      emitData(date);
    } else {
      changeView();
    }
  };

  const onMonthSelect = (month: number) => {
    state.month = month;

    if (props.type === 'month') {
      const date = new Date((state.selection.date || new Date()).getTime());
      date.setFullYear(state.year!);
      date.setMonth(month);
      emitData(date);
    } else {
      changeView();
    }
  };

  const emitData = (date: IDateRange | Date) => {
    // v-model update
    emit(UPDATE_MODEL_EVENT, date);

    if (props.type !== 'week') {
      if ((date as Date).getTime() !== new Date(props.modelValue as Date).getTime()) {
        emit(CHANGE_EVENT, date);
      }
    } else {
      // 当startDate, endDate发生变化的时候，触发change
      const { startDate: start, endDate: end } = date as IDateRange;
      const { startDate, endDate } = props.modelValue as IDateRange;
      if (!(startDate && endDate && startDate.getTime() === start.getTime() && endDate.getTime() === end.getTime())) {
        emit(CHANGE_EVENT, date);
      }
    }
  };

  const resetView = (): void => {
    const type = props.type;
    let value = props.modelValue;
    let selection;
    let date: Date;
    if (type === 'week') {
      value = (value || {}) as IDateRange;
      selection = {
        type: 'week',
        startDate: value.startDate ? new Date(value.startDate) : value.startDate,
        endDate: value.endDate ? new Date(value.endDate) : value.endDate
      };
      date = selection.startDate || new Date();
    } else {
      selection = {
        type: 'date',
        date: isValidDate(value as Date) ? new Date(value as Date) : undefined
      };
      date = selection.date || new Date();
    }

    state.selection = selection as ISelection;
    state.year = date.getFullYear();
    state.month = date.getMonth();
    state.time = date;
    state.viewType = type === 'month' || type === 'year' ? type : 'date';

    if (showTimePanel.value) {
      // TODO:
    }
  };

  const updateDate = (date: Date) => {
    if (date) {
      state.year = date.getFullYear();
      state.month = date.getMonth();
    } else {
      const today = new Date();
      state.year = today.getFullYear();
      state.month = today.getMonth();
    }
  };

  // 当selection date变化时更新year/month
  watch(() => state.selection.date as Date, updateDate);
  // 当selection startDate变化时更新year/month
  watch(() => state.selection?.startDate as Date, updateDate);
  // 当year变化时更新year range
  watch(
    () => state.year,
    (year) => {
      state.yearRange = getYearRange(+year!);
    }
  );
  watch(() => props.type, resetView);
  watch(() => props.modelValue, resetView);

  onMounted(() => {
    resetView();
  });

  return {
    showDateTable,
    showYearTable,
    showMonthTable,
    showTimePanel,
    pickerHeaderProps,
    dateTableProps,
    yearTableProps,
    monthTableProps
  };
};
