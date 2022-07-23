<template>
  <demo-block>
    <basic />
    <type />
    <size />
    <clearable />
    <disabled />
    <prefix-suffix />
    <with-word-limit />
    <helper />
    <restriction />
    <Numbric />
    <group />
  </demo-block>
  <doc />
</template>

<script lang="ts" setup>
import Basic from './base.vue';
import Type from './type.vue';
import Size from './size.vue';
import Clearable from './clearable.vue';
import Disabled from './disabled.vue';
import PrefixSuffix from './prefix-suffix.vue';
import WithWordLimit from './with-word-limit.vue';
import helper from './helper.vue';
import Restriction from './restriction.vue';
import Numbric from './numeric.vue';
import Group from './group.vue';
import Doc from '../README.md';
</script>

<style lang="scss">
.input-pages {
  .yoga-input {
    margin-bottom: 16px;
  }
}
</style>