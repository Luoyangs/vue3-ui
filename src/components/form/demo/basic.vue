<docs>
---
title: 基础类型
---

简单使用form表单
</docs>

<template>
  <y-form ref="formRef" :model="formModel" :rules="formRules">
    <y-form-item prop="radioValue" label="Radio Value">
      <y-radio
        name="radio-demo"
        v-model="formModel.radioValue"
        @change="handleValueChange"
      >
        RadioA
      </y-radio>
    </y-form-item>
    <y-form-item prop="input" label="Input Value">
      <y-input name="radio-demo" v-model="formModel.input" />
    </y-form-item>
    <y-button @click="handleCancel"> 取消 </y-button>
    <y-button type="primary" @click="handlePost"> 提交 </y-button>
  </y-form>
</template>

<script>
import { ref, defineComponent, reactive } from "vue";
import { required } from "vuelidate/lib/validators";

export default defineComponent({
  name: "Basic",
  setup() {
    const formRef = ref(null);
    const validateCk = (x, y, z) => {
      console.log("validateCk", x, y, z);
      return false;
    };

    const formModel = reactive({
      radioValue: "",
      input: "",
    });
    const formRules = {
      radioValue: [
        { validator: validateCk, message: "Please select Activity zone" },
      ],
      input: [{ required, message: "Please input Activity zone" }],
    };

    const handleValueChange = (value) => {
      console.log("value", value);
    };
    const handleCancel = (value) => {
      console.log("handleCancel", value);
    };
    const handlePost = (value) => {
      console.log("handlePost", value);
      formRef.value.validate(({ valid, invalidFields }) => {
        console.log("validate", valid, invalidFields);
      });
    };

    return {
      formRef,
      formModel,
      formRules,
      handleValueChange,
      handlePost,
      handleCancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.yoga-button {
  margin-right: 12px;
}
.btn-wrap {
  display: inline-block;
  background: rgba(0, 0, 0, 0.5);
  padding: 14px 24px;
  margin-left: 16px;
  border-radius: 4px;
}
</style>
