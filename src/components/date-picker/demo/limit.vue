<docs>
---
title: 限定日期
---

使用 `min` / `max` 限定最小、最大日期
</docs>
<template>
  <single-demo label="限定最大最小日期">
    <y-date-picker
      :min="minDate"
      :max="maxDate"
      v-model="value" />
  </single-demo>
  <single-demo label="固定起始日期，并限定最大最小日期">
    <y-date-picker
      type="daterange"
      fixed="start"
      :min="minDate"
      :max="maxDate"
      v-model="range" />
  </single-demo>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Limit",
  setup() {
    const minDate = new Date(2020, 9, 9);
    const maxDate = new Date(2023, 8, 8);
    const value = ref(null);
    const range = ref({
      startDate: minDate,
      endDate: new Date(2022, 0, 9),
    });

    watch(() => value, (val) => {
      console.log('value:', val);
    });

    return {
      value,
      range,
      minDate,
      maxDate,
    };
  }
});
</script>
