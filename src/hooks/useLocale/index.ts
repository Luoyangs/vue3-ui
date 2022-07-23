import { computed, unref } from 'vue';
import { en } from '@locale';
import { useGlobalConfig } from '@hooks/useGlobalConfig';
import type { Ref, ComputedRef } from 'vue';
import type { Language, TranslatePair } from '@locale';

export type TranslatorOption = Record<string, number | string>;
export type Translator = (path: string, option?: TranslatorOption) => string;
export type LocaleContext = {
  locale?: Ref<Language>;
  lang: Ref<string>;
  t: Translator;
};

const translate = (path: string, option: undefined | TranslatorOption, locale: Language) => {
  const value = get(locale, path) || '';
  console.log('value', value);

  return value.replace(/\{(\w+)\}/g, (_, key) => `${option?.[key] ?? `{${key}}`}`);
};

const buildLocaleContext = (locale: Ref<Language>): LocaleContext => {
  const lang = computed(() => unref(locale).name || 'en');

  return {
    lang,
    locale,
    t: (path, option) => translate(path, option, unref(locale))
  };
};

export const useLocale = () => {
  const locale = useGlobalConfig('locale') as ComputedRef<Language>;
  return buildLocaleContext(computed(() => locale.value || en));
};

/**
 * get(obj, 'el.datepicker.weeks.sun')
 * @param obj TranslatePair
 * @param path string
 * @returns string
 */
function get(obj: TranslatePair, path = ''): string {
  const paths = path.split('.');
  if (paths.length) {
    const current = paths[0];
    const r = obj[current];
    if (r && typeof r === 'object') {
      console.log('current', current);

      return get(r, paths.slice(1).join('.'));
    }
    return r as string;
  }

  return path;
}
