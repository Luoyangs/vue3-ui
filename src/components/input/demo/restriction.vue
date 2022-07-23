<docs>
---
title: 输入规则
---

使用`restriction`，`restriction-type` 给输入框配置自定义规则（正则）
</docs>

<template>
  <y-input
    placeholder="请输入数字"
    restriction="number">
  </y-input>
  <y-input
    placeholder="请输入数字"
    restriction-type="value"
    :restriction="restriction">
  </y-input>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Restriction",

  setup() {
    const restriction = (val: string) =>{
      return /^.{1,3}$/.test(val);
    };

    return {
      restriction,
    };
  }
});
</script>
