import { computed, inject, provide } from 'vue';
import type { InjectionKey, Ref } from 'vue';

export interface PortalContextProps {
  shouldRender: Ref<boolean>;
  inTriggerContext: boolean;
}

const PortalContextKey: InjectionKey<PortalContextProps> = Symbol('PortalContextKey');

export const useProvidePortal = (instance: any = {}, config = { inTriggerContext: true }) => {
  provide(PortalContextKey, {
    inTriggerContext: config.inTriggerContext,
    shouldRender: computed(() => {
      const { popupVisible, popupRef, forceRender, autoDestroy } = instance;
      let shouldRender = false;

      if (popupVisible || popupRef || forceRender) {
        shouldRender = true;
      }

      if (!popupVisible && autoDestroy) {
        shouldRender = false;
      }

      return shouldRender;
    })
  });
};

export const useInjectPortal = () => {
  useProvidePortal({}, { inTriggerContext: false });
  const portalContext = inject(PortalContextKey, {
    shouldRender: computed(() => false),
    inTriggerContext: false
  });

  return {
    shouldRender: computed(() => portalContext.shouldRender.value || portalContext.inTriggerContext === false)
  };
};
