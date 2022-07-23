import type { App } from 'vue';
import { version } from '../package.json';

export interface UiInstance {
  version: string;
  componentPrefix: string;
  install: (app: App) => void;
}

interface UiCreateOptions {
  components?: any[];
  componentPrefix?: string;
}

export default function create({ componentPrefix = '', components = [] }: UiCreateOptions = {}): UiInstance {
  const installTargets: App[] = [];

  function registerComponent(app: App, name: string, component: any): void {
    const registered = app.component(componentPrefix + name);
    if (!registered) {
      app.component(componentPrefix + name, component);
    }
  }

  function install(app: App): void {
    if (installTargets.includes(app)) {
      return;
    }

    installTargets.push(app);
    components.forEach((component) => {
      registerComponent(app, component.name, component);
    });
  }

  return {
    version,
    install,
    componentPrefix
  };
}
