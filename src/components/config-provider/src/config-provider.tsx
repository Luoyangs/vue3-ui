import { defineComponent, renderSlot } from 'vue';
import { provideGlobalConfig } from '@hooks/useGlobalConfig';
import { configProviderProps } from '@components/config-provider/types';
import type { SetupContext } from 'vue';
import type { ConfigProviderProps } from '@components/config-provider/types';

export default defineComponent({
  name: 'YConfigProvider',
  props: configProviderProps,
  setup(props: ConfigProviderProps, { slots }: SetupContext) {
    const config = provideGlobalConfig(props);
    return () => renderSlot(slots, 'default', { config: config?.value });
  }
});
