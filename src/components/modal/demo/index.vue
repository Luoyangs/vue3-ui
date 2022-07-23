<template>
  <demo-block>
    <Basic />
    <Async />
    <Footer />
    <Width />
    <ButtonProps />
    <Instance />
    <Router />
    <Manual />
  </demo-block>
  <doc />
</template>

<script lang="ts" setup>
import Basic from './base.vue';
import Async from './async.vue';
import Footer from './footer.vue';
import Width from './width.vue';
import ButtonProps from './button-props.vue';
import Instance from './instance.vue';
import Router from './router.vue';
import Manual from './manual.vue';
import Doc from '../README.md';
</script>

<style lang="scss">
.modal-pages {
  .yoga-button + .yoga-button {
    margin-left: 8px;
  }
}
</style>