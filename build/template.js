// src/components/xxx/demo/index.md
module.exports.demoIndex = {
  path: 'src/components/{{component}}/demo/index.vue',
  temp: `<template>
  <demo-block>
    <Basic />
  </demo-block>
  <doc />
</template>
<script setup lang="ts">
import Basic from './base.vue';
import Doc from '../README.md';
</script>

<style lang="scss">
.{{component}}-pages {

}
</style>

`};

// src/components/xxx/demo/base.vue
module.exports.demoBase = {
  path: 'src/components/{{component}}/demo/base.vue',
  temp: `<template>
  <y-{{component}}></y-{{component}}>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Base',
});
</script>
`};

// src/components/xx/types.ts
module.exports.componentType = {
  path: 'src/components/{{component}}/types.ts',
  temp: `import { ExtractPropTypes } from 'vue';

export const {{CAMEL_CASE_COMPONENT}}Props = {

};

export type {{COMPONENT}}Props = ExtractPropTypes<typeof {{CAMEL_CASE_COMPONENT}}Props>;
`};

// src/components/xx/styles/xx.scss
module.exports.componentStyle = {
  path: 'src/components/{{component}}/styles/{{component}}.scss',
  temp: ""
};

// src/components/xx/src/xxx.tsx
module.exports.componentSrc = {
  path: 'src/components/{{component}}/src/{{component}}.tsx',
  temp: `import { defineComponent, SetupContext } from 'vue';
import { {{CAMEL_CASE_COMPONENT}}Props } from '@components/{{component}}/types';
import type { {{COMPONENT}}Props } from '@components/{{component}}/types';

export default defineComponent({
  name: 'Y{{COMPONENT}}',
  props: {{CAMEL_CASE_COMPONENT}}Props,
  setup(props: {{COMPONENT}}Props, { slots }: SetupContext) {

    return () => {
      return <div>{{component}}</div>;
    };
  }
});
`};

// src/components/xx/index.ts
module.exports.componentIndex = {
  path: 'src/components/{{component}}/index.ts',
  temp: `import {{COMPONENT}} from '@components/{{component}}/src/{{component}}';
import './styles/{{component}}.scss';

export { {{COMPONENT}} };
`};

// src/components/xx/README.md
module.exports.componentReadme = {
  path: 'src/components/{{component}}/README.md',
  temp: `---
category: Components
type: 通用
title: {{component}}
subtitle: {{COMPONENT}}
---

## API

**{{COMPONENT}} props**
`};

// src/components/index.ts
module.exports.component = {
  path: 'src/components/index.ts',
  event: 'update',
  temp: `export * from './{{component}}';`
};

// src/index.ts
module.exports.index = {
  path: 'src/index.ts',
  event: 'update',
  temp: '  {{COMPONENT}},'
};
