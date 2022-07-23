<docs>
---
title: 辅助输入框
---

支持 `error`、`error-message`、`help-text`、`v-slot:help` 可以给输入框配置各种辅助文案
</docs>

<template>
  <y-input error error-message="校验失败，这是提示语句"></y-input>
  <y-input help-text="这是辅助文案，请在合适的位置使用"></y-input>
  <y-input>
    <template #help>这是辅助文案，请在合适的位置使用</template>
  </y-input>
  <y-input type="textarea" error error-message="校验失败，这是提示语句"></y-input>
  <y-input type="textarea" help-text="这是辅助文案，请在合适的位置使用"></y-input>
  <y-input type="textarea">
    <template #help>这是辅助文案，请在合适的位置使用</template>
  </y-input>
</template>
