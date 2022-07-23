<docs>
---
title: 基础单选按钮
---

单选按钮的使用方法
</docs>

<template>
  <y-radio v-model="radioValue" @change="handleValueChange"> RadioA </y-radio>
  <y-radio
    :modelValue="radioValue2"
    @update:modelValue="handleUpdateModel"
    @change="handleValueChange"
  >
    RadioA
  </y-radio>

  <div class="line">
    <y-radio
      name="radio-demo"
      value="boy"
      v-model="radioValue3"
      @change="handleValueChange"
    >
      Boy
    </y-radio>
    <y-radio
      name="radio-demo"
      value="girl"
      v-model="radioValue3"
      @change="handleValueChange"
    >
      Girl
    </y-radio>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "Basic",
  setup() {
    const radioValue = ref(null);
    const radioValue2 = ref(null);
    const radioValue3 = ref("");

    const handleValueChange = (value) => {
      console.log("value", value);
    };

    const handleUpdateModel = (value) => {
      console.log("value", value);
      radioValue2.value = value;
    };

    return {
      radioValue,
      radioValue2,
      radioValue3,
      handleValueChange,
      handleUpdateModel,
    };
  },
});
</script>

<style lang="scss" scoped>
.yoga-radio {
  margin-right: 12px;
}
</style>
