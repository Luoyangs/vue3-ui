import { isFunction } from '@utils/helper';
import { ref } from 'vue';

export function useInput(handleInput: (event: InputEvent) => void) {
  const isComposing = ref<boolean>(false);

  const handleCompositionStart = () => {
    isComposing.value = true;
  };

  const handleCompositionUpdate = (e: CompositionEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const lastCharacter = value[value.length - 1] || '';
    isComposing.value = !!lastCharacter;
  };

  const handleCompositionEnd = (e: InputEvent) => {
    if (isComposing.value) {
      isComposing.value = true;

      if (isFunction(handleInput)) {
        handleInput(e);
      }
    }
  };

  return {
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd
  };
}
