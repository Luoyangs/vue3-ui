const fs = require('fs');
const path = require('path');

const filePath = 'docs/views/references';
function readDir(filePath, results = []) {
  fs.readdir(filePath, (err, files) => {
    if (err) throw err;
    files.forEach(filename => {
      //获取当前文件的绝对路径
      const dir = path.join(filePath, filename);
      //根据文件路径获取文件信息，返回一个fs.Stats对象
      fs.stat(dir, (error, stats) => {
        if (error) throw error;
        if (stats.isFile() && dir.indexOf('.md') > -1) {
          results.push(dir);
        } else if (stats.isDirectory()) {
          readDir(dir, results);
        }
      });
    });
  });
}

let results = [];
readDir(filePath, results);
setTimeout(() => {
  const allFiles = results.map(item => {
    const relatives = item.slice(filePath.length + 1).split('/');
    const group = relatives.length === 2 ? relatives[0] : '';
    const content = fs.readFileSync(item, 'utf-8').match(/(# )(.*)/);
    const text = content ? content[2] : null;
    return {
      text,
      group,
      link: item.slice(4, item.length - 3),
    };
  }).filter(item => item.group);
  const routes = allFiles.map(({ text, group, link }) => `{
    path: '${link.slice(link.lastIndexOf('/') + 1)}',
    meta: {
      category: 'References',
      type: '${group.toUpperCase()}',
      subtitle: "${text}"
    },
    component: () => import('..${link}.md')
  }`);
  const TEMPLATE = `export default [
  ${routes.join(',\n\t')}
];`;
  fs.writeFile('docs/router/referenceRoutes.ts', TEMPLATE, err => {
    if (err) throw err;
    console.log('Doc routes update...');
  });
}, 1000);
