import { defineComponent, Transition } from 'vue';
import { getTransitionProps } from '@utils/dom';

const maskProps = {
  prefixCls: String,
  visible: Boolean,
  motionName: String,
};

export default defineComponent({
  name: 'Mask',
  props: maskProps,
  setup(props, { attrs }) {
    return () => {
      const { prefixCls, visible, motionName } = props;
      const transitionProps = getTransitionProps(motionName);

      return (
        <Transition {...transitionProps}>
          <div v-show={visible} class={`${prefixCls}-mask`} {...attrs} />
        </Transition>
      );
    };
  }
});
