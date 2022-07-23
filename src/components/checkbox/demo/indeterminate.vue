<docs>
---
title: 部分选择
---
配置 `indeterminate` 表示checkbox是否处于部分选择的状态，一般配合`checkbox-group`使用
</docs>

<template>
  <y-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange">
    Check All
  </y-checkbox>
  <y-checkbox-group
    v-model="checkedCities"
    @change="handleCheckedCitiesChange">
    <y-checkbox
      v-for="city in cityOptions"
      :key="city"
      :value="city">
      {{ city }}
    </y-checkbox>
  </y-checkbox-group>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Indeterminate",
  setup() {
    const state = reactive({
      checkAll: false,
      checkedCities: ['Shanghai', 'Beijing'],
      cityOptions: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'],
      isIndeterminate: true,
    });
    const handleCheckAllChange = (val: boolean) => {
      state.checkedCities = val ? state.cityOptions : [];
      state.isIndeterminate = false;
    };
    const handleCheckedCitiesChange = (value: string[]) => {
      const checkedCount = value.length;
      state.checkAll = checkedCount === state.cityOptions.length;
      state.isIndeterminate = checkedCount > 0 && checkedCount < state.cityOptions.length;
    };

    return {
      ...toRefs(state),
      handleCheckAllChange,
      handleCheckedCitiesChange,
    };
  }
});
</script>
