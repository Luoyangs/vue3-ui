import { defineComponent, ref, reactive, computed } from 'vue';
import { isFunction, isNumber } from '@utils/helper';
import type { VNodeChild, PropType, CSSProperties } from 'vue';
import type { ListItem } from '../types';

interface SizeCache {
  items: Record<string, ListItem>;
  lastVisitedIndex: number;
  estimatedItemSize: number;
}
const DEFAULT_DYNAMIC_LIST_ITEM_SIZE = 50;
const getItemFromCache = (props: any, index: number, cache: SizeCache): ListItem => {
  const { itemSize } = props;
  const itemSizeFn = isFunction(itemSize) ? itemSize : (i: number) => itemSize;
  const { items, lastVisitedIndex } = cache;

  if (index > lastVisitedIndex) {
    let offset = 0;
    if (lastVisitedIndex > 0) {
      const item = items[lastVisitedIndex];
      offset = item.size + item.offset;
    }

    for (let i = lastVisitedIndex + 1; i <= index; i++) {
      const size = itemSizeFn(i);
      items[i] = {
        offset,
        size,
      };

      offset += size;
    }
  }

  return items[index];
};
const bs = (props: any, cache: SizeCache, low: number, high: number, offset: number) => {
  while(low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const currentOffset = getItemFromCache(props, mid, cache).offset;

    if (currentOffset === offset) {
      return mid;
    } else if (currentOffset < offset) {
      low = mid + 1;
    } else if (currentOffset > offset) {
      high = mid - 1;
    }
  }

  return Math.max(0, low - 1);
};
const es = (props: any, cache: SizeCache, index: number, offset: number) => {
  const { total } = props;
  let exponent = 1;

  while(index < total && getItemFromCache(props, index, cache).offset < offset) {
    index += exponent;
    exponent *= 2;
  }

  return bs(props, cache, Math.floor(index / 2), Math.min(total -1, index), offset);
};
const findItem = (props: any, cache: SizeCache, offset: number) => {
  const { items, lastVisitedIndex } = cache;
  const lastVisitedOffset = lastVisitedIndex > 0
    ? items[lastVisitedIndex].offset
    : 0;

  if (lastVisitedOffset >= offset) {
    return bs(props, cache, 0, lastVisitedIndex, offset);
  }

  return es(props, cache, Math.max(0, lastVisitedIndex), offset);
};
const getEndIndexForStartIndex = (props: any, startIndex: number, scrollOffset: number, cache: SizeCache) => {
  const { height, total } = props;
  const item = getItemFromCache(props, startIndex, cache);
  const maxOffset = scrollOffset + height;

  let offset = item.offset + item.size;
  let endIndex = startIndex;

  while(endIndex < total - 1 && offset < maxOffset) {
    endIndex++;
    offset += getItemFromCache(props, endIndex, cache).size;
  }

  return endIndex;
};

export default defineComponent({
  name: 'DynamicSizeList',
  props: {
    itemSize: {
      type: [Number, Function] as PropType<number | ((index: number) => number)>,
      required: true,
    },
    estimatedItemSize: {
      type: Number,
      default: DEFAULT_DYNAMIC_LIST_ITEM_SIZE,
    },
    width: {
      type: Number,
      default: 240
    },
    height: {
      type: Number,
      default: 170
    },
    total: Number,
    initScrollOffset: Number,
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
  },
  setup(props, {}) {
    const containerRef = ref<HTMLElement>();
    const innerRef = ref<HTMLElement>();
    const scrollbarRef = ref();
    const dynamicSizeCache = ref<SizeCache>({
      items: {},
      lastVisitedIndex: -1,
      estimatedItemSize: props.estimatedItemSize,
    });
    const state = reactive({
      isScrolling: false,
      scrollDir: 'forward',
      scrollOffset: isNumber(props.initScrollOffset) ? props.initScrollOffset! : 0,
      updateRequested: false,
      isScrollbarDragging: false,
    });

    const size = computed(() => ({}));
    const innerStyle = computed(() => ({}));
    const containerStyle = computed(() => ({}));

    const onScroll = (e: UIEvent) => {

    };

    const onWheel = (event: WheelEvent) => {

    };

    const handleBarScroll = (distance: number, canMoveOffset: number) => {

    };

    return () => {
      // const { data, total, height } = props;
      // const [ start, end ] = itemsToRender.value;
      const children = [] as VNodeChild[];
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
            clientSize={80}
            size={size.value}
            offset={state.scrollOffset}
            onScroll={handleBarScroll} />
        </div>
      );
    };
  }
});