<docs>
---
title: 异步关闭
---

点击确定后异步关闭对话框，例如提交表单。
</docs>

<template>
  <div>
    <y-button @click="showModal">Aysnc Modal</y-button>
    <y-button @click="showConfirmModal">Aysnc Confirm</y-button>
    <y-modal
      v-model:visible="visible"
      title="Basic Modal"
      :confirm-button-props="{loading}"
      @confirm="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </y-modal>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { Modal } from 'vue3-ui';

export default defineComponent({
  name: 'Base',
  setup() {
    const visible = ref(false);
    const loading = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      loading.value = true;
      setTimeout(() => {
        visible.value = false;
        loading.value = false;
      }, 2000);
    };
    function showConfirmModal() {
      const modal = Modal.confirm({
        title: 'Confirm',
        content: 'When clicked the OK button, this dialog will be closed after 2.5 second',
        async onConfirm() {
          try {
            modal.update({
              confirmButtonProps: {
                loading: true,
              },
            });
            return await new Promise((resolve) => {
              setTimeout(() => resolve(true), 2500);
            });
          } catch {
            return console.log('Oops errors!');
          } finally {
            modal.update({
              confirmButtonProps: {
                loading: false,
              },
            });
          }
        },
      });
    };

    return {
      visible,
      loading,
      showModal,
      handleOk,
      showConfirmModal,
    };
  },
});
</script>
