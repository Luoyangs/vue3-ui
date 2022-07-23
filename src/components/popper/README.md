---
category: Components
type: 反馈
title: popper
subtitle: 定位引擎
---

## API

**Popper props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| visible | the visible of popover, will override trigger and turn on manual mode | Boolean | - | `undefined` |
| disabled | whether disabled the popover, when disabled the popover will not be shown | Boolean | - | `false` |
| placement | the placement of popover | String | `top`/`top-start`/`top-end`/`right`/`right-start`/`right-end`/`bottom`/`bottom-start`/`bottom-end`/`left`/`left-start`/`left-end` | `bottom` |
| trigger | how to trigger the popover | String | `hover`/`click`/`focus` | `hover` |
| content | the content of popover | String | - | - |
| theme | the theme of popover | String | `dark`/`light` | `light` |
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
| after-enter | trigger after mouse enter popover | - |
| after-leave | trigger after mouse leave popover | - |
| before-enter | trigger before mouse enter popover | - |
| before-leave | trigger before mouse leave popover | - |

**Slots**
| Name | Description | Parameters |
|:--|:--|:--|
| default | popper display element | - |
| trigger | popper trigger element | - |
