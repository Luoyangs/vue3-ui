import * as cheerio from 'cheerio';
import type { InternalOptions } from 'cheerio/lib/options';

const scriptRE = /<script[^>]*>([\s\S]*)<\/script>/;
const scriptContentRE = /(?<=<script[^>]*>)([\s\S]*)(?=<\/script>)/;
const styleRE = /<style[^>]*>([\s\S]*)<\/style>/;
const docsRE = /(?<=<docs>)([\s\S]*)(?=<\/docs>)/;
const reObj = {
  script: scriptRE,
  style: styleRE,
  docs: docsRE,
  scriptContent: scriptContentRE,
};

export default function parseCode(src: string, type: string): string {
  if (type === 'template') {
    const $ = cheerio.load(src, {
      decodeEntities: false,
      xmlMode: false,
      recognizeSelfClosing: true,
      _useHtmlParser2: true,
    } as InternalOptions);
    
    return `<template>
  ${$(type).html().trim()}
</template>`;
  }
  const matches = src.match(reObj[type]);
  return matches ? matches[0] : '';
}
