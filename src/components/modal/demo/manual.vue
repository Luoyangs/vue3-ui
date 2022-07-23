<docs>
---
title: 手动更新和移除
---

手动更新和关闭 `Modal.method` 方式创建的对话框。
</docs>

<template>
  <y-button @click="countDown">Open modal to close in 5s</y-button>
</template>
<script lang="ts">
import { Modal } from 'vue3-ui';
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const countDown = () => {
      let secondsToGo = 5;
      const modal = Modal.confirm({
        title: 'Warning',
        content: `This modal will be destroyed after ${secondsToGo} second.`,
        confirmText: `${secondsToGo} second left`,
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          confirmText: `${secondsToGo} second left`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
      }, secondsToGo * 1000);
    };
    return {
      countDown,
    };
  },
});
</script>
