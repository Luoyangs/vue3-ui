---
category: Components
type: 反馈
title: tooltip
subtitle: 文字提示
---

## API

**Tooltip props**
继承Popper props，但有以下改动
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| modelValue | the visible of tooltip, will override trigger and turn on manual mode | Boolean | - | `undefined` |
| show-arrow | whether the popover is with arrow | Boolean | - | `false` |
| placement | the placement of popover | String | `top`/`top-start`/`top-end`/`right`/`right-start`/`right-end`/`bottom`/`bottom-start`/`bottom-end`/`left`/`left-start`/`left-end` | `top` |

**Popper props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| visible | the visible of popover, will override trigger and turn on manual mode | Boolean | - | `undefined` |
| disabled | whether disabled the popover, when disabled the popover will not be shown | Boolean | - | `false` |
| placement | the placement of popover | String | `top`/`top-start`/`top-end`/`right`/`right-start`/`right-end`/`bottom`/`bottom-start`/`bottom-end`/`left`/`left-start`/`left-end` | `top` |
| trigger | how to trigger the popover | String | `hover`/`click`/`focus` | `hover` |
| content | the content of popover | String | - | - |
| theme | the theme of popover | String | `dark`/`light` | `dark` |
| hide-hover-popper | whether to hide popper when hover it | Boolean | - | `false` |
| hide-on-click | whether to hide popper when click, only effective when the `trigger` is `click` | Boolean | - | `true` |
| show-arrow | whether the popover is with arrow | Boolean | - | `true` |
| popper-options | custom options of popper | Object | - | - |
| popper-class | custom class of popper | String | - | - |
| popper-style | custom style object of popper | Object | - | - |
| popper-style | custom style object of popper | Object | - | - |
| class | custom class of trigger | Object | - | - |
| style | custom style object of trigger | Object | - | - |
| append-to-body | whether append popper to body | Boolean | - | `true` |
| auto-close | auto close popper, 0 means do not use auto close | Number | - | `0` |
| transition | popper transition name | String | - | `yoga-fade-in-linear` |

**Events**
| Event | Description | Parameters |
|:--|:--|:--|
| update:modelValue | trigger when tooltip visible change | visible: boolean |

**Slots**
| Name | Description | Parameters |
|:--|:--|:--|
| default | tooltip trigger element | - |
| content | tooltip content, which will override content props | - |
