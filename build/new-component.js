const { readdirSync, statSync, readFileSync } = require('fs');
const writeFile = require('write');
const { resolve, join } = require('path');
const camelCase = require('camelcase');
const { lowerHyphenate } = require('./util');
const templates = require('./template');

// 输入组件名称
const componentName = process.argv[2];
if (!componentName) {
  console.error('Please enter new component name');
  process.exit(1);
}

// 获取全部的组件列表
const componentPath = resolve(__dirname, '../src/components');
const files = readdirSync(componentPath);
const allComponents = files.filter(filename => {
  const stat = statSync(join(componentPath, filename));
  return stat.isDirectory();
});

// 判断是否已经存在
const lowerComponentName = lowerHyphenate(componentName); // number-input
const upperComponentName = camelCase(componentName, { pascalCase: true }); // NumberInput
const camelComponentName = camelCase(componentName); // numberInput
if (allComponents.indexOf(lowerComponentName) > -1) {
  console.error(`${componentName} has exist`);
  process.exit(1);
}

Object.values(templates).forEach(({ event, path, temp }) => {
  const realPath = path.replace(/{{component}}/g, lowerComponentName);
  let realTemp = temp
    .replace(/{{component}}/g, lowerComponentName)
    .replace(/{{COMPONENT}}/g, upperComponentName)
    .replace(/{{CAMEL_CASE_COMPONENT}}/g, camelComponentName);

  if (event === 'update') {
    const fileData = readFileSync(realPath, 'utf-8');
    realTemp = fileData.replace(/\/\/ {{COMPONENT}}/, realTemp + '\n// {{COMPONENT}}');
  }
  writeFile(realPath, realTemp, {encoding: 'utf-8'});
  console.log(realPath + ': file has been created!');
});
