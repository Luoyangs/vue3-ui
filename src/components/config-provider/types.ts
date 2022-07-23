import type { Language } from '@locale';
import type { ExtractPropTypes, PropType } from 'vue';

export const configProviderProps = {
  locale: Object as PropType<Language>
};

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;
