<docs>
---
title: 禁用状态
---

使用 `disabled` 可以禁用整个日期选择器，使用 `disabled-date` 可以禁用某些日期
</docs>

<template>
  <single-demo label="disabled date picker">
    <y-date-picker
      disabled
      v-model="value" />
  </single-demo>
  <single-demo label="disabled some date">
    <y-date-picker
      type="daterange"
      :disabled-date="disabledDate"
      v-model="range" />
  </single-demo>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Disabled",
  setup() {
    const value = ref(null);
    const range = ref(null);

    const disabledDate = (date: Date) => {
      return date.getTime() < Date.now();
    };

    return {
      value,
      range,
      disabledDate,
    };
  }
});
</script>
