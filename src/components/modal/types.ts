import { dialogProps, UI_SIZE_PROP } from '@components/base';
import type { DialogNode } from '@components/base';
import type { ExtractPropTypes, PropType } from 'vue';
import type { ButtonProps } from '@components/button';

export const modalProps = {
  ...dialogProps,
  prefixCls: {
    type: String,
    default: 'yoga-modal'
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  onConfirm: Function as PropType<(e?: MouseEvent) => void>,
  onCancel: Function as PropType<(e?: MouseEvent) => void>,
  'onUpdate:visible': Function as PropType<(visible: boolean) => void>,
  onChange: Function as PropType<(visible: boolean) => void>,
  width: {
    type: [String, Number],
    default: 520
  },
  size: UI_SIZE_PROP,
  showConfirm: {
    type: Boolean,
    default: true
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  confirmButtonProps: Object as PropType<Partial<ButtonProps>>,
  cancelButtonProps: Object as PropType<Partial<ButtonProps>>,
  transitionName: {
    type: String,
    default: 'zoom'
  },
  zIndex: {
    type: Number,
    default: 999
  },
  maskTransitionName: {
    type: String,
    default: 'fade'
  }
};

export type ModalProps = ExtractPropTypes<typeof modalProps>;

const modalFuncProps = {
  ...modalProps,
  content: [String, Object, Function] as PropType<DialogNode>
};

export type ModalFuncProps = ExtractPropTypes<typeof modalFuncProps>;

export type ModalFuncCallbackFun = (e?: MouseEvent | KeyboardEvent) => boolean | Promise<boolean>;

const modalFuncRenderProps = {
  ...modalFuncProps,
  type: String,
  onClose: Function as PropType<ModalFuncCallbackFun>,
  onConfirm: Function as PropType<ModalFuncCallbackFun | ((e?: MouseEvent) => ModalFuncCallbackFun)>,
  onCancel: Function as PropType<ModalFuncCallbackFun>
};

export type ModalFuncRenderProps = ExtractPropTypes<typeof modalFuncRenderProps>;
