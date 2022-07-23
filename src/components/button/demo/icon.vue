<docs>
---
title: 图标按钮
---

添加 `icon` 属性或设置 slot: `icon` / `suffix-icon` 即可给按钮添加图标。
</docs>

<template>
  <y-button type="primary" :icon="Search">Search</y-button>
  <y-button :icon="Search">Search</y-button>
  <y-button :icon="Search"></y-button>
  <y-button>
    <Search />
  </y-button>
  <y-button :suffix-icon="Search">More</y-button>
  <y-button type="link" :icon="Search">Search Button</y-button>
  <y-button type="link" :suffix-icon="Search">Search</y-button>
</template>

<script lang='tsx'>
import { defineComponent } from 'vue';
import Search from './search.svg?component';

export default defineComponent({
  name: 'Base',
  components: {
    Search,
  },
  setup() {
    return {
      Search,
    };
  },
});
</script>
