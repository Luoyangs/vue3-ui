<docs>
---
title: 数字输入框
---

使用`type="numeric"`使输入框变成数字输入框，可配合使用`precision`， `min`， `max`属性
</docs>

<template>
  <y-input v-model="value11" type="numeric"></y-input>
  <y-input v-model="value12" type="numeric" :precision="2">
    <template v-slot:help>Input tip: value precision is 2</template>
  </y-input>
  <y-input v-model="value13" type="numeric" :precision="2" :max="99.98" :min="2">
    <template v-slot:help>Input tip: min value: 2, max value: 99.98, precision is 2</template>
  </y-input>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'Type',

  setup() {
    const state = reactive({
      value11: '',
      value12: '',
      value13: '',
    });

    return toRefs(state);
  },
});
</script>
