import type { Placement, StrictModifiers } from '@popperjs/core';

interface ModifierProps {
  offset?: number;
  arrow?: HTMLElement;
  arrowOffset?: number;
  gpuAcceleration?: boolean;
  fallbackPlacements?: Array<Placement>;
}

export default function buildModifier(
  props: ModifierProps,
  externalModifiers: StrictModifiers[] = []
): StrictModifiers[] {
  const { offset, arrow, arrowOffset, gpuAcceleration, fallbackPlacements } = props;

  const modifiers: StrictModifiers[] = [
    {
      name: 'offset',
      options: {
        offset: [0, offset ?? 12]
      }
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          right: 5,
          bottom: 2,
          left: 5
        }
      }
    },
    {
      name: 'flip',
      options: {
        padding: 5,
        fallbackPlacements: fallbackPlacements ?? []
      }
    },
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration,
        adaptive: gpuAcceleration
      }
    }
  ];

  if (arrow) {
    modifiers.push({
      name: 'arrow',
      options: {
        element: arrow,
        padding: arrowOffset ?? 5
      }
    });
  }

  modifiers.push(...externalModifiers);
  return modifiers;
}
