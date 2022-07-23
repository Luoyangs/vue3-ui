import { ref, unref } from 'vue';
import { SCROLLBAR_WIDTH } from '@components/scrollbar/types';
import type { Ref } from 'vue';

export default function useOffset(wrapper: Ref<HTMLElement>, heightSize: Ref<number>, widthSize: Ref<number>) {
  const offsetX = ref(0);
  const offsetY = ref(0);

  const updateOffset = () => {
    const wrapperEl = unref(wrapper);
    const widthSizeValue = widthSize.value;
    const heightSizeValue = heightSize.value;

    if (heightSizeValue !== 0) {
      let clientHeight = wrapperEl.clientHeight;
      let scrollHeight = wrapperEl.scrollHeight;
      if (widthSizeValue !== 0) {
        clientHeight -= SCROLLBAR_WIDTH;
        scrollHeight -= SCROLLBAR_WIDTH;
      }
      if (scrollHeight !== clientHeight) {
        offsetY.value = wrapperEl.scrollTop * ((clientHeight - heightSizeValue) / (scrollHeight - clientHeight));
      } else {
        offsetY.value = 0;
      }
    }

    if (widthSizeValue !== 0) {
      let clientWidth = wrapperEl.clientWidth;
      let scrollWidth = wrapperEl.scrollWidth;
      if (heightSizeValue !== 0) {
        clientWidth -= SCROLLBAR_WIDTH;
        scrollWidth -= SCROLLBAR_WIDTH;
      }
      if (scrollWidth !== clientWidth) {
        offsetX.value = wrapperEl.scrollLeft * ((clientWidth - widthSizeValue) / (scrollWidth - clientWidth));
      } else {
        offsetX.value = 0;
      }
    }
  };

  return {
    offsetX,
    offsetY,
    updateOffset
  };
}
