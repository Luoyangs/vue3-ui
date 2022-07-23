import { cloneVNode, h } from 'vue';
import { getFirstValidNode } from '@utils/vnode';
import type { Ref, VNode, Component } from 'vue';
import type { RefElement } from '@components/base/types';

interface RenderTriggerProps extends Record<string, unknown> {
  ref: Ref<RefElement>;
  onClick?: (e: Event) => void;
  onMouseover?: (e: Event) => void;
  onMouseleave?: (e: Event) => void;
  onFocus?: (e: Event) => void;
}

export default function getTrigger(trigger: VNode[], prop: RenderTriggerProps): JSX.Element {
  const firstElement = getFirstValidNode(trigger, 1);
  if (!firstElement) {
    throw Error('trigger expects single rooted node');
  }

  const triggerNode = cloneVNode(firstElement, prop, true);
  if ((triggerNode.type as Component)?.name === 'YButton' && triggerNode.props?.disabled === true) {
    return h('span', prop, triggerNode);
  }

  return triggerNode;
}
