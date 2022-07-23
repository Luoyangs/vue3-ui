import svgo from 'svgo';
import fs from 'fs/promises';
import { compileTemplate } from '@vue/compiler-sfc';
import type { OptimizedSvg, OptimizeOptions } from 'svgo';
import type { Plugin } from 'vite';

export default (options: OptimizeOptions = {
  multipass: true,
}): Plugin => {
  let viteConfig = {}
  const svgRegex = /\.svg(\?(raw|component))?$/
  return {
    name: 'svg-loader',
    enforce: 'pre',
    configResolved(config) {
      viteConfig = config;
    },
    async load(id) {
      if (!id.match(svgRegex)) {
        return;
      }

      const [path] = id.split('?');
      const svgCode = await fs.readFile(path, 'utf-8');
      const { code } = compileTemplate({
        id: JSON.stringify(path),
        source: (svgo.optimize(svgCode, options) as OptimizedSvg).data,
        filename: path,
        transformAssetUrls: false
      });
      return `${code}\nexport default { render: render }`;
    },
  };
}