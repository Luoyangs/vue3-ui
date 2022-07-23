<docs>
---
title: 自定义页脚按钮属性
---

传入 `confirmButtonProps` 和 `cancelButtonProps` 可分别自定义确定按钮和取消按钮的 props。

</docs>

<template>
  <div>
    <y-button @click="showModal">Open Modal with customized button props</y-button>
    <y-modal
      v-model:visible="visible"
      title="Basic Modal"
      :confirm-button-props="{ disabled: true }"
      :cancel-button-props="{ disabled: true }"
      @confirm="handleOk"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </y-modal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };

    const handleCancel = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };
    return {
      visible,
      showModal,
      handleOk,
      handleCancel,
    };
  },
});
</script>
