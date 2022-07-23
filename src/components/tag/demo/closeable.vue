<docs>
---
title: 可以关闭
---

可以通过添加 `closable` 变为可关闭标签。可关闭标签具有 `close` 两个事件。

</docs>

<template>
  <div>
    <y-tag v-if="visible" closable @close="handleClose">Closeable Tag</y-tag>
    <y-tag v-if="visible2" closable @close="handleClose2">Confirm Delete</y-tag>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Modal } from 'vue3-ui';
export default defineComponent({
  setup() {
    const visible = ref(true);
    const visible2 = ref(true);

    const handleClose = () => {
      visible.value = false;
    };
    
    const handleClose2 = () => {
      Modal.confirm({
        title: 'Confirm',
        content: 'do you want to delete ?',
        onConfirm: () => {
          visible2.value = false;
          return true;
        },
      });
    };

    return {
      visible,
      visible2,
      handleClose,
      handleClose2,
    };
  },
});
</script>
