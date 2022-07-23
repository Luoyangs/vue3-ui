import { ref, unref } from 'vue';
import { MIN_SCROLL_THUMB_WIDTH, SCROLLBAR_WIDTH } from '@components/scrollbar/types';
import type { Ref } from 'vue';

export default function useBarSize(wrapper: Ref<HTMLElement>, layout: string) {
  const heightSize = ref(0);
  const widthSize = ref(0);

  const updateBarSize = () => {
    const wrapperEle = unref(wrapper);

    if (!wrapperEle) {
      return;
    }

    if (layout.indexOf('vertical') > -1) {
      let clientHeight = wrapperEle.clientHeight;
      let scrollHeight = wrapperEle.scrollHeight;
      if (heightSize.value !== 0) {
        clientHeight -= SCROLLBAR_WIDTH;
        scrollHeight -= SCROLLBAR_WIDTH;
      }

      let _heightSize = scrollHeight ? clientHeight * (clientHeight / scrollHeight) : 0;
      if (_heightSize <= MIN_SCROLL_THUMB_WIDTH) {
        _heightSize = MIN_SCROLL_THUMB_WIDTH;
      }
      if (_heightSize >= clientHeight) {
        _heightSize = 0;
      }

      heightSize.value = _heightSize;
    }

    if (layout.indexOf('horizontal') > -1) {
      let clientWidth = wrapperEle.clientWidth;
      let scrollWidth = wrapperEle.scrollWidth;
      if (widthSize.value !== 0) {
        clientWidth -= SCROLLBAR_WIDTH;
        scrollWidth -= SCROLLBAR_WIDTH;
      }

      let _widthSize = scrollWidth ? clientWidth * (clientWidth / scrollWidth) : 0;
      if (_widthSize <= MIN_SCROLL_THUMB_WIDTH) {
        _widthSize = MIN_SCROLL_THUMB_WIDTH;
      }
      if (_widthSize >= clientWidth) {
        _widthSize = 0;
      }

      widthSize.value = _widthSize;
    }
  };

  return {
    widthSize,
    heightSize,
    updateBarSize
  };
}
