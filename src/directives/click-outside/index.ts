import { isArray, isServer } from '@utils/helper';
import type { Nullable } from '@components/base';
import type { FlushList, DocumentHandler } from '@directives/click-outside/types';
import type { DirectiveBinding, ComponentPublicInstance, ObjectDirective } from 'vue';

const nodeList: FlushList = new Map();
let startClick: MouseEvent;

if (!isServer) {
  document.addEventListener('mousedown', (e: MouseEvent) => {
    startClick = e;
  });
  document.addEventListener('mouseup', (e: MouseEvent) => {
    for (const handlers of nodeList.values()) {
      for (const { documentHandler } of handlers) {
        documentHandler(e, startClick);
      }
    }
  });
}

function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding): DocumentHandler {
  let excludes: HTMLElement[] = [];
  if (isArray(binding.arg)) {
    excludes = binding.arg;
  } else if ((binding.arg as unknown) instanceof HTMLElement) {
    excludes.push(binding.arg as unknown as HTMLElement);
  }

  return (mouseup, mousedown) => {
    const popperRef = (
      binding.instance as ComponentPublicInstance<{
        popperRef: Nullable<HTMLElement>;
      }>
    ).popperRef;
    const mouseupTarget = mouseup.target as Node;
    const mousedownTarget = mousedown.target as Node;
    const isTargetExists = !mouseupTarget || !mousedownTarget;
    const isBound = !binding || !binding.instance;
    const isContainedByEl = el.contains(mouseupTarget) || el.contains(mousedownTarget);
    const isSelf = el === mouseupTarget;
    const isTargetExcluded =
      (excludes.length && excludes.some((item) => item?.contains(mouseupTarget))) ||
      (excludes.length && excludes.some((item) => item?.contains(mousedownTarget)));
    const isContainedByPopper = popperRef && (popperRef.contains(mouseupTarget) || popperRef.contains(mousedownTarget));

    if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) {
      return;
    }

    binding.value(mouseup, mousedown);
  };
}

const ClickOutside: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }

    nodeList.get(el)?.push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    });
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }

    // 从nodeList中找到el, 如果存在，则用新的方法替换旧的方法
    const handlers = nodeList.get(el);
    if (!handlers) {
      return;
    }
    const oldHandlerIndex = handlers.findIndex((item) => item.bindingFn === binding.oldValue);
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value // binding.value 传入ClickOutside的value, 是一个回调函数
    };

    if (oldHandlerIndex > -1) {
      handlers.splice(oldHandlerIndex, 1, newHandler);
    } else {
      handlers.push(newHandler);
    }
  },
  unmounted(el: HTMLElement) {
    nodeList.delete(el);
  }
};

export default ClickOutside;
