import { h, defineComponent } from 'vue';
import { useLocale } from '@hooks/useLocale';
import { pickerHeaderProps } from '@components/date-picker/src/renderers/picker-header/types';
import ArrowLeft from '@components/base/icons/src/ArrowLeft';
import ArrowRight from '@components/base/icons/src/ArrowRight';
import DoubleArrowLeft from '@components/base/icons/src/DoubleArrowLeft';
import DoubleArrowRight from '@components/base/icons/src/DoubleArrowRight';
import type { SetupContext } from 'vue';
import type { EmitType, PickerHeaderProps } from '@components/date-picker/src/renderers/picker-header/types';

export default defineComponent({
  name: 'YDatePickerHeader',
  props: pickerHeaderProps,
  emits: ['month-click', 'year-click', 'next', 'prev'],
  setup(props: PickerHeaderProps, { emit }: SetupContext<EmitType[]>) {
    const prefixCls = 'yoga-date-picker-header';
    const iconCls = `${prefixCls}__icon`;
    const labelCls = `${prefixCls}__label`;
    const { t } = useLocale();

    const onPrevClick = (type: 'month' | 'year') => {
      if (props.disabled) {
        return;
      }

      if ((type === 'month' && props.hidePrevMonth) || (type === 'year' && props.hidePrevYear)) {
        return;
      }

      emit('prev', type);
    };

    const onNextClick = (type: 'month' | 'year') => {
      if (props.disabled) {
        return;
      }

      if ((type === 'month' && props.hideNextMonth) || (type === 'year' && props.hideNextYear)) {
        return;
      }

      emit('next', type);
    };

    const onLabelClick = (type: 'month' | 'year') => {
      if (props.disabled) {
        return;
      }

      emit(type === 'month' ? 'month-click' : 'year-click');
    };

    return () => {
      const viewType = props.viewType;

      return h('div', { class: prefixCls }, [
        h(DoubleArrowLeft, {
          class: [iconCls, `${prefixCls}__prev`, props.hidePrevYear || props.disabled ? 'disabled' : ''],
          onClick: () => onPrevClick('year')
        }),
        viewType === 'date'
          ? h(ArrowLeft, {
              class: [iconCls, `${prefixCls}__prev`, props.hidePrevMonth || props.disabled ? 'disabled' : ''],
              onClick: () => onPrevClick('month')
            })
          : null,
        viewType === 'date'
          ? h(
              'span',
              {
                class: [labelCls, props.disabled ? 'disabled' : 'clickable'],
                onClick: () => onLabelClick('month')
              },
              t(`ele.datepicker.fullmonths.${props.month}`)
            )
          : null,
        viewType === 'date' || viewType === 'month'
          ? h(
              'span',
              {
                class: [labelCls, props.disabled ? 'disabled' : 'clickable'],
                onClick: () => onLabelClick('year')
              },
              props.year + t('ele.datepicker.year')
            )
          : null,
        viewType === 'year'
          ? h(
              'span',
              {
                class: labelCls
              },
              props.yearRange.start + ' – ' + props.yearRange.end
            )
          : null,
        viewType === 'date'
          ? h(ArrowRight, {
              class: [iconCls, `${prefixCls}__next`, props.hideNextMonth || props.disabled ? 'disabled' : ''],
              onClick: () => onNextClick('month')
            })
          : null,
        h(DoubleArrowRight, {
          class: [iconCls, `${prefixCls}__next`, props.hideNextYear || props.disabled ? 'disabled' : ''],
          onClick: () => onNextClick('year')
        })
      ]);
    };
  }
});
