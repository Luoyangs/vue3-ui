import { h, defineComponent, computed, reactive, ref, unref, nextTick, withDirectives } from 'vue';
import dayjs from 'dayjs';
import { ClickOutside } from '@directives';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import CalendarIcon from '@components/base/icons/src/Calendar';
import { isFunction, isPlainObject } from '@utils/helper';
import { Input } from '@components/input';
import { Popper } from '@components/popper';
import { Theme } from '@components/popper/types';
import DatePickerPanel from '@components/date-picker/src/renderers/panel-date-picker';
import DaterangePickerPanel from '@components/date-picker/src/renderers/panel-daterange-picker';
import { datePickerProps } from '@components/date-picker/types';
import { DATETIME_FORMAT, DATE_FORMAT, MONTH_FORMAT, YEAR_FORMAT } from '@components/date-picker/src/constants';
import type { SetupContext } from 'vue';
import type { InputProps } from '@components/input/types';
import type { IDateRange } from '@components/date-picker/src/renderers/table-date/types';
import type { DatePickerPanelProps } from '@components/date-picker/src/renderers/panel-date-picker';
import type { DaterangePickerPanelProp } from '@components/date-picker/src/renderers/panel-daterange-picker/types';
import type { DatePickerProps, DatePickerType, IFormat, EmitType } from '@components/date-picker/types';
import { useNamespace } from '@hooks/useNamespace';

export default defineComponent({
  name: 'YDatePicker',
  props: datePickerProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'range-input'],
  setup(props: DatePickerProps, { emit }: SetupContext<EmitType[]>) {
    const ns = useNamespace('date-picker');
    const refPopper = ref<typeof Popper>();
    const state = reactive({
      visible: false
    });
    const popperPanelRef = computed(() => {
      return refPopper.value?.popperRef;
    });
    const computedFormat = computed(() => {
      const format = props.format;
      const type = props.type;

      if (format) {
        return format;
      } else if (type.indexOf('time') > -1) {
        return DATETIME_FORMAT;
      } else if (type === 'month' || type === 'monthrange') {
        return MONTH_FORMAT;
      } else if (type === 'year' || type === 'yearrange') {
        return YEAR_FORMAT;
      }

      return DATE_FORMAT;
    });
    const inputProps = computed(
      () =>
        ({
          readonly: true,
          clearable: true,
          disabled: props.disabled,
          placeholder: props.placeholder,
          modelValue: displayValue.value,
          onClick: toggleVisible,
          onClear
        } as Partial<InputProps>)
    );
    const datePickerPanelProps = computed(
      () =>
        ({
          type: props.type,
          min: props.min,
          max: props.max,
          modelValue: props.modelValue, // TODO:
          disabled: props.disabledDate,
          startOfWeek: props.startOfWeek,
          showOverflowDate: props.showOverflowDate,
          'onUpdate:modelValue': onPickerInput,
          onChange: onPickerChange
        } as DatePickerPanelProps & {
          onChange: (val: IDateRange | Date) => void;
          'onUpdate:modelValue': (val: IDateRange | Date) => void;
        })
    );
    const isRangeType = computed(() => isRange(props.type));
    const daterangePickerPanelProps = computed(() => {
      return {
        type: props.type,
        min: props.min,
        max: props.max,
        fixed: props.fixed,
        modelValue: props.modelValue, // TODO:
        disabled: props.disabled,
        disabledDate: props.disabledDate,
        startOfWeek: props.startOfWeek,
        showOverflowDate: props.showOverflowDate,
        'onUpdate:modelValue': onPickerInput,
        onChange: onPickerChange,
        onRangeInput: onPickerRangeInput
      } as DaterangePickerPanelProp & {
        onChange: (val: IDateRange) => void;
        onRangeInput: (val: IDateRange) => void;
        'onUpdate:modelValue': (val: IDateRange) => void;
      };
    });
    const displayValue = computed(() => {
      if (!props.modelValue) {
        return '';
      }

      return formatValue(props.type, computedFormat.value, props.modelValue);
    });

    function formatValue(type: DatePickerType, format: IFormat, value: IDateRange | Date) {
      let label = '';

      if (isFunction(format)) {
        label = format(value as Date);
      } else if (type.indexOf('range') > -1 || type === 'week') {
        const rangeDate = value as IDateRange;

        if (rangeDate && rangeDate.startDate && rangeDate.endDate) {
          label = `${dayjs(rangeDate.startDate).format(format)}${props.rangeSeparator}${dayjs(rangeDate.endDate).format(
            format
          )}`;
        }
      } else {
        label = dayjs(value as Date).format(format);
      }

      return label;
    }

    function isRange(type: DatePickerType) {
      return type && type.indexOf('range') > -1;
    }

    const onPickerInput = (value: IDateRange | Date | null) => {
      emit(UPDATE_MODEL_EVENT, value);
      // TODO: 更新selected shortcut
      hidePicker();
    };

    const onPickerChange = (value: IDateRange | Date | null) => {
      emit(CHANGE_EVENT, value);
      // TODO: 更新FormItem event
    };

    const onPickerRangeInput = (selection: IDateRange) => {
      emit('range-input', selection);
    };

    const onClear = () => {
      if (props.fixed === 'start' && isPlainObject(props.modelValue) && (props.modelValue as IDateRange).startDate) {
        const newValue = { ...props.modelValue, endDate: undefined } as IDateRange | Date;
        onPickerInput(newValue);
        onPickerChange(newValue);
      } else if (props.fixed === 'end' && isPlainObject(props.modelValue) && (props.modelValue as IDateRange).endDate) {
        const newValue = { ...props.modelValue, startDate: undefined } as IDateRange | Date;
        onPickerInput(newValue);
        onPickerChange(newValue);
      } else {
        onPickerInput(null);
        onPickerChange(null);
      }
    };

    const toggleVisible = (): void => {
      if (props.disabled) {
        return;
      }

      state.visible ? hidePicker() : showPicker();
    };

    const hidePicker = (): void => {
      if (state.visible) {
        state.visible = false;
        // formItem.validate?.('field-blur', props.modelValue);
      }
    };

    const showPicker = (): void => {
      state.visible = true;
    };

    return () =>
      h('div', { class: ns.b() }, [
        h(
          Popper,
          {
            ref: 'refPopper',
            showArrow: false,
            theme: Theme.LIGHT,
            visible: state.visible,
            placement: props.placement,
            disabled: !!props.disabled,
            appendToBody: props.appendToBody
          },
          {
            trigger: () =>
              withDirectives(
                h(Input, inputProps.value, {
                  prefix: () => h(CalendarIcon)
                }),
                [[ClickOutside, hidePicker, popperPanelRef.value]]
              ),
            default: () =>
              h('div', {}, [
                // shortcuts
                // date-picker-panel
                unref(isRangeType)
                  ? h(DaterangePickerPanel, unref(daterangePickerPanelProps))
                  : h(DatePickerPanel, unref(datePickerPanelProps))
                // date-range-picker-panel
              ])
          }
        )
      ]);
  }
});
