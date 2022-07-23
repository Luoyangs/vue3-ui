<docs>
---
title: 弹出层触发时机
---

配置 `trigger` 可以自定义popper弹出层触发时机，支持 `hover` 、 `click`、 `focus`和自定义 `visible`，默认 `hover`。
</docs>

<template>
  <y-popper trigger="hover">
    <template #trigger>
      <y-button style="margin-left: 12px;">Hover</y-button>
    </template>
    popper content
  </y-popper>
  <y-popper trigger="click">
    <template #trigger>
      <y-button style="margin-left: 12px;">Click</y-button>
    </template>
    popper content
  </y-popper>
  <y-popper trigger="focus">
    <template #trigger>
      <y-button style="margin-left: 12px;">Focus</y-button>
    </template>
    popper content
  </y-popper>
  <y-popper :visible="visible">
    <template #trigger>
      <y-button style="margin-left: 12px;" @click="visible = !visible">Manual</y-button>
    </template>
    popper content
  </y-popper>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Trigger",
  setup() {
    const visible = ref(false);

    return {
      visible,
    };
  },
});
</script>
