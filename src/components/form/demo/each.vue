<docs>
---
title: 动态表单
---

配置 `each` 属性，可以支持动态表单
</docs>

<template>
  <y-form ref="formRef" :model="formModel" :rules="formRules">
    <template v-for="(student, index) in formModel.students" :key="index">
      <y-form-item
        :label="`Student ${index + 1}`"
        :prop="`students[${index}].name`"
      >
        <y-input v-model="student.name" />
        <y-button @click="handleDeleteStudent(index)">Delete</y-button>
      </y-form-item>
    </template>
    <y-form-item prop="students"> </y-form-item>
    <div class="btn-wrap">
      <y-button @click="handleAddStudent">Add</y-button>
      <y-button @click="handleCancel">取消</y-button>
      <y-button type="primary" @click="handlePost">提交</y-button>
    </div>
  </y-form>
</template>

<script>
import { ref, defineComponent, reactive } from "vue";
import { required, minLength } from "vuelidate/lib/validators";

export default defineComponent({
  name: "Each",
  setup() {
    const formRef = ref(null);
    const formModel = reactive({
      students: [
        {
          name: "",
        },
        {
          name: "",
        },
      ],
    });
    const formRules = {
      students: [
        { minLength: minLength(4), message: "Required at least 4 students" },
        {
          $each: {
            name: [
              {
                required,
                message: "Please input student name",
                trigger: "blur",
              },
            ],
          },
        },
      ],
    };
    const handleAddStudent = () => {
      formModel.students.push({
        name: "",
      });
    };
    const handleDeleteStudent = (index) => {
      formModel.students.splice(index, 1);
    };
    const handleCancel = (value) => {
      console.log("handleCancel", value);
    };
    const handlePost = () => {
      console.log("handlePost", formRef.value);
      formRef.value.validate(({ valid, invalidFields }) => {
        console.log("validate", valid, invalidFields);
      });
    };

    return {
      formRef,
      formModel,
      formRules,
      handlePost,
      handleCancel,
      handleAddStudent,
      handleDeleteStudent,
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
  padding: 14px 0;
  border-radius: 4px;
}
</style>
