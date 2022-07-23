<template>
  <demo-block>
    <Basic />
    <Icon />
    <Disabled />
    <Dashed />
    <Circle />
    <Size />
    <Loading />
    <FullWidth />
  </demo-block>
  <doc />
</template>
<script setup lang="ts">
import Basic from './base.vue';
import Disabled from './disabled.vue';
import Dashed from './dashed.vue';
import Circle from './circle.vue';
import Size from './size.vue';
import Icon from './icon.vue';
import Loading from './loading.vue';
import FullWidth from './full-width.vue';
import Doc from '../README.md';
</script>

<style lang="scss">
.button-pages {
  .yoga-button {
    margin-right: 8px;
    margin-bottom: 12px;
  }
}
</style>
