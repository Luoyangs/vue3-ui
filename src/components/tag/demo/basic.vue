<docs>
---
title: 基本用法
---

基本标签的用法，可以通过添加 `closable` 变为可关闭标签。可关闭标签具有 `close` 两个事件。

</docs>

<template>
  <div>
    <y-tag>Tag 1</y-tag>
    <y-tag><a href="https://github.com/vueComponent/ant-design">Link</a></y-tag>
    <y-tag closable @close="log">Tag 2</y-tag>
    <y-tag closable @close.prevent>Prevent Default</y-tag>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const log = (e: MouseEvent) => {
      console.log(e);
    };

    return {
      log,
    };
  },
});
</script>
