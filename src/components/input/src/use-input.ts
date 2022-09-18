import { computed, inject, toRefs } from 'vue';
import { FormItemKey } from '@components/form/types';
import { RESTRICTION_TYPE } from '@components/input/types';
import { isPlainObject } from '@utils/helper';
import { lengthOf } from '@components/input/src/util';
import { useNamespace } from '@hooks/useNamespace';
import type { FormItemContext } from '@components/form/types';
import type { InputProps, InputState, InputComputedState } from '@components/input/types';

export const useComputedState = (props: InputProps, state: InputState): InputComputedState => {
  const ns = useNamespace('input');
  const formItem = inject(FormItemKey, {} as FormItemContext);
  const size = computed(() => formItem?.size || props.size);
  const innerClass = computed(() => {
    return {
      [ns.e('inner')]: true,
      [ns.em('inner', 'focused')]: state.focused,
      [ns.em('inner', 'disabled')]: props.disabled,
      [ns.em('inner', 'error')]: props.error,
      [ns.em('inner', size.value)]: !!size.value,
      [ns.em('inner', 'active-clearable')]:
        props.clearable && !!state.currentValue && String(state.currentValue).length > 0
    };
  });
  const textareaStyle = computed(() => ({ ...state.textareaCalcStyle, resize: props.resize })); // 这里后面尝试放在初始化里完成
  const isWordLimitVisible = computed(() => {
    return (
      props.showWordLimit &&
      !!props.maxlength &&
      (props.type === 'text' || props.type === 'textarea') &&
      !props.disabled
    );
  });
  const textLength = computed(() => {
    const currentValue = (state.currentValue || '').toString();
    return props.unicodeNormalized ? lengthOf(currentValue) : currentValue.length;
  });
  const isNumber = computed(() => props.type === 'numeric');
  const computedRestrictionType = computed(() => (isNumber.value ? RESTRICTION_TYPE.VALUE : props.restrictionType));
  const computedRestriction = computed(() => {
    if (props.restriction) {
      return props.restriction;
    }

    if (isNumber.value) {
      const precision = props.precision;
      const decimalExp = precision === 0 ? '' : '\\.{0,1}';
      const rangExp = precision === undefined ? '*' : `{0,${precision}}`;
      return new RegExp(`^-?(\\d+${decimalExp}\\d${rangExp})?$`);
    }

    return undefined;
  });
  const computedPlaceholder = computed(() => {
    const numberBase = 0;
    return props.placeholder || (isNumber.value ? numberBase.toFixed(props.precision) : '');
  });
  const nativeProps = computed(() => {
    const propMaps: Record<string, any> = {};
    // remove below props when using v-bind at native input
    const removeProps = [
      'error',
      'errorMessage',
      'prefixLabel',
      'prefixIcon',
      'suffixLabel',
      'suffixIcon',
      'restriction',
      'restrictionType',
      'size',
      'modelValue',
      'unicodeNormalized',
      'isRound',
      'helpText',
      'lazy',
      'showWordLimit',
      'precision',
      'autosize',
      'beforeClear',
      'clearable',
      'disabled',
      'size',
      'type',
      'min',
      'max'
    ];
    if (props.unicodeNormalized) {
      removeProps.push('maxlength');
    }

    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        if (removeProps.indexOf(key) === -1) {
          const value = props[key as keyof InputProps];
          propMaps[key] = isPlainObject(value) ? Object.assign({}, value) : value;
        }
      }
    }
    return propMaps;
  });

  return {
    ...toRefs(state),
    formItem,
    isNumber,
    innerClass,
    textLength,
    textareaStyle,
    nativeProps,
    isWordLimitVisible,
    computedRestriction,
    computedRestrictionType,
    computedPlaceholder
  };
};
