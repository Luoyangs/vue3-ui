import { h, defineComponent } from 'vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import DatePickerHeader from '@components/date-picker/src/renderers/picker-header';
import DateTable from '@components/date-picker/src/renderers/table-date';
import renderMonthTable from '@components/date-picker/src/renderers/table-month';
import renderYearTable from '@components/date-picker/src/renderers/table-year';
import { datePickerPanelProps } from '@components/date-picker/src/renderers/panel-date-picker/types';
import { useHook } from '@components/date-picker/src/renderers/panel-date-picker/use';
import { useNamespace } from '@hooks/useNamespace';
import type { SetupContext } from 'vue';
import type { DatePickerPanelProps } from '@components/date-picker/src/renderers/panel-date-picker/types';

export { DatePickerPanelProps };

export default defineComponent({
  name: 'YDatePickerPanel',
  props: datePickerPanelProps,
  emits: [UPDATE_MODEL_EVENT, CHANGE_EVENT],
  setup(props: DatePickerPanelProps, context: SetupContext) {
    const ns = useNamespace('date-picker-panel');
    const {
      showDateTable,
      showYearTable,
      showMonthTable,
      showTimePanel,
      pickerHeaderProps,
      dateTableProps,
      monthTableProps,
      yearTableProps
    } = useHook(props, context);

    return () =>
      h('div', { class: ns.b() }, [
        h('div', { class: ns.e('main') }, [
          h('div', { class: ns.e('date') }, [
            h(DatePickerHeader, pickerHeaderProps.value),
            showDateTable.value ? h(DateTable, dateTableProps.value) : null,
            showYearTable.value ? renderYearTable(yearTableProps.value) : null,
            showMonthTable.value ? renderMonthTable(monthTableProps.value) : null
          ]),
          showTimePanel.value ? h('div', { class: ns.e('time') }) : null
        ]),
        showTimePanel.value ? h('div', { class: ns.e('footer') }) : null
      ]);
  }
});
