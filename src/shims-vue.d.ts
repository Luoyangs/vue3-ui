declare module '*.vue' {
  import { defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module '*.svg?component' {
  import { FunctionalComponent, SVGAttributes } from 'vue';
  const src: FunctionalComponent<SVGAttributes>;
  export default src;
}

declare module '*.md' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<any, any, any> & { readonly pageDate?: PageData };
  export default component;
}