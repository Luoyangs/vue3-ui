<docs>
---
title: 禁用
---

配置 `disabled` 可以禁用popper弹出层，处于禁用状态时，弹出层就不会显示，关于`disabled`的其他用法可以参考tooltip里面的例子
</docs>

<template>
  <y-checkbox v-model="disabled">Disabled</y-checkbox>
  <y-popper :disabled="disabled">
    <template #trigger>
      <y-button>Hover</y-button>
    </template>
    popper content
  </y-popper>
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
