<docs>
---
title: 禁用态
---

设置 `disabled` 可以决定是否禁用当前的tooltip, 禁用时将不会展示提示文案内容。但是button如果本身被`disabled`, 则无法正常接受 mouseenter、mouseleave、focus、click 事件. [参见](https://github.com/ant-design/ant-design/issues/4602)
</docs>

<template>
  <y-checkbox v-model="disabled">disabled</y-checkbox>
  <y-tooltip :disabled="!disabled">
    <button :class="['yoga-button', { 'yoga-button--disabled': disabled }]" :disabled="disabled" style="margin: 0 8px;">{{ disabled ? 'disabled' : 'enabled'}}</button>
    <template #content>
      <span>这里是一个复杂的content, 里面有链接<y-button size="small" type="link" target="_blank" href="www.baidu.com">百度一下</y-button></span>
    </template>
  </y-tooltip>

  <y-tooltip :disabled="!disabled">
    <y-button :disabled="disabled" style="margin: 0 12px;">{{ disabled ? 'disabled' : 'enabled'}}</y-button>
    <template #content>
      <span>这样使用tooltip更优雅<y-button size="small" type="link" target="_blank" href="www.baidu.com">百度一下</y-button></span>
    </template>
  </y-tooltip>

  <y-tooltip v-if="disabled">
    <y-button>disabled</y-button>
    <template #content>
      <span>这里是一个复杂的content, 里面有链接<y-button size="small" type="link" target="_blank" href="www.baidu.com">百度一下</y-button></span>
    </template>
  </y-tooltip>
  <y-button v-else>enabled</y-button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Disabled",
  setup() {
    const disabled = ref(false);

    return {
      disabled,
    };
  },
});
</script>
