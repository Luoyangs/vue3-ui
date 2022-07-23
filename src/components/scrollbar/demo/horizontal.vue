<docs>
---
title: 横向滚动
---

当元素宽度大于滚动条宽度时，会显示横向滚动条。
</docs>

<template>
  <div class="box">
    <y-scrollbar ref="scrollbar">
      <div class="scrollbar-flex-content">
        <p
          v-for="item in 20"
          :key="item"
          class="scrollbar-demo-item">
          {{ item }}
        </p>
      </div>
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
        scrollbar.value.scrollLeft(100);
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
  max-width: 500px;
}

.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  padding: 0 16px;
  margin: 0 16px;
  border-radius: 4px;
  border: 1px dashed #ddd;
}
</style>
