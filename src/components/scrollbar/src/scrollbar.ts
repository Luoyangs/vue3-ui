import { h, defineComponent, ref, computed, provide, onMounted, onBeforeUnmount, watch } from 'vue';
import Bar from '@components/scrollbar/src/renderers/bar';
import useOffset from '@components/scrollbar/src/composition/useOffset';
import useBarSize from '@components/scrollbar/src/composition/useBarSize';
import useScrollInfo from '@components/scrollbar/src/composition/useScrollInfo';
import { scrollbarProps, SCROLLBAR_KEY, SCROLLBAR_WIDTH } from '@components/scrollbar/types';
import { scrollAnimation } from '@utils/dom';
import { useNamespace } from '@hooks/useNamespace';
import useResizeObserver from '@hooks/useResizeObserver';
import type { SetupContext, Ref, CSSProperties } from 'vue';
import type { ScrollbarProps, EmitType } from '@components/scrollbar/types';

export default defineComponent({
  name: 'YScrollbar',
  props: scrollbarProps,
  emits: ['scroll'],
  setup(props: ScrollbarProps, { slots, emit, expose }: SetupContext<EmitType[]>) {
    const ns = useNamespace('scrollbar');
    const wrapper: Ref<HTMLElement | null> = ref(null);
    const content: Ref<HTMLElement | null> = ref(null);
    const verticalBar: Ref<typeof Bar | null> = ref(null);
    const horizontalBar: Ref<typeof Bar | null> = ref(null);
    let stopResizeObserver: () => void;
    const { calScrollInfo } = useScrollInfo();
    const { widthSize, heightSize, updateBarSize } = useBarSize(wrapper as Ref<HTMLElement>, props.layout);
    const { offsetX, offsetY, updateOffset } = useOffset(wrapper as Ref<HTMLElement>, heightSize, widthSize);

    const showVerticalBar = computed(() => !props.hidden && props.layout.indexOf('vertical') > -1);
    const showHorizontalBar = computed(() => !props.hidden && props.layout.indexOf('horizontal') > -1);

    const fixedStyle = computed(() => {
      const styles: {
        wrapper: CSSProperties;
        content: CSSProperties;
      } = {
        wrapper: {} as CSSProperties,
        content: {} as CSSProperties
      };

      if (heightSize.value !== 0) {
        styles.wrapper.marginRight = `-${SCROLLBAR_WIDTH}px`;
        styles.wrapper.paddingRight = `${SCROLLBAR_WIDTH}px`;
        styles.content.marginRight = `-${SCROLLBAR_WIDTH}px`;
        styles.content.paddingRight = `${SCROLLBAR_WIDTH}px`;
      }
      if (widthSize.value !== 0) {
        styles.wrapper.marginBottom = `-${SCROLLBAR_WIDTH}px`;
        styles.wrapper.paddingBottom = `${SCROLLBAR_WIDTH}px`;
        styles.content.marginBottom = `-${SCROLLBAR_WIDTH}px`;
        styles.content.paddingBottom = `${SCROLLBAR_WIDTH}px`;
      }

      return styles;
    });

    const onScroll = (e: MouseEvent) => {
      emit('scroll', e, calScrollInfo(e));

      updateOffset();
    };

    const scrollLeft = (scrollTo: number, duration = 200) => {
      scrollAnimation({ el: wrapper.value!, direction: 'horizontal', scrollTo, duration });
    };

    const scrollTop = (scrollTo: number, duration = 200) => {
      scrollAnimation({ el: wrapper.value!, direction: 'vertical', scrollTo, duration });
    };

    expose({
      scrollTop,
      scrollLeft
    });

    const onMouseover = (e: MouseEvent) => {
      if (props.hoverVisible) {
        if (wrapper.value?.contains(e.target as HTMLElement)) {
          horizontalBar.value?.show?.();
          verticalBar.value?.show?.();
        } else {
          horizontalBar.value?.hide?.();
          verticalBar.value?.hide?.();
        }
      }
    };

    provide(SCROLLBAR_KEY, wrapper);

    watch(
      () => props.noresize,
      (val) => {
        if (val && stopResizeObserver!) {
          stopResizeObserver();
        } else {
          ({ stop: stopResizeObserver } = useResizeObserver(content as Ref<HTMLElement>, updateBarSize));
        }
      }
    );

    onMounted(() => {
      updateBarSize();
      if (props.hoverVisible) {
        document.addEventListener('mouseover', onMouseover);
      }
    });

    onBeforeUnmount(() => {
      document.removeEventListener('mouseover', onMouseover);

      if (stopResizeObserver) {
        stopResizeObserver();
      }
    });

    return () => {
      const verticalBarEl = showVerticalBar.value
        ? h(Bar, {
            ref: verticalBar,
            vertical: true,
            offset: offsetY.value,
            size: heightSize.value
          })
        : null;
      const horizontalBarEl = showHorizontalBar.value
        ? h(Bar, {
            ref: horizontalBar,
            vertical: false,
            offset: offsetX.value,
            size: widthSize.value
          })
        : null;
      const innerContentEl = h(
        'div',
        {
          ref: content,
          style: fixedStyle.value.content,
          class: ns.e('content')
        },
        slots.default?.()
      );
      const wrapperEl = h(
        'div',
        {
          ref: wrapper,
          style: fixedStyle.value.wrapper,
          class: ns.e('wrapper'),
          onScroll
        },
        [verticalBarEl, horizontalBarEl, innerContentEl].filter(Boolean)
      );
      return h('div', { class: ns.b() }, wrapperEl);
    };
  }
});
