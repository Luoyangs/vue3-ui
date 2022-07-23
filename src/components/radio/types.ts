import { UI_SIZE_PROP } from '@components/base';
import type { ComputedRef, ExtractPropTypes, PropType } from 'vue';
import type { UISize } from '@components/base';

export const radioProps = {
  /** v-model的绑定 */
  modelValue: {
    type: [Boolean, String, Number],
    default: null // 必须显示指定default为null, 否则默认的modelValue为false
  },
  /** 当前radio value, 如果modelValue和value一致，则checked=true */
  value: {
    type: [Boolean, String, Number],
    default: true
  },
  /** native prop, 用于实现多选一 */
  name: String,
  /** 禁用 */
  disabled: Boolean
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;

export const radioGroupProps = {
  /** v-model的绑定 */
  modelValue: {
    type: [Boolean, String, Number],
    default: null
  },
  disabled: Boolean,
  vertical: Boolean,
  size: UI_SIZE_PROP,
  type: {
    type: String as PropType<'solid' | 'outline'>,
    validator: (value: string): boolean => ['solid', 'outline'].indexOf(value) >= 0
  }
};

export type IModelType = boolean | string | number;
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;
export type RadioGroupContext = RadioGroupProps & {
  name: string;
  changeEvent: (value: IModelType) => void;
};
export type RadioGroupMittEvent = {
  radioChange: IModelType;
};
export const RadioGroupKey = 'YogaRadioGroup';

export interface UseRadio {
  size: ComputedRef<'' | UISize>;
  isDisabled: ComputedRef<boolean>;
  checkedValue: ComputedRef<boolean>;
  handleValueChange: () => void;
}
