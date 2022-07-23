<docs>
---
title: 自定义尺寸
---

modal可以有三种不同尺寸，small(420px)、default(520px)、large(680px)，此外可以使用`width`来设置模态对话框的宽度
</docs>

<template>
  <div>
    <y-button @click="showModal('large')">Large Modal</y-button>
    <y-button @click="showModal('normal')">Normal Modal</y-button>
    <y-button @click="showModal('small')">Small Modal</y-button>
    <y-button @click="showModal('custom')">Custom Modal</y-button>
    <y-button @click="showModal('full')">Fullscreen Modal</y-button>
    <y-modal
      v-model:visible="visible"
      title="Basic Modal"
      v-bind="modalProps"
      @confirm="handleOk">
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
    const modalProps = ref({});

    const showModal = (size: string) => {
      if (size === 'custom') {
        modalProps.value = {
          width: 1200,
        };
      } else if (size === 'full') {
        modalProps.value = {
          width: '100%',
          wrapClassName: 'full-modal',
        };
      } else {
        modalProps.value = {
          size,
        };
      }
      visible.value = true;
    };

    const handleOk = () => {
      visible.value = false;
    };
    return {
      visible,
      modalProps,
      showModal,
      handleOk,
    };
  },
});
</script>

<style lang="scss">
.full-modal {
  .yoga-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .yoga-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
    border-radius: 0;
  }
  .yoga-modal-body {
    flex: 1;
  }
}
</style>