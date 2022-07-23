<docs>
---
title: 多彩标签
---

我们添加了多种预设色彩的标签样式，用作不同场景使用。如果预设值不能满足你的需求，可以设置为具体的色值。

</docs>

<template>
  <h4 style="margin-bottom: 8px">Presets:</h4>
  <div>
    <y-tag
      v-for="color in colors"
      :key="color"
      :color="color">
      {{color}}
    </y-tag>
  </div>
  <h4 style="margin: 8px 0">Outline:</h4>
  <div>
    <y-tag
      v-for="color in colors"
      :key="color"
      outline
      :color="color">
      {{color}}
    </y-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Disabled",
  setup() {
    const colors = [
      'pink',
      'red',
      'orange',
      'green',
      'cyan',
      'blue',
      'purple',
      '#f50',
      '#2db7f5',
      '#87d068',
      '#108ee9',
    ];

    return {
      colors,
    };
  },
});
</script>
