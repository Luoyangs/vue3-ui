import { watch } from 'vue';
import type { Ref } from 'vue';

export default function useResizeObserver(
  target: Ref<HTMLElement>,
  callback: ResizeObserverCallback,
  options: ResizeObserverOptions = {}
) {
  let observer: ResizeObserver | null;
  const isSupported = window && 'ResizeObserver' in window;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  const stopWatch = watch(
    () => target.value,
    (el: HTMLElement) => {
      cleanup();

      if (isSupported && el) {
        observer = new window.ResizeObserver(callback);
        observer.observe(el, options);
      }
    },
    { immediate: true, flush: 'post' }
  );

  const stop = () => {
    cleanup();
    stopWatch();
  };

  return {
    isSupported,
    stop
  };
}
