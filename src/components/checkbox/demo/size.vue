<docs>
---
title: 按钮尺寸
---

添加 `size` 属性即可给按钮设置不同尺寸，目前支持`small`, `normal`, `large`, 默认`normal`。
</docs>

<template>
  <y-radio-group v-model="type" type="outline">
    <y-radio value="solid">Solid</y-radio>
    <y-radio value="outline">Outline</y-radio>
  </y-radio-group>
  <y-checkbox-group v-model="value" :type="type" size="large">
    <y-checkbox
      v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{option.label}}
    </y-checkbox>
  </y-checkbox-group>
  <y-checkbox-group v-model="value" :type="type" size="normal">
    <y-checkbox
      v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{option.label}}
    </y-checkbox>
  </y-checkbox-group>
  <y-checkbox-group v-model="value" :type="type" size="small">
    <y-checkbox
      v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{option.label}}
    </y-checkbox>
  </y-checkbox-group>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Group",
  setup() {
    const state = reactive({
      type: 'solid',
      disabled: false,
      value: ['a'],
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

<style lang="scss" scoped>
.yoga-radio-group {
  margin-bottom: 12px;
}
</style>
