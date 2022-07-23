<template>
  <y-select v-model="value"></y-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Base',
  setup() {
    const value = ref('');

    return {
      value,
    };
  },
});
</script>
