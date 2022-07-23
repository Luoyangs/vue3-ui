<docs>
---
title: 虚线按钮
---

添加 `dashed` 属性即可让按钮的边框变成虚线样式。
</docs>

<template>
  <y-button dashed>Dashed</y-button>
  <y-button dashed :icon="Search">Upload</y-button>
  <y-button type="primary" dashed>Dashed</y-button>
  <y-button type="primary" dashed :icon="Search">Upload</y-button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Search from './search.svg?component';

export default defineComponent({
  name: 'Dashed',
  setup() {
    return {
      Search,
    };
  },
});
</script>
