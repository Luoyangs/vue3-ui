<docs>
---
title: 按钮群组
---

单选按钮群组支持`solid`，`outline`，`vertical`，默认几种样式。
</docs>

<template>
  <y-radio-group v-model="radioValue" @change="handleValueChange">
    <y-radio value="a">RadioA</y-radio>
    <y-radio value="b">RadioB</y-radio>
    <y-radio value="c">RadioC</y-radio>
  </y-radio-group>
  <y-radio-group
    v-model="radioValue"
    type="solid"
    @change="handleValueChange">
    <y-radio value="a">RadioA</y-radio>
    <y-radio value="b">RadioB</y-radio>
    <y-radio value="c">RadioC</y-radio>
  </y-radio-group>
  <y-radio-group
    v-model="radioValue"
    type="outline"
    @change="handleValueChange">
    <y-radio value="a">RadioA</y-radio>
    <y-radio value="b">RadioB</y-radio>
    <y-radio value="c">RadioC</y-radio>
  </y-radio-group>
  <y-radio-group v-model="radioValue" vertical @change="handleValueChange">
    <y-radio value="a">Default</y-radio>
    <y-radio value="b">RadioB</y-radio>
    <y-radio value="c">RadioC</y-radio>
  </y-radio-group>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "Group",
  setup() {
    const radioValue = ref(null);

    const handleValueChange = (value) => {
      console.log("value", value);
    };

    const handleUpdateModel = (value) => {
      console.log("value", value);
      radioValue2.value = value;
    };

    return {
      radioValue,
      handleValueChange,
      handleUpdateModel,
    };
  },
});
</script>

<style lang="scss" scoped>
.yoga-radio-group {
  margin-top: 12px;
}
</style>
