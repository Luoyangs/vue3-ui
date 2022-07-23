<docs>
---
title: 基础用法
---

使用 `scrollTop` 滚动到指定的位置
</docs>

<template>
  <div class="box">
    <y-scrollbar ref="scrollbar">
      <p
        v-for="item in 20"
        :key="item"
        class="scrollbar-demo-item">
        {{ item }}
      </p>
    </y-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'Base',
  setup() {
    const scrollbar = ref();

    onMounted(() => {
      console.log('scrollbar', scrollbar.value);
      if (scrollbar.value) {
        scrollbar.value.scrollTop(100);
      }
    });

    return {
      scrollbar,
    };
  },
});
</script>

<style scoped>
.box {
  height: 400px;
  max-width: 500px;
  border: 1px solid;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 500px;
  height: 50px;
  padding: 0 16px;
  margin: 0;
  border-radius: 4px;
  border-bottom: 1px dashed #ddd;
}
</style>
