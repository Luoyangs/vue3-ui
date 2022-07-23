<docs>
---
title: 自定义页脚
---

更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态，完成后关闭。
不需要默认确定取消按钮时，你可以把 `footer` 设为 `null`。
</docs>

<template>
  <div>
    <y-button @click="showModal">Custom Footer</y-button>
    <y-button @click="showModal2">Without Footer</y-button>
    
    <y-modal v-model:visible="visible" title="Basic Modal">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template #footer>
        <y-button
          key="back"
          @click="handleCancel">
          Return
        </y-button>
        <y-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk">
          Submit
        </y-button>
      </template>
    </y-modal>
    <y-modal v-model:visible="visible2" title="Basic Modal" :footer="null">
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
    const visible2 = ref(false);
    const loading = ref(false);

    const showModal = () => {
      visible.value = true;
    };

    const showModal2 = () => {
      visible2.value = true;
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      loading.value = true;
      setTimeout(() => {
        visible.value = false;
        loading.value = false;
      }, 2000);
    };

    const handleCancel = () => {
      visible.value = false;
    };

    return {
      visible,
      visible2,
      loading,
      showModal,
      showModal2,
      handleOk,
      handleCancel,
    };
  },
});
</script>
