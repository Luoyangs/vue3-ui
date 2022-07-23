<docs>
---
title: 输入框类型
---

添加 `type` 属性即可给输入框设置不同类型，目前支持`text`, `textarea`, `password`, 默认`text`。`textarea` 可以配置 `autosize`属性
</docs>

<template>
  <y-input placeholder="文本输入框"></y-input>
  <y-input type="password" placeholder="密码输入框"></y-input>
  <y-input type="textarea" placeholder="长文本输入框"></y-input>
  <y-input type="textarea" autosize placeholder="长文本输入框"></y-input>
  <y-input type="textarea" :autosize="autosizeConfig" placeholder="长文本输入框"></y-input>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'Type',

  setup() {
    const autosizeConfig = reactive({
      minRows: 3,
      maxRows: 6,
    });

    return {
      autosizeConfig,
    };
  },
});
</script>
