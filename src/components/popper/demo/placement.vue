<docs>
---
title: 弹出层的位置
---

配置 `placement` 可以自定义popper弹出层位置，支持 `top` 、 `top-start` 、 `top-end` 、 `right` 、 `right-start` 、 `right-end` 、 `bottom` 、 `bottom-start` 、 `bottom-end` 、 `left` 、 `left-start` 、 `left-end`，默认 `bottom`。
</docs>

<template>
  <y-popper :placement="placement">
    <template #trigger>
      <div class="trigger-box">
        <y-radio-group v-model="placement" type="solid">
          <y-radio
            v-for="p in topPlacements"
            :key="p"
            :value="p">
            {{ p }}
          </y-radio>
        </y-radio-group>
        <div class="flex-box">
          <y-radio-group v-model="placement" type="solid" vertical>
            <y-radio
              v-for="p in leftPlacements"
              :key="p"
              :value="p">
              {{ p }}
            </y-radio>
          </y-radio-group>
          <y-radio-group v-model="placement" type="solid" vertical>
            <y-radio
              v-for="p in rightPlacements"
              :key="p"
              :value="p">
              {{ p }}
            </y-radio>
          </y-radio-group>
        </div>
        <y-radio-group v-model="placement" type="solid">
          <y-radio
            v-for="p in bottomPlacements"
            :key="p"
            :value="p">
            {{ p }}
          </y-radio>
        </y-radio-group>
      </div>
    </template>
    popper content
  </y-popper>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Placement",
  setup() {
    const topPlacements = ['top-start', 'top', 'top-end'];
    const rightPlacements = ['right-start', 'right', 'right-end'];
    const bottomPlacements = ['bottom-start', 'bottom', 'bottom-end'];
    const leftPlacements = ['left-start', 'left', 'left-end'];
    const placement = ref('bottom');

    return {
      placement,
      topPlacements,
      rightPlacements,
      bottomPlacements,
      leftPlacements,
    };
  },
});
</script>

<style lang="scss" scoped>
.trigger-box {
  text-align: center;
  width: 320px;
}
.flex-box {
  width: 100%;
  margin: 16px 0px;
  display: flex;
  justify-content: space-between;
}
</style>
