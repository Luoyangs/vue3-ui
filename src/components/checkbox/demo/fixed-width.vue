<docs>
---
title: 固定宽度
---
配置 `fixed-width` 就可以使`checkbox-group`所有选项等宽
</docs>

<template>
  <y-checkbox v-model="useFixed">Fixed Width 150PX</y-checkbox>
  <y-checkbox-group v-model="value" :fixed-width="fixedWidth">
    <y-checkbox
      v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{option.label}}
    </y-checkbox>
  </y-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";

export default defineComponent({
  name: "Group",
  setup() {
    const state = reactive({
      useFixed: true,
      value: [],
      options: [
        {value: 'a', label: 'Long Long Long Long Option A'},
        {value: 'b', label: 'Option Long B'},
        {value: 'c', label: 'Option Long Long C'},
        {value: 'd', label: 'Option Long Long D'},
      ],
    });
    const fixedWidth = computed(() => state.useFixed ? 150 : undefined);

    return {
      fixedWidth,
      ...toRefs(state),
    };
  },
});
</script>
