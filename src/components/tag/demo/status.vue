<docs>
---
title: 预设状态的标签
---

预设五种状态颜色，可以通过设置 `color` 为 `success`、 `info`、`error`、`default`、`warning` 来代表不同的状态。

</docs>

<template>
  <div>
    <y-tag type="success">success</y-tag>
    <y-tag type="info">info</y-tag>
    <y-tag type="error">error</y-tag>
    <y-tag type="warning">warning</y-tag>
    <y-tag>default</y-tag>
  </div>
  <div>
    <y-tag type="success">
      <twitter />
      success
    </y-tag>
    <y-tag type="info">
      <twitter />
      info
    </y-tag>
    <y-tag type="error">
      <twitter />
      error
    </y-tag>
    <y-tag type="warning">
      <twitter />
      warning
    </y-tag>
    <y-tag>
      <twitter />warning
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
