export { default as en } from './lang/en';
export { default as zhCn } from './lang/zh-cn';

export type TranslatePair = {
  [key: string]: string | TranslatePair;
};

export type Language = {
  name: string;
  ele: TranslatePair;
};
