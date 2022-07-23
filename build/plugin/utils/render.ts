import path from 'path';
import slash from 'slash';
import matter from 'gray-matter';
import { createMarkdownRenderer } from '../markdown/markdown';
import parseCode from './parseCode';

export function vueToMarkdownRender(code: string, path: string) {
  const docs = parseCode(code, 'docs')?.trim();
  const template = parseCode(code, 'template');
  const script = parseCode(code, 'script');
  const style = parseCode(code, 'style');
  const newContent = `${docs}
\`\`\`vue
${template}
${script}
${style}
\`\`\`
`;
  // console.log('docs', docs);
  const result = {
    vueSource: newContent?.trim(),
    ignore: !docs,
  };
  // cache.set(src, result);
  return result;
}

export function markdownToVueRender(source: string, file: string) {
  const md = createMarkdownRenderer();
  const { content, data: frontmatter } = matter(source);
  const title = frontmatter.title;
  const { html, data } = md.render(content);

  const vueCode = data.vueCode;
  if (vueCode) {
    let template = parseCode(vueCode, 'template');
    const script = parseCode(vueCode, 'script');
    const style = parseCode(vueCode, 'style');
    const metas = html.split('<pre class="language-vue" v-pre>');
    let docHtml;
    let pureCode;
    docHtml = pureCode = metas[0];
    if (metas.length === 2) {
      docHtml = metas[0];
      pureCode = '<pre class="language-vue" v-pre>' + metas[1];
    }
    if (title) {
      const relativePath = slash(path.relative(process.cwd(), file));
      const sectionId = relativePath.split('/').join('-').replace('.vue', '');
      template = template.slice(0, template.lastIndexOf('</template>')) + `
        <div class="code-box-meta">
          <div class="code-box-title">
            <a href="#${sectionId}">${title}</a>
          </div>
          <div class="code-box-description">${docHtml}</div>
        </div>
      </template>`;
    }
    
    return `
<template>
  <demo-box>
    ${template.replace('<template>', '<template v-slot:default>')}
    <template #htmlCode>${pureCode}</template>
  </demo-box>
</template>
${script}
${style}
`;
  }

  return `
<template>
  <article class="markdown">${html}</article>
</template>
<script>
export default { pageData: ${JSON.stringify(data)} }
</script>
`;
}