<docs>
---
title: 日期类型
---

可以使用 `type`配置个性化的面板
</docs>

<template>
  <single-demo label="选择单个日期">
    <y-date-picker
      placeholder="默认类型"
      v-model="value" />
  </single-demo>

  <single-demo label="年选择器">
    <y-date-picker
    type="year"
    placeholder="年选择器"
    v-model="year" />
  </single-demo>

  <single-demo label="月选择器">
    <y-date-picker
      type="month"
      placeholder="月选择器"
      v-model="month" />
  </single-demo>

  <single-demo label="周选择器">
    <y-date-picker
      type="week"
      placeholder="周选择器"
      v-model="week" />
  </single-demo>

  <single-demo label="日期范围选择器">
    <y-date-picker
      type="daterange"
      placeholder="日期范围选择器"
      v-model="range" />
  </single-demo>

  <single-demo label="月范围选择器">
    <y-date-picker
      type="monthrange"
      placeholder="月范围选择器"
      v-model="monthrange" />
  </single-demo>

  <single-demo label="年范围选择器">
    <y-date-picker
      type="yearrange"
      placeholder="年范围选择器"
      v-model="yearrange" />
  </single-demo>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Type",
  setup() {
    const value = ref(null);
    const year = ref(null);
    const month = ref(null);
    const week = ref(null);
    const range = ref({
      startDate: new Date(2021, 11, 9),
      endDate: new Date(2022, 0, 9),
    });
    const monthrange = ref({
      startDate: new Date(2021, 11, 1),
      endDate: new Date(2022, 0, 9),
    });
    const yearrange = ref({});

    return {
      value,
      year,
      month,
      week,
      range,
      yearrange,
      monthrange,
    };
  }
});
</script>
