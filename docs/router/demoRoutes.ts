export default [
  {
    path: 'button',
    meta: {"category":"Components","type":"通用","title":"button","subtitle":"按钮"},
    component: () => import('../../src/components/button/demo/index.vue'),
  },
  {
    path: 'checkbox',
    meta: {"category":"Components","type":"表单","title":"checkbox","subtitle":"复选框"},
    component: () => import('../../src/components/checkbox/demo/index.vue'),
  },
  {
    path: 'config-provider',
    meta: {"category":"Components","type":"通用","title":"config-provider","subtitle":"全局配置"},
    component: () => import('../../src/components/config-provider/demo/index.vue'),
  },
  {
    path: 'date-picker',
    meta: {"category":"Components","type":"表单","title":"date-picker","subtitle":"日期选择器"},
    component: () => import('../../src/components/date-picker/demo/index.vue'),
  },
  {
    path: 'form',
    meta: {"category":"Components","type":"表单","title":"form","subtitle":"表单"},
    component: () => import('../../src/components/form/demo/index.vue'),
  },
  {
    path: 'input',
    meta: {"category":"Components","type":"表单","title":"input","subtitle":"输入框"},
    component: () => import('../../src/components/input/demo/index.vue'),
  },
  {
    path: 'modal',
    meta: {"category":"Components","type":"反馈","title":"modal","subtitle":"对话框"},
    component: () => import('../../src/components/modal/demo/index.vue'),
  },
  {
    path: 'popper',
    meta: {"category":"Components","type":"反馈","title":"popper","subtitle":"定位引擎"},
    component: () => import('../../src/components/popper/demo/index.vue'),
  },
  {
    path: 'radio',
    meta: {"category":"Components","type":"表单","title":"radio","subtitle":"单选器"},
    component: () => import('../../src/components/radio/demo/index.vue'),
  },
  {
    path: 'scrollbar',
    meta: {"category":"Components","type":"通用","title":"scrollbar","subtitle":"滚动条"},
    component: () => import('../../src/components/scrollbar/demo/index.vue'),
  },
  {
    path: 'select',
    meta: {"category":"Components","type":"通用","title":"select","subtitle":"选择器"},
    component: () => import('../../src/components/select/demo/index.vue'),
  },
  {
    path: 'switch',
    meta: {"category":"Components","type":"表单","title":"switch","subtitle":"开关"},
    component: () => import('../../src/components/switch/demo/index.vue'),
  },
  {
    path: 'tag',
    meta: {"category":"Components","type":"表单","title":"tag","subtitle":"标签"},
    component: () => import('../../src/components/tag/demo/index.vue'),
  },
  {
    path: 'tooltip',
    meta: {"category":"Components","type":"反馈","title":"tooltip","subtitle":"文字提示"},
    component: () => import('../../src/components/tooltip/demo/index.vue'),
  }
];