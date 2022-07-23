import matter from 'gray-matter';
import { markdownToVueRender } from './utils/render';
import type { Plugin } from 'vite';

export default (): Plugin => {
  return {
    name: 'markdownToVue',
    async transform(code, id) {
      if (id.endsWith('.md')) {
        const html = markdownToVueRender(code, id)
        return {
          code: html,
          map: null,
        };
      }
    },
  };
}