import { UI_SIZE_PROP } from '@components/base';
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue';

export const selectProps = {
  modelValue: [Array, String, Number, Boolean, Object] as PropType<
    any[] | string | number | boolean | Record<string, any> | any
  >,
  autocomplete: {
    type: String as PropType<'none' | 'both' | 'list' | 'inline'>,
    default: 'none'
  },
  clearable: Boolean,
  disabled: Boolean,
  size: UI_SIZE_PROP,
  filterable: Boolean,
  filterMethod: Function,
  height: {
    type: Number,
    default: 170 // 5 items by default
  },
  itemHeight: {
    type: Number,
    default: 34
  },
  multiple: Boolean,
  multipleLimit: {
    type: Number,
    default: 0
  },
  name: String,
  placeholder: String,
  noDataText: String,
  noMatchText: String,
  popperAppendToBody: Boolean,
  popperClass: {
    type: String,
    default: ''
  },
  valueKey: {
    type: String,
    default: 'value'
  }
};

export type SelectProps = ExtractPropTypes<typeof selectProps>;

export interface ListItem {
  offset: number;
  size: number;
}

export const commonListProps = {
  data: {
    type: Array,
    required: true
  },
  cache: {
    type: Number,
    default: 2
  },
  total: {
    type: Number,
    required: true
  },
  itemSize: {
    type: Number as PropType<number>,
    required: true
  },
  width: {
    type: Number,
    default: 240
  },
  height: {
    type: Number,
    default: 170
  },
  initScrollOffset: Number,
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  }
};

export type CommonListProps = ExtractPropTypes<typeof commonListProps>;
