---
category: Components
type: 表单
title: checkbox
subtitle: 复选框
---

## API

**Checkbox props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| modelValue | the v-model bind value of checkbox | String, Number, Boolean | - | null |
| value | the native value of checkbox; only works on checkbox group | String, Number, Boolean | - | - |
| name | the native name of checkbox | String | - | - |
| disabled | whether the checkbox is disabled | Boolean | - | `false` |
| indeterminate | same as indeterminate in native checkbox | Boolean | - | `false` |

**Checkbox events**
| Event | Description | Parameters |
|:--|:--|:--|
| change | trigger when the value change | the value |
| update:modelValue | trigger when the value change | the value |

**CheckboxGroup props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| modelValue | the v-model bind value of checkbox group| Array | - | [] |
| vertical | whether use vertical layout of checkbox group | Boolean | `true`/`false` | `false` |
| type | the type of checkbox | String | `outline`/ `solid` | `default` |
| size | the size of checkbox button | String | `large`/`normal`/`small` | `normal` |
| disabled | whether the checkbox group is disabled | Boolean | - | `false` |
| fixed-width | fix checkbox item label width | Number | - | - |

**CheckboxGroup events**
| Event | Description | Parameters |
|:--|:--|:--|
| change | trigger when the value change | the value |
| update:modelValue | trigger when the value change | the value |
