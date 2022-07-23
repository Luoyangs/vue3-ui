<docs>
---
title: 禁用态
---

设置 `disabled` 可以决定是否禁用当前的单选按钮
</docs>

<template>
  <y-radio v-model="radioValue" disabled> RadioA </y-radio>
  <y-radio-group v-model="type" type="outline">
    <y-radio :value="null">Default</y-radio>
    <y-radio value="solid">Solid</y-radio>
    <y-radio value="outline">Outline</y-radio>
  </y-radio-group>
  <y-radio-group v-model="radioValue" :type="type" disabled>
    <y-radio value="a">RadioA</y-radio>
    <y-radio value="b">RadioB</y-radio>
    <y-radio value="c">RadioC</y-radio>
  </y-radio-group>
  <y-radio-group v-model="radioValue2" :type="type">
    <y-radio value="a">RadioA</y-radio>
    <y-radio value="b" disabled>RadioB</y-radio>
    <y-radio value="c">RadioC</y-radio>
  </y-radio-group>
  <y-radio-group v-model="radioValue3" :type="type" disabled>
    <y-radio value="a">RadioA</y-radio>
    <y-radio value="b">RadioB</y-radio>
    <y-radio value="c">RadioC</y-radio>
  </y-radio-group>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "Disabled",
  setup() {
    const type = ref(null);
    const radioValue = ref(null);
    const radioValue2 = ref("a");
    const radioValue3 = ref("a");

    return {
      type,
      radioValue,
      radioValue2,
      radioValue3,
    };
  },
});
</script>
<style lang="scss" scoped>
.yoga-radio-group {
  margin-top: 12px;
}
</style>
