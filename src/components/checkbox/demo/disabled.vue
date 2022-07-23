<docs>
---
title: 禁用状态
---
配置 `disabled` 就可以使之处于禁用状态，可以支持单个或者 `checkbox-group`
</docs>

<template>
  <y-checkbox disabled>Checkbox</y-checkbox>
  <y-checkbox v-model="value" disabled>Checkbox</y-checkbox>
  <y-checkbox-group v-model="groupValue" disabled>
    <y-checkbox
      v-for="option in options"
      :key="option.value"
      :disabled="option.disabled"
      :value="option.value">
      {{option.label}}
    </y-checkbox>
  </y-checkbox-group>
  <y-checkbox-group v-model="groupValue">
    <y-checkbox
      v-for="option in options"
      :key="option.value"
      :disabled="option.disabled"
      :value="option.value">
      {{option.label}}
    </y-checkbox>
  </y-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Disabled",
  setup() {
    const state = reactive({
      value: true,
      groupValue: [],
      options: [
        {value: 'a', label: 'Option A'},
        {value: 'b', label: 'Option B', disabled: true},
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
