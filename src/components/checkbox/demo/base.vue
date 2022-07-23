<docs>
---
title: 基本用法
---
简单使用checkbox
</docs>

<template>
  <y-checkbox>Checkbox</y-checkbox>
  <y-checkbox v-model="value">Checkbox</y-checkbox>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Base",
  setup() {
    const value = ref(false);

    return {
      value
    };
  }
});
</script>
