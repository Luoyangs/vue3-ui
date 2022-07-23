<docs>
---
title: 不同尺寸
---

基本标签的用法，可以通过添加 `closable` 变为可关闭标签。可关闭标签具有 `close` 两个事件。

</docs>

<template>
  <div>
    <y-tag size="large">Large Tag</y-tag>
    <y-tag>Default Tag</y-tag>
    <y-tag size="small">Small Tag</y-tag>
  </div>
  <div>
    <y-tag type="success" size="large">
      <twitter />
      Large Tag
    </y-tag>
    <y-tag type="success">
      <twitter />
      Default Tag
    </y-tag>
    <y-tag type="success" size="small">
      <twitter />
      Small Tag
    </y-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import twitter from './twitter.svg?component';
export default defineComponent({
  components: {
    twitter,
  },
});
</script>