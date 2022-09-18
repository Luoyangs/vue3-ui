import { h, defineComponent, computed } from 'vue';
import { buttonProps } from '@components/button/types';
import { LoadingIcon } from '@components/base/icons';
import type { SetupContext } from 'vue';
import type { ButtonProps } from '@components/button/types';
import { useNamespace } from '@hooks/useNamespace';

export default defineComponent({
  name: 'YButton',
  props: buttonProps,
  setup(props: ButtonProps, { slots }: SetupContext) {
    const ns = useNamespace('button');
    const onClick = (event: MouseEvent) => {
      document.documentElement.removeAttribute('data-focus-visible');
      if (props.disabled || props.loading) {
        event.preventDefault();
        return;
      }

      props.onClick?.(event);
    };
    const tagName = computed(() => (props.href ? 'a' : 'button'));
    const propsData = computed(() => {
      const { type, size, href, target, outline, dashed, fullWidth, round, circle, disabled, nativeType, loading } = props;

      const buttonClass = {
        [ns.m(type)]: type,
        [ns.m(size)]: size,
        [ns.m('outline')]: outline,
        [ns.m('dashed')]: dashed,
        [ns.m('block')]: fullWidth,
        [ns.m('round')]: round,
        [ns.m('circle')]: circle,
        [ns.m('pure')]: !slots.default,
        [ns.m('disabled')]: disabled || loading,
        [ns.m('underline')]: href && type === 'link',
        [ns.b()]: true, // 要放在最后，否则会被覆盖
      };

      return href
        ? { class: buttonClass, href: disabled || loading ? null : href, target, onClick }
        : { class: buttonClass, type: nativeType, disabled, onClick };
    });

    return () => {
      const { tag, icon, loading, suffixIcon } = props;
      const inner = h(tagName.value, propsData.value, [
        icon ? h(icon) : loading ? h(LoadingIcon, { class: 'loading' }) : null,
        slots.default ? h('span', null, slots.default()) : null,
        suffixIcon ? h(suffixIcon) : null
      ]);

      if (tag) {
        return h(tag, null, inner);
      }

      return inner;
    };
  }
});
