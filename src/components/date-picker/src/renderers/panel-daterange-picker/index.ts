import { h, defineComponent } from 'vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import { Button } from '@components/button';
import DatePickerHeader from '@components/date-picker/src/renderers/picker-header';
import DateTable from '@components/date-picker/src/renderers/table-date';
import renderMonthTable from '@components/date-picker/src/renderers/table-month';
import renderYearTable from '@components/date-picker/src/renderers/table-year';
import { useHook } from '@components/date-picker/src/renderers/panel-daterange-picker/use';
import { datarangePickerProps } from '@components/date-picker/src/renderers/panel-daterange-picker/types';
import type { SetupContext } from 'vue';
import type {
  EmitType,
  DaterangePickerPanelProp
} from '@components/date-picker/src/renderers/panel-daterange-picker/types';

export default defineComponent({
  name: 'YDaterangePickerPanel',
  props: datarangePickerProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT, 'range-input'],
  setup(props: DaterangePickerPanelProp, context: SetupContext<EmitType[]>) {
    const prefixCls = 'yoga-daterange-picker-panel';
    const {
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
    } = useHook(props, context);

    return () =>
      h('div', { class: prefixCls }, [
        h('div', { class: `${prefixCls}__main` }, [
          h('div', { class: `${prefixCls}__main-left` }, [
            // time panel
            h('div', { class: `${prefixCls}__date` }, [
              h(DatePickerHeader, leftHeaderProps.value),
              showLeftDateTable.value ? h(DateTable, leftDateTableProps.value) : null,
              showLeftYearTable.value ? renderYearTable(leftYearTableProps.value) : null,
              showLeftMonthTable.value ? renderMonthTable(leftMonthTableProps.value) : null
            ]),
            h('div', { class: `${prefixCls}__time` })
          ]),
          // right panel
          h('div', { class: `${prefixCls}__main-right` }, [
            // time panel
            h('div', { class: `${prefixCls}__date` }, [
              h(DatePickerHeader, rightHeaderProps.value),
              showRightDateTable.value ? h(DateTable, rightDateTableProps.value) : null,
              showRightYearTable.value ? renderYearTable(rightYearTableProps.value) : null,
              showRightMonthTable.value ? renderMonthTable(rightMonthTableProps.value) : null
            ]),
            h('div', { class: `${prefixCls}__time` })
          ])
        ]),
        // 如果显示time panel, 则需要加上confirm按钮确认
        showTimePanel.value
          ? h('div', { class: `${prefixCls}__actions` }, [h(Button, confirmBtnProps.value, 'confirm')])
          : null
      ]);
  }
});
