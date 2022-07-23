import { computed, getCurrentInstance, reactive, ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import useResizeObserver from '@hooks/useResizeObserver';
import type { Popper } from '@components/popper';
import type { ComponentInternalInstance, Ref } from 'vue';
import type { SelectProps } from '../types';

export function useSelect(props: SelectProps) {
  const { emit } = getCurrentInstance() as ComponentInternalInstance;
  const state = reactive({
    expanded: false,
    isFocus: false,
    softFocus: false,
    hoveringIndex: -1,
    popperSize: -1,
    selectedLabel: '',
    displayInputValue: ''
  });
  const popperRef = ref<InstanceType<typeof Popper> | null>(null);
  const inputRef = ref<HTMLInputElement | null>(null);
  const selectorRef = ref<HTMLInputElement | null>(null);
  const popperVisible = computed(() => state.expanded);
  const currentPlaceholder = computed(() => state.selectedLabel || props.placeholder);
  const hasModelValue = computed(() => {
    return props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== '';
  });
  let stopResizeObserver: () => void;

  const togglePopper = () => {
    if (!props.disabled) {
      if (state.isFocus) {
        state.softFocus = true;
      }

      nextTick(() => {
        state.expanded = !state.expanded;
        inputRef.value?.focus();
      });
    }
  };

  const calculatePopperSize = () => {
    state.popperSize = selectorRef.value?.getBoundingClientRect().width || 200;
  };

  const handleClose = () => {
    state.expanded = false;
  };

  const handleInput = (e: Event) => {
    console.log('handleInput', (e.target as HTMLInputElement).value);
    state.displayInputValue = (e.target as HTMLInputElement).value;
  };

  const handleFocus = (event: FocusEvent) => {
    const focused = state.isFocus;
    state.isFocus = true;

    if (!state.softFocus) {
      if (!focused) { // 避免重复触发focus
        emit('focus', event);
      }
    } else {
      state.softFocus = false;
    }
  };

  watch(
    () => props.modelValue,
    (val) => {
      console.log('hasModelValuexx', val);
      if (hasModelValue.value) {
        console.log('hasModelValue', val);
      }
    }
  );

  onMounted(() => {
    ({ stop: stopResizeObserver } = useResizeObserver(inputRef as Ref<HTMLElement>, calculatePopperSize));
  });

  onBeforeUnmount(() => {
    stopResizeObserver?.();
  });

  return {
    state,
    inputRef,
    popperRef,
    selectorRef,
    popperVisible,
    currentPlaceholder,
    togglePopper,
    handleInput,
    handleFocus,
    handleClose,
  };
}
