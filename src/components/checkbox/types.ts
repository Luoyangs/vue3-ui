import { UI_SIZE_PROP } from '@components/base';
import type { Ref, ExtractPropTypes, PropType, ComputedRef, CSSProperties } from 'vue';

export type IModelType = boolean | string | number;

export const checkboxProps = {
  /** v-model的绑定 */
  modelValue: {
    type: [Boolean, String, Number] as PropType<IModelType>,
    default: null // 必须显示指定default为null, 否则默认的modelValue为false
  },
  /** 用于group时才有效 */
  value: [Boolean, String, Number] as PropType<IModelType>,
  indeterminate: Boolean,
  disabled: Boolean,
  /** native prop, 用于实现多选一 */
  name: String
};

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;
export interface CheckboxState {
  selfModel: boolean;
  labelStyles: Record<string, string>;
}
export interface UseCheckbox {
  labelRef: Ref<null | HTMLDivElement>;
  selfModel: Ref<boolean>;
  labelStyles: Ref<Record<string, string>>;
  isDisabled: ComputedRef<boolean>;
  checkedValue: ComputedRef<IModelType>;
  checkboxClass: ComputedRef<CSSProperties>;
  fixedLabelStyle: ComputedRef<Record<string, string>>;

  handleValueChange: (e: Event) => void;
}

export const checkboxGroupProps = {
  modelValue: {
    type: Array as PropType<Array<IModelType>>,
    default: (): IModelType[] => []
  },
  vertical: Boolean,
  size: UI_SIZE_PROP,
  type: {
    type: String,
    validator: (value: string): boolean => ['solid', 'outline'].indexOf(value) >= 0
  },
  disabled: Boolean,
  fixedWidth: Number // 固定每一个checkbox的宽度
};

export interface CheckboxEventParams {
  /** checkbox props value */
  key: IModelType;
  /** checkbox checked value */
  value: boolean;
}
export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>;
export type CheckboxGroupMittEvent = {
  checkboxChange: CheckboxEventParams;
};
export const CheckboxGroupKey = 'YCheckboxGroup';
export type CheckboxGroupContext = CheckboxGroupProps & {
  changeEvent: (params: CheckboxEventParams) => void;
};
