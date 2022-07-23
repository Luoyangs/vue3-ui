import { defineComponent, ref, reactive, computed, nextTick, onUpdated } from 'vue';
import memoizeOne from 'memoize-one';
import { hasOwn } from '@vue/shared';
import { isNumber } from '@utils/helper';
import raf from '@utils/raf';
import Scrollbar from './scrollbar';
import { commonListProps } from '../types';
import type { VNodeChild, Slot, CSSProperties } from 'vue';
import type { CommonListProps } from '../types';

const _getItemStyleCache = (_: any) => ({});

export default defineComponent({
  name: 'FixedSizeList',
  props: { ...commonListProps },
  components: {
    Scrollbar
  },
  setup(props: CommonListProps, { emit, slots }) {
    const containerRef = ref<HTMLElement>();
    const innerRef = ref<HTMLElement>();
    const scrollbarRef = ref();
    const state = reactive({
      isScrolling: false,
      scrollDir: 'forward',
      scrollOffset: isNumber(props.initScrollOffset) ? props.initScrollOffset! : 0,
      updateRequested: false,
      isScrollbarDragging: false,
    });

    const itemStyleCacheFn = memoizeOne(_getItemStyleCache);
    const size = computed(() => props.itemSize * props.total);

    const innerStyle = computed((): CSSProperties => {
      return {
        height: `${size.value}px`,
        width: '100%',
        pointerEvents: state.isScrolling ? 'none' : undefined,
      };
    });

    const containerStyle = computed(() => (
      {
        position: 'relative',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        willChange: 'transform',
        width: isNumber(props.width) ? `${props.width}px` : props.width,
        height: isNumber(props.height) ? `${props.height}px` : props.height,
        ...props.style
      } as CSSProperties)
    );

    const itemsToRender = computed(() => {
      const { total, itemSize, height } = props;
      const { scrollOffset } = state;
      
      if (total === 0) {
        return [0, 0, 0, 0];
      }

      const startIndex = Math.max(0, Math.min(total - 1, Math.floor(scrollOffset / (itemSize as number))));
      const offset = startIndex * (itemSize as number)
      const numVisibleItems = Math.ceil(
        ((height as number) + scrollOffset - offset) / (itemSize as number)
      );
      const endIndex = Math.max(
        0,
        Math.min(total - 1, startIndex + numVisibleItems - 1)
      );
    
      return [
        Math.max(0, startIndex - 2),
        Math.max(0, Math.min(total - 1, endIndex + 2))
      ];
    });

    const getItemStyle = (idx: number) => {
      const { itemSize } = props;
      const itemStyleCache = itemStyleCacheFn(itemSize) as Record<string, CSSProperties>;
      let style: CSSProperties;
      if (hasOwn(itemStyleCache, String(idx))) {
        style = itemStyleCache[idx] as CSSProperties;
      }
      itemStyleCache[idx] = style = {
        position: 'absolute',
        left: 0,
        top: `${idx * itemSize}px`,
        width: '100%',
        height: `${itemSize}px`,
      };

      return style;
    };

    const onScroll = (e: UIEvent) => {
      const { clientHeight, scrollHeight, scrollTop } = e.currentTarget as HTMLElement;
      if (scrollTop === state.scrollOffset) {
        return;
      }

      state.scrollOffset = Math.max(
        0,
        Math.min(scrollTop, scrollHeight - clientHeight)
      );
      state.isScrolling = true;
      nextTick(resetIsScrolling)
    };

    let offset = 0;
    let frameHandle = 0;
    const onWheel = (event: WheelEvent) => {
      const newOffset = event.deltaY;
      raf.cancel(frameHandle);
      // 判断是否到达顶部或者底部
      const atStartEdge = state.scrollOffset <= 0;
      const atEndEdge = state.scrollOffset + props.height >= size.value;
      if ((atStartEdge && newOffset < 0) || (atEndEdge && newOffset > 0)) {
        return;
      }

      offset += newOffset;
      raf(() => {
        scrollTo(Math.min(state.scrollOffset + offset, size.value - props.height));
        offset = 0;
      });
    };

    const handleBarScroll = (distance: number, canMoveOffset: number) => {
      const maxSize = size.value - props.height;
      const offset = ((maxSize) / canMoveOffset) * distance;

      scrollTo(Math.min(maxSize, offset));
    };

    const scrollTo = (distance: number) => {
      const value = Math.max(0, distance);
      if (value === state.scrollOffset) {
        return;
      }

      state.scrollOffset = value;
      state.updateRequested = true;
      
      nextTick(resetIsScrolling)
    };

    const resetIsScrolling = () => {
      state.isScrolling = false;
      nextTick(() => {
        itemStyleCacheFn(-1);
      });
    };

    onUpdated(() => {
      const containerEle = containerRef.value;
      const { scrollOffset, updateRequested } = state;
      if (updateRequested && containerEle) {
        containerEle.scrollTop = scrollOffset
      }
    });

    return () => {
      const { data, total, height } = props;
      const [ start, end ] = itemsToRender.value;
      const children = [] as VNodeChild[];
      
      if (total > 0) {
        for (let i = start; i <= end; i++) {
          children.push(
            (slots.default as Slot)?.({
              data,
              key: i,
              index: i,
              style: getItemStyle(i),
            })
          )
        }
      }

      return (
        <div class="yoga-vlist__wrapper">
          <div
            ref={containerRef}
            class="yoga-vlist"
            style={containerStyle.value}
            onScroll={onScroll}
            onWheel={onWheel}>
            <div ref={innerRef} style={innerStyle.value}>
              {children}
            </div>
          </div>
          <scrollbar
            ref={scrollbarRef}
            clientSize={height}
            size={size.value}
            offset={state.scrollOffset}
            onScroll={handleBarScroll} />
        </div>
      );
    };
  },
})