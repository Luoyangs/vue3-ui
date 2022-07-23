<template>
  <demo-block>
    <basic />
    <hover />
    <horizontal />
  </demo-block>
  <doc />
</template>

<script lang="ts" setup>
import Basic from './base.vue';
import Horizontal from './horizontal.vue';
import Hover from './hover.vue';
import Doc from '../README.md';
</script>