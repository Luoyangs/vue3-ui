<docs>
---
title: 圆角按钮
---

按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。
</docs>

<template>
  <y-button type="primary" circle :icon="Search"></y-button>
  <y-button type="primary" outline circle :icon="Search"></y-button>
  <y-button circle :icon="Search"></y-button>
  <y-button dashed circle :icon="Search"></y-button>
  <y-button type="primary" dashed circle :icon="Search"></y-button>
  <y-button type="primary" round :icon="Search">Search</y-button>
  <y-button type="primary" round outline :icon="Search">Search</y-button>
  <y-button round :icon="Search">Search</y-button>
  <y-button dashed round :icon="Search">Search</y-button>
  <y-button type="primary" round dashed :icon="Search">Search</y-button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Search from './search.svg?component';

export default defineComponent({
  name: 'Circle',
  setup() {
    return {
      Search,
    };
  },
});
</script>
