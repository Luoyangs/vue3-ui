<docs>
---
title: 输入框前缀/后缀
---

使用`prefix-label`，`prefix-icon`， `v-slot:prefix`， `suffix-label`， `suffix-icon`， `v-slot:suffix`给输入框配置前缀、后缀
</docs>

<template>
  <y-input prefix-label="UserName"></y-input>
  <y-input :prefix-icon="MaleIcon"></y-input>
  <y-input><template v-slot:prefix>用户名</template></y-input>
  <y-input suffix-label="@baidu.com"></y-input>
  <y-input :suffix-icon="SearchIcon"></y-input>
  <y-input><template v-slot:suffix>RMB</template></y-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MaleIcon from './male.svg?component';
import SearchIcon from './search.svg?component';

export default defineComponent({
  name: 'PrefixAndSuffix',

  setup() {
    return {
      MaleIcon,
      SearchIcon,
    };
  },
});
</script>
