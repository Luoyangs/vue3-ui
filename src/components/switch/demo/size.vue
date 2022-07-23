<docs>
---
title: 开关尺寸
---

添加 `size` 属性即可给按钮设置不同尺寸，目前支持`small`, `normal`, `large`, 默认`normal`。
</docs>

<template>
  <y-switch size="large"></y-switch>
  <y-switch size="normal"></y-switch>
  <y-switch size="small"></y-switch>
  <y-switch size="large" active-text="开" inactive-text="关"></y-switch>
  <y-switch size="normal" active-text="开" inactive-text="关"></y-switch>
  <y-switch size="small" active-text="开" inactive-text="关"></y-switch>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Base",
  setup() {
    const switchValue = ref(false);
    const switchValue2 = ref(true);
    const handleValueChange = (value: boolean) => {
      console.log('value:', value)
      switchValue2.value = value;
    }
    return {
      switchValue,
      switchValue2,
      handleValueChange,
    };
  }
});
</script>
