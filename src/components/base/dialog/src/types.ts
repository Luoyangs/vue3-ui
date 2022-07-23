import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue';
import type { GetContainer } from '@components/base/portal';

export type DialogNode = string | JSX.Element | (() => JSX.Element) | VNode;

export const dialogProps = {
  keyboard: {
    type: Boolean,
    default: true
  },
  closeable: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  afterClose: Function as PropType<() => any>,
  mask: {
    type: Boolean,
    default: true
  },
  maskCloseable: Boolean,
  onMaskClick: Function as PropType<() => any>,
  visible: Boolean,
  destroyOnClose: Boolean,
  mousePosition: Object as PropType<{
    x: number;
    y: number;
  }>,
  title: [String, Object, Function] as PropType<DialogNode>,
  footer: [String, Object, Function] as PropType<DialogNode>,
  transitionName: String,
  maskTransitionName: String,
  wrapStyle: Object as PropType<CSSProperties>,
  bodyStyle: Object as PropType<CSSProperties>,
  maskStyle: Object as PropType<CSSProperties>,
  prefixCls: {
    type: String,
    required: true
  },
  wrapClassName: String,
  width: [String, Number],
  height: [String, Number],
  zIndex: Number,
  bodyProps: Object,
  maskProps: Object,
  wrapProps: Object,
  getContainer: {
    type: [String, Function] as PropType<GetContainer>,
    default: 'body'
  },
  dialogStyle: Object as PropType<CSSProperties>,
  dialogClassName: String,
  closeIcon: [String, Object, Function] as PropType<DialogNode>,
  forceRender: Boolean,
  getOpenCount: Function as PropType<() => number>,
  focusTriggerAfterClose: Boolean,
  onClose: Function as PropType<(e: MouseEvent | KeyboardEvent) => void>,
  modalRender: Function as PropType<(arg: { originNode: VNode | JSX.Element | null }) => VNode | JSX.Element | null>
};

export type IDialogChildProps = Partial<ExtractPropTypes<typeof dialogProps>>;
