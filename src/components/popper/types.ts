import type { ComputedRef, CSSProperties, ExtractPropTypes, PropType, Ref, WritableComputedRef } from 'vue';
import type { Instance, Options, Placement, PositioningStrategy } from '@popperjs/core';
import type { RefElement } from '@components/base';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}

export type EmitType = 'update:visible' | 'after-enter' | 'after-leave' | 'before-enter' | 'before-leave';
export type Offset = [number, number] | number;
export type TriggerType = 'click' | 'hover' | 'focus';
export type Trigger = TriggerType | TriggerType[];

export const popperProps = {
  arrowOffset: {
    type: Number,
    default: 5
  },
  appendToBody: {
    type: Boolean,
    default: true
  },
  autoClose: {
    type: Number,
    default: 0 // 0表示不使用自动关闭
  },
  content: {
    type: String,
    default: ''
  },
  prefixCls: {
    type: String,
    default: 'yoga-popper'
  },
  class: Object,
  style: Object,
  hideAfter: {
    type: Number,
    default: 200
  },
  showAfter: {
    type: Number,
    default: 200
  },
  disabled: Boolean,
  theme: {
    type: String as PropType<Theme>,
    default: Theme.LIGHT
  },
  enterable: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Number,
    default: 8
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom' as Placement
  },
  popperClass: {
    type: String,
    default: ''
  },
  popperStyle: {
    type: Object,
    default: (): CSSProperties => ({})
  },
  pure: Boolean,
  popperOptions: {
    type: Object as PropType<Partial<Options>>
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  strategy: {
    type: String as PropType<PositioningStrategy>,
    default: 'fixed' as PositioningStrategy
  },
  transition: {
    type: String,
    default: 'yoga-fade-in-linear'
  },
  trigger: {
    type: String as PropType<Trigger>,
    default: 'hover' as Trigger
  },
  visible: {
    type: Boolean,
    default: undefined
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  fallbackPlacements: {
    type: Array as PropType<Placement[]>,
    default: (): Placement[] => []
  }
};

export type PopperProps = ExtractPropTypes<typeof popperProps>;

export interface PopperEvent {
  onClick?: (e: Event) => void;
  onMouseenter?: (e: Event) => void;
  onMouseleave?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IPopperState {
  popperId: string;
  popperRef: Ref<RefElement>;
  popperInstance: Ref<Instance | null>;
  computedPopperStyle: Ref<CSSProperties>;
  events: PopperEvent;
  visibility: WritableComputedRef<boolean>;
  arrowRef: Ref<RefElement>;
  triggerRef: Ref<RefElement>;
  isManualMode: ComputedRef<boolean>;
  initPopper: () => void;
  hide: () => void;
  doDestroy: (forceDestroy?: boolean) => void;
  onPopperMouseEnter: () => void;
  onPopperMouseLeave: () => void;
}

export interface PopperState {
  visible: boolean;
  computedPopperStyle: CSSProperties;
}
