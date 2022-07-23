---
category: Components
type: 表单
title: radio
subtitle: 单选器
---

## API

**Radio props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| modelValue | the value bind to v-model | String, Number, Boolean | - | - |
| value | the native value of radio; if absent it will use the inner text of radio instead | String, Number, Boolean | - | - |
| name | the native name of radio | String | - | - |
| disabled | whether the radio is disabled | Boolean | - | `false` |

**Radio events**
| Event | Description | Parameters |
|:--|:--|:--|
| change | trigger when the value change | the value |

**RadioGroup props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| modelValue | the value bind to v-model | String, Number, Boolean | - | - |
| vertical | the layout of radio group | Boolean | true/false | false |
| size | the size of radio button | String | `large`/`normal`/`small` | `normal` |
| type | the type of radio button | String | `solid`/`outline` | - |
| disabled | whether the radio group is disabled | Boolean | - | `false` |

**RadioGroup events**
| Event | Description | Parameters |
|:--|:--|:--|
| change | trigger when the value change | the value |
