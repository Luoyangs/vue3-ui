import { getParameters } from 'codesandbox/lib/api/define';

const indexHtml = `<!DOCTYPE html>
<html lang='en'>
  <head>
    <title>Yoga UI Demo</title>
    <style>
      body {
        padding: 24px;
      }
    </style>
  </head>
  <body>
    <div id='app'></div>
  </body>
</html>
`;

const appVue = `<template>
  <demo />
</template>
<script>
import { defineComponent } from 'vue';
import Demo from './Demo.vue';
export default defineComponent({
components: {
  Demo,
},
});
</script>`;

const mainJs = `import { createApp } from 'vue';
import yui from 'yui';
import App from './App.vue';
const app = createApp(App);
app.use(naive);
app.mount('#app');
`;

function getDeps(code: string) {
  return (code.match(/from '([^']+)'\n/g) || [])
    .map((v) => v.slice(6, v.length - 2))
    .reduce((prevV, dep) => {
      prevV[dep] = 'latest';
      return prevV;
    }, {} as any);
}

export function getCodeSandboxParams(code: any) {
  return getParameters({
    files: {
      'package.json': {
        content: JSON.stringify({
          dependencies: {
            ...getDeps(code),
            vue: 'next',
            'vue-router': 'next',
            'naive-ui': 'latest',
          },
          devDependencies: {
            '@vue/cli-plugin-babel': '~4.5.0',
            typescript: '^4.0.5',
          },
          browserslist: ['> 0.2%', 'not dead'],
        }),
        isBinary: false,
      },
      'index.html': {
        content: indexHtml,
        isBinary: false,
      },
      'src/Demo.vue': {
        content: code,
        isBinary: false,
      },
      'src/App.vue': {
        content: appVue,
        isBinary: false,
      },
      'src/main.js': {
        content: mainJs,
        isBinary: false,
      },
    },
  });
}
