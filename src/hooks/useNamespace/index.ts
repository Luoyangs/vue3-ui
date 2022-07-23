interface UseNamespace {
  b: () => string;
  e: (element?: string) => string;
  m: (modifier?: string) => string;
  em: (element?: string, modifier?: string) => string;
}

function createBEM(namespace: string, element?: string, modifier?: string): string {
  let cls = namespace;

  if (element) {
    cls += `__${element}`;
  }

  if (modifier) {
    cls += `--${modifier}`;
  }

  return cls;
}

export const useNamespace = (block: string): UseNamespace => {
  const namespace = `.yoga-${block}`;
  const b = () => createBEM(namespace);
  const e = (element?: string) => createBEM(namespace, element);
  const m = (modifier?: string) => createBEM(namespace, '', modifier);
  const em = (element?: string, modifier?: string) => createBEM(namespace, element, modifier);

  return {
    b,
    e,
    m,
    em
  };
};
