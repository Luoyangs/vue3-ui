import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  withDirectives,
  Fragment,
  Transition
} from 'vue';
import { NOOP } from '@vue/shared';
import { Portal } from '@components/base';
import { popperProps } from '@components/popper/types';
import { ClickOutside } from '@directives';
import usePopper from '@components/popper/src/hook/use-popper';
import getTrigger from '@components/popper/src/renderers/trigger';
import type { SetupContext } from 'vue';
import type { EmitType, PopperProps } from '@components/popper/types';

export default defineComponent({
  name: 'YPopper',
  props: popperProps,
  emits: ['update:visible', 'after-enter', 'after-leave', 'before-enter', 'before-leave'],
  setup(props: PopperProps, { slots, emit }: SetupContext<EmitType[]>) {
    if (!slots.trigger) {
      throw new Error('[yoga-ui: Popper]: trigger must be provided');
    }

    const {
      popperRef,
      arrowRef,
      triggerRef,
      popperId,
      events,
      visibility,
      isManualMode,
      popperInstance,
      computedPopperStyle,
      hide,
      doDestroy,
      initPopper,
      onPopperMouseEnter,
      onPopperMouseLeave,
    } = usePopper(props);
    const forceDestroy = () => doDestroy(true);
    onMounted(initPopper);
    onActivated(initPopper);
    onBeforeUnmount(forceDestroy);
    onDeactivated(forceDestroy);
    
    return () => {
      const {
        pure,
        theme,
        style,
        prefixCls,
        class: className,
        content,
        showArrow,
        transition,
        popperStyle,
        popperClass,
        appendToBody,
        stopPopperMouseEvent
      } = props;
      const arrow = showArrow
        ? <div ref={arrowRef} class={`${prefixCls}__arrow`} />
        : null;
      const stop = (e: Event) => e.stopPropagation();
      const popperEvent = {
        onAfterEnter: () => {
          emit('after-enter');
        },
        onAfterLeave: () => {
          emit('after-leave');
        },
        onBeforeEnter: () => {
          emit('before-enter');
        },
        onBeforeLeave: () => {
          emit('before-leave');
        },
        onMouseenter: onPopperMouseEnter,
        onMousedown: stopPopperMouseEvent ? stop : NOOP,
        onMouseleave: onPopperMouseLeave
      }
      const popperNode = popperInstance.value || visibility.value ? (
        <Transition name={transition}>
          <div
            ref={popperRef}
            id={popperId}
            v-show={visibility.value}
            aria-hidden="false"
            {...popperEvent}
            style={{
              ...computedPopperStyle.value,
              ...popperStyle
            }}
            class={[popperClass, prefixCls, `is-${theme}`, pure ? 'is-pure' : '']}
          >
            {slots.default?.() || content}
            {arrow}
          </div>
        </Transition>
      ) : null;
      const triggerSlot = slots.trigger?.();
      const triggerProps = {
        'aria-describedby': popperId,
        class: className,
        style,
        ref: triggerRef,
        ...events
      };
      const triggerNode = getTrigger(triggerSlot!, triggerProps)
      const trigger = isManualMode
        ? triggerNode
        : withDirectives(triggerNode, [[ClickOutside, hide]]);

      return (
        <Fragment>
          {trigger}
          <Portal
            disabled={!appendToBody}
            prefixCls={prefixCls}
            visible={visibility.value}
            v-slots={{
              default: () => popperNode
            }}
          />
        </Fragment>
      );
    }
  }
});
