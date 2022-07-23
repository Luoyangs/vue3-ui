import { markdownToVueRender, vueToMarkdownRender } from './utils/render';
import type { Plugin } from 'vite';

export default (): Plugin => {
  return {
    name: 'vueToMarkdown',
    async transform(code, id) {
      if (id.endsWith('.vue') && id.indexOf('/demo/') > -1 && id.indexOf('index.vue') === -1) {
        const res = vueToMarkdownRender(code, id);
        const html = markdownToVueRender(res.vueSource, id)
        return {
          code: html,
          map: null,
        };
      }
    },
  };
}