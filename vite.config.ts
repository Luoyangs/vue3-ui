import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import demo from './build/plugin/demo';
import md from './build/plugin/md';
import svg from './build/plugin/svg';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@theme',
        replacement: path.resolve(__dirname, 'src/theme'),
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
      {
        find: '@locale',
        replacement: path.resolve(__dirname, 'src/locale'),
      },
      {
        find: '@directives',
        replacement: path.resolve(__dirname, 'src/directives'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: 'vue3-ui',
        replacement: path.resolve(__dirname, 'src/index.ts'),
      },
    ]
  },
  css: {
		//css预处理
		preprocessorOptions: {
			scss: {
        additionalData: `@use "sass:math";@use "sass:map";@import "src/theme/var.scss";`
      }
    }
  },
  plugins: [
    vueJsx({
      mergeProps: false,
      enableObjectSlots: false,
    }),
    demo(),
    md(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    svg()
  ]
})
