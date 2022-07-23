import { ref } from 'vue';

export default function useScrollInfo() {
  const lastScrollLeft = ref(0);
  const lastScrollTop = ref(0);
  const lastScrollTime = ref(0);

  const calScrollInfo = (e: MouseEvent) => {
    if (e) {
      const now = +new Date();
      const scrollEle = e.target as HTMLElement;
      const x = scrollEle.scrollLeft;
      const y = scrollEle.scrollTop;
      const dx = x - lastScrollLeft.value;
      const dy = y - lastScrollTop.value;

      let dt = now - lastScrollTime.value;
      if (!lastScrollTime.value || dt > 1000) {
        dt = 1000;
      }
      lastScrollTime.value = now;
      lastScrollLeft.value = x;
      lastScrollTop.value = y;

      return {
        x,
        y,
        vx: Number((dx / dt).toFixed(2)),
        vy: Number((dy / dt).toFixed(2))
      };
    }
  };

  return {
    calScrollInfo
  };
}
