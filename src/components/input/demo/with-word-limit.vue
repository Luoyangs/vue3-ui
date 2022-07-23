<docs>
---
title: 长度限制
---

添加 `maxlength` 属性即可给输入框设置长度限制，`show-word-limit` 属性配置是否显示限制
</docs>

<template>
  <y-input :maxlength="300" show-word-limit></y-input>
  <y-input type="textarea" :maxlength="300" show-word-limit></y-input>
</template>
