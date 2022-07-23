import { Fragment, Text, Comment, isVNode } from 'vue';
import { isArray } from '@vue/shared';
import type { VNode, VNodeChild } from 'vue';

export const isFragment = (node: VNodeChild): boolean => isVNode(node) && node.type === Fragment;
export const isText = (node: VNodeChild): boolean => (node as VNode).type === Text;
export const isComment = (node: VNodeChild): boolean => (node as VNode).type === Comment;
export const isTemplate = (node: VNodeChild): boolean => (node as VNode).type === 'template';

/**
 * get a valid child node (not fragment nor comment)
 * @param node VNode
 * @param depth number
 * @returns undefined | VNode
 */
function getChildren(node: VNode, depth: number): undefined | VNode {
  if (isComment(node)) {
    return;
  }

  if (isFragment(node) || isTemplate(node)) {
    return depth > 0 ? getFirstValidNode(node.children as VNodeChild, depth - 1) : undefined;
  }

  return node;
}

/**
 * 获取指定层级内的第一个可用节点
 * @param node VNodeChild
 * @param maxDepth number
 * @returns undefined | VNode
 */
export const getFirstValidNode = (node: VNodeChild, maxDepth = 3): ReturnType<typeof getChildren> => {
  return isArray(node) ? getChildren(node[0] as VNode, maxDepth) : getChildren(node as VNode, maxDepth);
};
