import { ref } from 'vue';
import type { Ref } from 'vue';

export default function useThumb() {
  const clickOffset = ref(0);

  /**
   * 计算当前鼠标点击点偏移的距离
   * @param e MouseEvent 当前鼠标点击的位置
   * @param vertical 是垂直还是水平滚动条
   * @param bar 滚动条的父元素
   */
  const updateThumbClickOffset = (e: MouseEvent, vertical: boolean, bar: Ref<HTMLElement>) => {
    const rootRect = bar.value?.getBoundingClientRect?.();
    if (vertical) {
      clickOffset.value = e.clientY - rootRect.top;
    } else {
      clickOffset.value = e.clientX - rootRect.left;
    }
  };

  return {
    clickOffset,
    updateThumbClickOffset
  };
}
