<template>
  <div :class="['single-demo', vertical ? 'vertical' : '']">
    <div class="single-label">{{label}} </div>
    <div class="single-slot">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SingleDemo',
  props: {
    label: String,
    vertical: {
      type: Boolean,
      default: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.single-demo {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &.vertical {
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 16px;

    .single-label {
      margin-bottom: 8px;
    }
  }

  .single-label {
    margin-right: 8px;
    font-size: 13px;
    color: #666;
    font-weight: 500;
  }

  .single-slot {
    width: 100%;
    max-width: 260px;
  }
}
</style>
