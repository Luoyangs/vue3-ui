let raf = (callback: FrameRequestCallback) => +setTimeout(callback, 16);
let caf = (num: number) => clearTimeout(num);

if (typeof window !== 'undefined' && Reflect.has(window, 'requestAnimationFrame')) {
  raf = (callback: FrameRequestCallback) => window.requestAnimationFrame(callback);
  caf = (handle: number) => window.cancelAnimationFrame(handle);
}

let rafId = 0;
const rafIds = new Map<number, number>();

function cleanup(id: number) {
  rafIds.delete(id);
}

export default function wrapperRaf(callback: () => void, timer = 1): number {
  rafId++;
  const id = rafId;

  function callRaf(leftTimes: number) {
    if (leftTimes === 0) {
      cleanup(id);

      callback();
    } else {
      const realId = raf(() => {
        callRaf(leftTimes - 1);
      });

      rafIds.set(id, realId);
    }
  }

  callRaf(timer);

  return id;
}

wrapperRaf.cancel = (id: number) => {
  const realId = rafIds.get(id);
  cleanup(realId);
  return caf(realId);
};
