<docs>
---
title: 基础用法
---

switch 的基本用法
</docs>

<template>
  <y-switch></y-switch>
  <y-switch v-model="switchValue"></y-switch>
  <y-switch :modelValue="switchValue2" @change="handleValueChange"></y-switch>
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
