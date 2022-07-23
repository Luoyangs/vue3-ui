import { ref, computed, watch, defineComponent } from 'vue';
import raf from '@utils/raf';
import type { CSSProperties } from 'vue';

const prefixCls = 'v-scrollbar';
const getBarPropName = (vertical: boolean) => 
  vertical ?
    {
      offset: 'offsetHeight',
      scroll: 'scrollTop',
      scrollSize: 'scrollHeight',
      size: 'height',
      key: 'vertical',
      axis: 'Y',
      client: 'clientY',
      direction: 'top',
    } :
    {
      offset: 'offsetWidth',
      scroll: 'scrollLeft',
      scrollSize: 'scrollWidth',
      size: 'width',
      key: 'horizontal',
      axis: 'X',
      client: 'clientX',
      direction: 'left',
    };


export default defineComponent({
  name: 'scrollbar',
  props: {
    clientSize: { // 滚动窗的大小
      type: Number,
      required: true,
    },
    size: { // 滚动内容总大小 = item size * item total
      type: Number,
      required: true,
    },
    offset: { // 滚动偏移
      type: Number,
      required: true,
    },
    vertical: { // 是否是垂直滚动
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const scrollbarRef = ref<HTMLElement>();
    const thumbRef = ref<HTMLElement>();
    const isDragging = ref<boolean>(false);
    const moved = ref<number>(0);

    let clickedPosition: number = 0;
    let frameHandle: number = 0;
    let onselectstartStore: null | typeof document.onselectstart = null;

    const bar = computed(() => getBarPropName(props.vertical));
    const containerStyle = computed((): CSSProperties => ({
      position: 'absolute',
      top: '6px',
      right: '2px',
      bottom: '6px',
      width: props.vertical ? '6px' : `${props.clientSize}px`,
      height: props.vertical ? `${props.clientSize}px` : '6px',
      borderRadius: '4px',
    }));
    const thumbStyle = computed((): CSSProperties => {
      if (thumbSize.value === Number.POSITIVE_INFINITY) {
        return {
          display: 'none',
        };
      }

      const translate = `translate${bar.value.axis}(${moved.value}px)`
      return {
        transform: translate,
        msTransform: translate,
        WebkitTransform: translate,
        width: '100%',
        height: '100%',
        [bar.value.size]: `${thumbSize.value}px`, // 使用thumbSize覆盖上面的width、height
      };
    });
    const thumbSize = computed(() => {
      const { clientSize, size } = props;
      
      const ratio = clientSize / size;
      console.log('thumbSize', clientSize, size, ratio, ratio * clientSize);

      if (ratio >= 1) {
        return Number.POSITIVE_INFINITY;
      }

      if (ratio >= 0.5) {
        return ratio * clientSize;
      }

      const max = clientSize / 3;
      return Math.floor(Math.min(max, Math.max(ratio * clientSize * 100, 20)));
    });
    const canScrollSize = computed(() => Math.floor(props.clientSize - thumbSize.value));

    const onMousedown = (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();

      const offset = Math.abs(
        (event.target as HTMLElement).getBoundingClientRect()[bar.value.direction as 'top' | 'left']
          - event[bar.value.client as 'clientY' | 'clientX']
      );
      const thumbHalf = thumbRef.value![bar.value.offset as 'offsetHeight' | 'offsetWidth'] / 2;
      const distance = offset - thumbHalf;
      moved.value = Math.max(0, Math.min(distance, canScrollSize.value));
      emit('scroll', distance, canScrollSize.value);
    };

    const onThumbMouseDown = (event: MouseEvent) => {
      // 既能阻止事件冒泡至父节点，也能阻止当前节点上其他同类型事件的触发
      event.stopImmediatePropagation();

      // 按住ctrl键或者鼠标左右键
      if (event.ctrlKey || [1, 2].includes(event.button)) {
        return;
      }

      isDragging.value = true;
      const thumbEle = event.currentTarget as HTMLElement;
      clickedPosition = thumbEle.getBoundingClientRect()[bar.value.direction as 'top' | 'left']
        + thumbEle[bar.value.offset as 'offsetHeight' | 'offsetWidth']
        - event[bar.value.client as 'clientY' | 'clientX'];
      emit('start-move');
      attachEvents();
    };

    const onMouseMove = (event: Event) => {
      if (!isDragging.value || !scrollbarRef.value || !thumbRef.value) {
        return;
      }
      
      if (!clickedPosition) {
        return;
      }

      raf.cancel(frameHandle);
      const offset = (event as MouseEvent)[bar.value.client as 'clientY' | 'clientX'] 
        - scrollbarRef.value.getBoundingClientRect()[bar.value.direction as 'top' | 'left']
        - thumbRef.value[bar.value.offset as 'offsetHeight' | 'offsetWidth']
        + clickedPosition;
      
      frameHandle = raf(() => {
        moved.value = Math.max(
          0,
          Math.min(offset, canScrollSize.value)
        );
        emit('scroll', offset, canScrollSize.value);
      });
    };

    const onMouseup = (event: Event) => {
      isDragging.value = false;
      clickedPosition = 0;
      emit('stop-move');
      detachEvents();
    };

    const attachEvents = () => {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseup);

      onselectstartStore = document.onselectstart;
      document.onselectstart = () => false; // 禁止用户选中网页上的内容

      if (!thumbRef.value) {
        return;
      }
      thumbRef.value.addEventListener('touchmove', onMouseMove);
      thumbRef.value.addEventListener('touchend', onMouseup);
    };

    const detachEvents = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseup);
      
      document.onselectstart = onselectstartStore;
      onselectstartStore = null;
      
      if (!thumbRef.value) {
        return;
      }
      thumbRef.value.removeEventListener('touchmove', onMouseMove);
      thumbRef.value.removeEventListener('touchend', onMouseup);
    };

    watch(() => props.offset, (value: number) => {
      if (isDragging.value) {
        return;
      }

      moved.value = canScrollSize.value * (value / (props.size - props.clientSize));
    });

    return () => (
      <div
        ref={scrollbarRef}
        class={prefixCls}
        style={containerStyle.value}
        onMousedown={onMousedown}>
        <div
          ref={thumbRef}
          class={`${prefixCls}__thumb`}
          style={thumbStyle.value}
          onMousedown={onThumbMouseDown} />
      </div>
    );
  },
});