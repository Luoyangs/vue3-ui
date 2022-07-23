import { toRefs, inject, nextTick, ref, reactive, computed, getCurrentInstance, watch } from 'vue';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@components/base';
import { CheckboxGroupKey } from '@components/checkbox/types';
import { isNumber } from '@utils/helper';
import { useNamespace } from '@hooks/useNamespace';
import type { ComponentInternalInstance, CSSProperties } from 'vue';
import type { UseCheckbox, CheckboxState, CheckboxProps, CheckboxGroupContext } from '@components/checkbox/types';

export const useCheckbox = (props: CheckboxProps): UseCheckbox => {
  const ns = useNamespace('checkbox');
  const { emit } = getCurrentInstance() as ComponentInternalInstance;
  const { indeterminate } = toRefs(props);
  const checkboxGroup = inject<CheckboxGroupContext | null>(CheckboxGroupKey, null);
  const labelRef = ref<null | HTMLDivElement>(null);
  const state = reactive<CheckboxState>({
    selfModel: false,
    labelStyles: {}
  });
  const checkedValue = computed(() => {
    if (checkboxGroup) {
      return checkboxGroup.modelValue.includes(props.value!);
    }

    return props.modelValue ?? state.selfModel;
  });
  const isDisabled = computed(() => (checkboxGroup ? checkboxGroup.disabled || props.disabled : props.disabled));
  const checkboxClass = computed(() => {
    return {
      [ns.b()]: true,
      [ns.m('disabled')]: isDisabled.value,
      [ns.m('checked')]: checkedValue.value,
      [ns.m('indeterminate')]: indeterminate.value
    } as CSSProperties;
  });
  const fixedLabelStyle = computed(() => {
    if (checkboxGroup && isNumber(checkboxGroup.fixedWidth)) {
      return {
        width: `${checkboxGroup.fixedWidth!}px`,
        'min-width': `${checkboxGroup.fixedWidth!}px`,
        'max-width': `${checkboxGroup.fixedWidth!}px`
      };
    }

    return {} as Record<string, string>;
  });
  function updateLabelStyle() {
    nextTick(() => {
      if (
        checkboxGroup &&
        typeof checkboxGroup.fixedWidth === 'number' &&
        (labelRef.value?.scrollHeight as number) > 20
      ) {
        state.labelStyles = {
          'vertical-align': 'top'
        };
      }
    });
  }

  watch(() => checkboxGroup, updateLabelStyle, {
    deep: true,
    immediate: true
  });

  function handleValueChange(e: Event) {
    if (isDisabled.value) {
      return;
    }

    const target = e.target as HTMLInputElement;
    const value = target.checked;
    if (checkboxGroup) {
      checkboxGroup.changeEvent({
        key: props.value!,
        value
      });
      return;
    }

    emit(CHANGE_EVENT, value);
    emit(UPDATE_MODEL_EVENT, value);
    state.selfModel = value;
  }

  return {
    ...toRefs(state),
    labelRef,
    isDisabled,
    checkedValue,
    checkboxClass,
    fixedLabelStyle,

    handleValueChange
  };
};
