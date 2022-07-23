<docs>
---
title: 固定起始/结束日期
---

使用 `fixed` 可以固定起始日期或者结束日期，在某些场景下，只能设置一段日期的起始或者结束日期，这个属性很有用
</docs>

<template>
  <single-demo label="固定起始日期">
    <y-date-picker
      type="daterange"
      fixed="start"
      placeholder="请选择日期范围"
      v-model="startRange" />
  </single-demo>

  <single-demo label="固定结束日期">
    <y-date-picker
      type="daterange"
      fixed="end"
      placeholder="请选择日期范围"
      v-model="endRange" />
  </single-demo>

  <single-demo label="固定起始月份">
    <y-date-picker
      type="monthrange"
      fixed="start"
      placeholder="请选择日期范围"
      v-model="startMonthRange" />
  </single-demo>

  <single-demo label="固定结束月份">
    <y-date-picker
      type="monthrange"
      fixed="end"
      placeholder="请选择日期范围"
      v-model="endMonthRange" />
  </single-demo>

  <single-demo label="固定起始年份">
    <y-date-picker
      type="yearrange"
      fixed="start"
      placeholder="请选择日期范围"
      v-model="startYearRange" />
  </single-demo>

  <single-demo label="固定结束年份">
    <y-date-picker
      type="yearrange"
      fixed="end"
      placeholder="请选择日期范围"
      v-model="endYearRange" />
  </single-demo>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Fixed",
  setup() {
    const startRange = ref({
      startDate: new Date(2021, 11, 9),
      endDate: new Date(2022, 2, 9),
    });
    const endRange = ref({
      startDate: new Date(2021, 11, 9),
      endDate: new Date(2022, 2, 9),
    });
    const startMonthRange = ref({
      startDate: new Date(2021, 11, 9),
      endDate: new Date(2023, 2, 9),
    });
    const endMonthRange = ref({
      startDate: new Date(2021, 11, 9),
      endDate: new Date(2023, 2, 9),
    });
    const startYearRange = ref({
      startDate: new Date(2021, 11, 9),
      endDate: new Date(2022, 2, 9),
    });
    const endYearRange = ref({
      startDate: new Date(2021, 11, 9),
      endDate: new Date(2022, 2, 9),
    });

    watch(() => startRange, (val) => {
      console.log('startRange:', val);
    });
    watch(() => startRange, (val) => {
      console.log('endRange:', val);
    });

    return {
      startRange,
      endRange,
      startMonthRange,
      endMonthRange,
      startYearRange,
      endYearRange,
    };
  }
});
</script>
