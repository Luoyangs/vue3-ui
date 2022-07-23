<template>
  <demo-block>
    <Basic />
    <Color />
    <Closeable />
    <Status />
    <Size />
  </demo-block>
  <Doc />
</template>

<script lang="ts" setup>
import Basic from './basic.vue';
import Color from './colorful.vue';
import Closeable from './closeable.vue';
import Status from './status.vue';
import Size from './size.vue';
import Doc from '../README.md';
</script>

<style lang="scss">
.tag-pages {
  .yoga-tag {
    margin-bottom: 8px;
  }
}
</style>
