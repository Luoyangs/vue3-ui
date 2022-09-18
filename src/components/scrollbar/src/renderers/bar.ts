import { h, defineComponent, inject, computed, ref, reactive, unref } from 'vue';
import useThumb from '@components/scrollbar/src/composition/useThumb';
import { SCROLLBAR_KEY } from '@components/scrollbar/types';
import { barProps } from '@components/scrollbar/src/renderers/types';
import { debounce } from '@utils/helper';
import { useNamespace } from '@hooks/useNamespace';
import type { Ref, SetupContext } from 'vue';
import type { BarProps, BarState } from '@components/scrollbar/src/renderers/types';

export default defineComponent({
  name: 'Bar',
  props: barProps,
  setup(props: BarProps, { expose }: SetupContext) {
    const ns = useNamespace('scrollbar');
    const scrollbar = inject(SCROLLBAR_KEY) as Ref<HTMLElement>;
    if (!scrollbar) {
      throw new Error('can not inject scrollbar context');
    }

    const debounceFn = debounce((n) => n(), 500);
    const root = ref<HTMLElement | null>(null);
    const { clickOffset, updateThumbClickOffset } = useThumb();
    const state = reactive<BarState>({
      isThumbDrag: false,
      visible: false
    });

    const thumbStyle = computed(() =>
      props.vertical
        ? {
            top: props.offset + 'px',
            height: props.size + 'px'
          }
        : {
            left: props.offset + 'px',
            width: props.size + 'px'
          }
    );
    const rootProps = computed(() => {
      return {
        ref: root,
        class: [ns.e('bar'), ns.em('bar', props.vertical ? 'vertical' : 'horizontal')],
        onMouseover: show,
        onMouseleave: hide
      };
    });
    const thumbProps = computed(() => {
      return {
        class: [ns.e('thumb'), state.visible && ns.em('thumb', 'visible')],
        style: unref(thumbStyle),
        onMousedown: onThumbMousedown
      };
    });

    const show = () => {
      state.visible = true;
    };

    const hide = () => {
      debounceFn(() => (state.visible = false));
    };

    const onThumbMove = (e: MouseEvent) => {
      if (!state.isThumbDrag) {
        return;
      }

      const rootRect = root.value?.getBoundingClientRect?.();
      if (!rootRect) {
        return;
      }

      if (props.vertical) {
        const offset = e.clientY - rootRect.top;
        scrollbar.value.scrollTop =
          (offset - clickOffset.value) * (scrollbar.value.scrollHeight / scrollbar.value.clientHeight);
      } else {
        const offset = e.screenX - rootRect.left;
        scrollbar.value.scrollLeft =
          (offset - clickOffset.value) * (scrollbar.value.scrollWidth / scrollbar.value.clientWidth);
      }
    };

    const onThumbMouseUp = () => {
      state.isThumbDrag = false;
      clickOffset.value = 0;
      document.removeEventListener('mousemove', onThumbMove);
      document.removeEventListener('mouseup', onThumbMouseUp);
      document.onselectstart = null;
    };

    const onThumbMousedown = (e: MouseEvent) => {
      // 阻止冒泡和同类型的事件
      e.stopImmediatePropagation();
      state.isThumbDrag = true;
      document.addEventListener('mousemove', onThumbMove);
      document.addEventListener('mouseup', onThumbMouseUp);
      document.onselectstart = () => false;

      updateThumbClickOffset(e, props.vertical, root as Ref<HTMLElement>);
    };

    expose({
      show,
      hide
    });

    return () => h('div', unref(rootProps), [h('div', unref(thumbProps))]);
  }
});
