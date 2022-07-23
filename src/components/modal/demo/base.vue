<docs>
---
title: 基础用法
---

简单的modal
</docs>

<template>
  <div>
    <y-button @click="showModal">Open Modal</y-button>
    <y-modal v-model:visible="visible" title="Basic Modal" @confirm="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </y-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Base',
  setup() {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      showModal,
      handleOk,
    };
  },
});
</script>
