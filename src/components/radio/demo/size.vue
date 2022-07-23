<docs>
---
title: 按钮组尺寸
---

添加 `size` 属性即可给按钮设置不同尺寸，目前支持`small`, `normal`, `large`, 默认`normal`。
</docs>

<template>
  <y-radio-group v-model="type" type="outline">
    <y-radio value="solid">Solid</y-radio>
    <y-radio value="outline">Outline</y-radio>
  </y-radio-group>

  <y-radio-group
    v-model="radioValue"
    :type="type"
    size="large"
    @change="handleValueChange">
    <y-radio value="a">RadioA</y-radio>
    <y-radio value="b">RadioB</y-radio>
    <y-radio value="c">RadioC</y-radio>
  </y-radio-group>
  <y-radio-group
    v-model="radioValue"
    :type="type"
    @change="handleValueChange">
    <y-radio value="a">RadioA</y-radio>
    <y-radio value="b">RadioB</y-radio>
    <y-radio value="c">RadioC</y-radio>
  </y-radio-group>
  <y-radio-group
    v-model="radioValue"
    :type="type"
    size="small"
    @change="handleValueChange">
    <y-radio value="a">RadioA</y-radio>
    <y-radio value="b">RadioB</y-radio>
    <y-radio value="c">RadioC</y-radio>
  </y-radio-group>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "Size",
  setup() {
    const type = ref("solid");
    const radioValue = ref();

    const handleValueChange = (value: string) => {
      console.log("value", value);
      radioValue.value = value;
    };

    return {
      type,
      radioValue,
      handleValueChange,
    };
  },
});
</script>
<style lang="scss" scoped>
.yoga-radio-group {
  margin-bottom: 12px;
}
</style>
