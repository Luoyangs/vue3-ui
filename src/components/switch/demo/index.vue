<template>
  <demo-block>
    <basic />
    <disabled />
    <size />
    <custom />
  </demo-block>
  <doc />
</template>

<script lang="ts" setup>
import Basic from './base.vue';
import Disabled from './disabled.vue';
import Size from './size.vue';
import Custom from './custom.vue';
import Doc from '../README.md';
</script>
<style lang="scss">
.yoga-switch {
  margin-right: 16px;
}
</style>
