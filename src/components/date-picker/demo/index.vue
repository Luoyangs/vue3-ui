<template>
  <demo-block>
    <basic />
    <type />
    <fixed />
    <limit />
    <disabled />
    <panel />
  </demo-block>
  <doc />
</template>

<script lang="ts" setup>
import Basic from './base.vue';
import Disabled from './disabled.vue';
import Fixed from './fixed.vue';
import Limit from './limit.vue';
import Panel from './panel.vue';
import Type from './type.vue';
import Doc from '../README.md';
</script>
