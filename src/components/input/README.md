---
category: Components
type: 表单
title: input
subtitle: 输入框
---

## API

**Input props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| type | the type of input | String | native type and `textarea` / `numeric` | `text` |
| modelValue | the value of input | String | - | - |
| placeholder| the placeholder of input | String | - | - |
| name | the native name of input | String | - | - |
| readonly | the native readonly | Boolean | - | - |
| autofocus | the native autofocus | Boolean | - | - |
| autocomplete | the native autocomplete | Boolean | - | - |
| form | the native form | Boolean | - | - |
| minlength | the native min length | Number | - | - |
| maxlength | the native max length | Number | - | - |
| size | the size of input | String | `large`/`normal`/`small` | `normal` |
| suffix-label | the suffix label of input | String | - | - |
| prefix-label | the prefix label of input | String | - | - |
| prefix-icon | the prefix icon, accepts svg | String | - | - |
| suffix-icon | the suffix icon, accepts svg | String | - | - |
| disabled | whether the input is disabled | Boolean | - | `false` |
| clearable | whether the input in clearable | Boolean | - | `false` |
| restriction | the restriction of input. Only effective at inputEvent | String, Function, RegExp | `number` | - |
| restriction-type | the restriction type of input, when the type is `input`, it will only restrict the current input, when the type is `value`, it will restrict the whole value | String | `value`, `input` | `input` |
| error | whether the value of input is invalid | Boolean | - | `false` |
| error-message | the error message of input | String | - | - |
| rows | the native rows of textarea | Number | - | - |
| minrows | the min rows of textarea | Number | - | - |
| maxrows | the max rows of textarea | Number | - | - |
| autosize | whether the textarea will auto adjust its size | Boolean | - | `false` |
| lazy | the same as `v-model.lazy` | Boolean | - | `false` |
| help-text | the help message of input | String | - | - |
| show-word-limit | whether show word limit | Boolean | - | `false` |
| max | the max value of number input, only works for type=numeric | Number | - | - |
| min | the min value of number input, only works for type=numeric  | Number | - | - |
| precision | precision of input value, only works for type=numeric  | Number | - | - |
| is-round | wether use Number.toFixed or direct intercept, only works for type=numeric  | Boolean | - | true(means direct intercept) |
| unicode-normalized| whether to calculate the string by utf-16, instead of the default utf-8 | Boolean | - | `false` |

**Input slot**
All input slots and following
| Slot | Description  |
|:--|:--|
| prefix | the prefix label of input |
| suffix | the suffix label of input |
| error | the error message of input |
| help | the help message of input |

**Input events**
All native input events and following
| Event | Description | Parameters |
|:--|:--|:--|
| value-change | the change event of input value | the value |


**InputGroup props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| prepend-width | the width of prepend | Number | - | 120 |

**InputGroup slot**
All input slots and following
| Slot | Description  |
|:--|:--|
| prepend | the prepend of group |
| append | the append of group |
