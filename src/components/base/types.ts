import type { PropType } from 'vue';

export type UISize = 'large' | 'normal' | 'small';
export type Nullable<T> = T | null;
export type RefElement = Nullable<HTMLElement>;

export type PopperPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export const UI_SIZE_PROP = {
  type: String as PropType<UISize>,
  default: 'normal',
  validator: (value = 'normal') => ['large', 'normal', 'small'].indexOf(value) >= 0
};
