import { h } from 'vue';

export default (headers: string[], prefix = 'yoga-date-table__header') => {
  return h('div', { class: prefix }, [
    headers.map((text) =>
      h('div', { class: `${prefix}__cell`, key: text }, [h('div', { class: `${prefix}__cell-inner` }, [text])])
    )
  ]);
};
