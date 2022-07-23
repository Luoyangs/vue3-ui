<docs>
---
title: 悬浮显示
---

当鼠标悬浮时，会显示滚动条。
</docs>

<template>
  <div class="box">
    <y-scrollbar :hover-visible="true">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </y-scrollbar>
  </div>
</template>

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
  height: 50px;
  padding: 0 16px;
  margin: 0;
  border-radius: 4px;
  border-bottom: 1px dashed #ddd;
}
</style>
