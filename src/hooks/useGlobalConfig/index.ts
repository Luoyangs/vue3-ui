import { computed, getCurrentInstance, provide, inject, ref } from 'vue';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { configProviderProps } from '@components/config-provider/types';
import type { InjectionKey, ExtractPropTypes, Ref, App } from 'vue';

type ConfigProviderContext = Partial<ExtractPropTypes<typeof configProviderProps>>;

const configProviderContextKey: InjectionKey<Ref<ConfigProviderContext>> = Symbol();
const globalConfig = ref<ConfigProviderContext>();

export function useGlobalConfig(key?: keyof ConfigProviderContext, defalutValue = undefined) {
  const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;

  if (key) {
    return computed(() => config.value?.[key] ?? defalutValue);
  }

  return config;
}

export function provideGlobalConfig(config: ConfigProviderContext, app?: App, global = false) {
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : undefined;
  const provideFn = app?.provide ?? (inSetup ? provide : undefined);
  if (!provideFn) {
    console.error('provideGlobalConfig can only be used inside setup()');
    return;
  }

  const context = computed(() => {
    if (!oldConfig?.value) {
      return config;
    }

    return mergeConfig(oldConfig.value as ConfigProviderContext, config);
  });

  provideFn(configProviderContextKey, context);
  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  return context;
}

function mergeConfig(a: ConfigProviderContext, b: ConfigProviderContext): ConfigProviderContext {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
  const obj = {};
  for (const key of keys) {
    obj[key] = b[key] ?? a[key];
  }
  return obj;
}
