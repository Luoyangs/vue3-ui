<docs>
---
title: 固定宽度
---
配置 `checkbox-group`，方便的从数组生成 checkbox
</docs>

<template>
  <div>{{value}}</div>
  <y-radio-group v-model="type" type="outline">
    <y-radio :value="null">Default</y-radio>
    <y-radio value="solid">Solid</y-radio>
    <y-radio value="outline">Outline</y-radio>
  </y-radio-group>
  <y-checkbox v-model="disabled">Disabled</y-checkbox>
  <y-checkbox-group v-model="value" :type="type" :disabled="disabled">
    <y-checkbox
      v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{option.label}}
    </y-checkbox>
  </y-checkbox-group>
  <y-checkbox-group v-model="value" vertical :disabled="disabled">
    <y-checkbox
      v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{option.label}}
    </y-checkbox>
  </y-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Group",
  setup() {
    const state = reactive({
      value: [],
      type: null,
      disabled: false,
      options: [
        {value: 'a', label: 'Option A'},
        {value: 'b', label: 'Option B'},
        {value: 'c', label: 'Option C'},
        {value: 'd', label: 'Option D'},
      ],
    });


    return {
      ...toRefs(state),
    };
  }
});
</script>
