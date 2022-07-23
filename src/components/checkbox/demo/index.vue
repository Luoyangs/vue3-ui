<template>
  <demo-block>
    <basic />
    <disabled />
    <fixed-width />
    <group />
    <indeterminate />
    <size />
  </demo-block>
  <doc />
</template>

<script setup lang="ts">
import Basic from './base.vue';
import Disabled from './disabled.vue';
import FixedWidth from './fixed-width.vue';
import Group from './group.vue';
import Indeterminate from './indeterminate.vue';
import Size from './size.vue';
import Doc from '../README.md';
</script>

<style lang="scss">
.checkbox-pages {
  .yoga-checkbox {
    margin-right: 12px;
  }
  .yoga-checkbox-group {
    margin-top: 12px;
  }
}
</style>
