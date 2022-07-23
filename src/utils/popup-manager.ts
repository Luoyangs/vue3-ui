import type { Ref } from 'vue';

interface Instance {
  closeOnClickModal: Ref<boolean>;
  closeOnPressEscape: Ref<boolean>;
  close: () => void;
  handleClose?: () => void;
  handleAction?: (action: string) => void;
}

interface StackFrame {
  id: string;
  zIndex: number;
  modalClass: string;
}

interface IPopupManager {
  getInstance: (id: string) => Instance;
  zIndex: number;
  modalDom?: HTMLElement;
  modalFade: boolean;
  modalStack: StackFrame[];
  nextZIndex: () => number;
  register: (id: string, instance: Instance) => void;
  deregister: (id: string) => void;
  doOnModalClick?: () => void;
  openModal?: (id: string, zIndex: number, dom: HTMLElement, modalClass: string, modalFade: boolean) => void;
  closeModal?: (id: string) => void;
}

let zIndex = 1000;
const instances: Record<string, Instance | null> = {};
const PopupManager: IPopupManager = {
  modalFade: true,
  modalDom: undefined,
  modalStack: [],
  zIndex,

  getInstance(id) {
    return instances[id]!;
  },

  register(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },

  deregister(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },

  nextZIndex() {
    return ++PopupManager.zIndex;
  }
};

Object.defineProperty(PopupManager, 'zIndex', {
  configurable: true,
  get() {
    if (zIndex === undefined) {
      // 读取配置config里面的zIndex
      zIndex = 2000;
    }
    return zIndex;
  },
  set(value) {
    zIndex = value;
  }
});

export default PopupManager;
