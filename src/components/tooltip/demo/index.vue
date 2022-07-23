<template>
  <demo-block>
    <basic />
    <custom />
    <disabled />
  </demo-block>
  <doc />
</template>

<script lang="ts" setup>
import Basic from './base.vue';
import Custom from './custom.vue';
import Disabled from './disabled.vue';
import Doc from '../README.md';
</script>