<docs>
---
title: 弹出层的样式
---

配置 `theme` 可以自定义popper弹出层样式，支持 `dark` 、 `light`，默认 `dark`。
</docs>

<template>
  <y-popper theme="dark">
    <template #trigger>
      <y-button>Dark</y-button>
    </template>
    popper content
  </y-popper>
  <y-popper theme="light">
    <template #trigger>
      <y-button style="margin-left: 12px;">Light</y-button>
    </template>
    popper content
  </y-popper>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Theme",
});
</script>
