<docs>
---
title: 销毁确认对话框
---

使用 `Modal.destroyAll()` 可以销毁弹出的确认窗。通常用于路由监听当中，处理路由前进、后退不能销毁确认对话框的问题。
</docs>

<template>
  <y-button @click="showCloseAllModal">Close All</y-button>
</template>
<script lang="tsx">
import { defineComponent } from 'vue';
import { Modal } from 'vue3-ui';
export default defineComponent({
  setup() {
    const showCloseAllModal = () => {
      for (let i = 0; i < 3; i += 1) {
        setTimeout(() => {
          Modal.confirm({
            title: `Close All: ${i}`,
            width: 500,
            content: 'Close All Modal',
            onConfirm: () => {
              return true;
            },
            onCancel() {
              Modal.destroyAll();
            },
          });
        }, i * 500);
      }
    };
    
    return {
      showCloseAllModal,
    };
  },
});
</script>
