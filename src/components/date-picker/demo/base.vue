<docs>
---
title: 基础方法
---

`date-picker` 有几种简单的使用方法
</docs>

<template>
  <single-demo label="选择单个日期">
    <y-date-picker placeholder="选择日期" v-model="value" />
  </single-demo>

  <single-demo label="以周一作为一周开始">
    <y-date-picker
      :start-of-week="1"
      placeholder="以周一作为一周开始"
      v-model="value" />
  </single-demo>

  <single-demo label="不显示非本月的日期">
    <y-date-picker
      :show-overflow-date="false"
      placeholder="不显示非本月的日期"
      v-model="value" />
  </single-demo>

  <single-demo label="自定义展示的日期格式 YYYY-MM-DD hh:mm:ss">
    <y-date-picker
      format="YYYY-MM-DD hh:mm:ss"
      placeholder="自定义展示的日期格式"
      v-model="value" />
  </single-demo>

  <single-demo label="使用函数格式化展示日期">
    <y-date-picker
      :format="formatFun"
      placeholder="自定义展示的日期格式"
      v-model="value" />
  </single-demo>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Base",
  setup() {
    const value = ref(null);

    watch(() => value, (val) => {
      console.log('value:', val);
    });

    const formatFun = (date: Date) => {
      if (date.getTime() > Date.now()) {
        return dayjs(date).format('YYYY-MM-DD');
      } else {
        return dayjs(date).format('DD-MM-YYYY');
      }
    };

    return {
      value,
      formatFun,
    };
  }
});
</script>
