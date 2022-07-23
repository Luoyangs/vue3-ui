---
category: Components
type: 表单
title: switch
subtitle: 开关
---

## API

**Switch props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| modelValue | the value of switch, bind with `v-model` | Boolean | - | - |
| disabled | whether the switch is disabled | Boolean | - | `false` |
| size | the size of switch | String | `large`/`normal`/`small` | `normal` |
| active-text | the text when switch on | String | - | -` |
| inactive-text | the text when switch off | String | - | - |

**Switch events**
| Event | Description | Parameters |
|:--|:--|:--|
| change | the change event of switch | current value |
| update:modelValue | the v-model bind event of switch | current value |
