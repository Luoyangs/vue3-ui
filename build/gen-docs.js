/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const glob = require('glob');
const matter = require('gray-matter');

glob('src/components/*/README.md', (error, paths) => {
  const components = {};
  console.log('paths', paths);
  paths.forEach(path => {
  const content = fs.readFileSync(path).toString();
  const componentName = path.split('/')[2];

  if (componentName !== 'color-picker') {
    const { data } = matter(content);
    console.log('data', data);
    components[componentName] = { ...components[componentName], ...data };
  }

  console.log('components', components);
  const TEMPLATE = `export default [${Object.keys(components).map(component => `
  {
    path: '${component}',
    meta: ${JSON.stringify(components[component])},
    component: () => import('../../src/components/${component}/demo/index.vue'),
  }`,
)}
];`;
    
    fs.writeFileSync('docs/router/demoRoutes.ts', TEMPLATE);
  });
});
