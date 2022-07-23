---
category: Components
type: 表单
title: date-picker
subtitle: 日期选择器
---

## API

**DatePicker props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| modelValue | the value of date picker | Date, Object | if `type` is `week`,`daterange`, `monthrange` or `yearrange`, the value is an object that contains `endDate` and `startDate`, eg `{startDate: ..., endDate: ...}`, otherwise the value is a Date Object | - |
| type | the type of date picker | String | `year`/`month`/`week`/`date`/`datetime`/`yearrange`/`monthrange`/`daterange` | `date` |
| size | the size of date picker input | String | `large`/`normal`/`small` | `normal` |
| placeholder | native placeholder of input | String | - | - |
| disabled | whether date picker is disabled | Boolean | - | `false` |
| clearable | whether the picker in clearable | Boolean | - | `true` |
| format | format of the picker, support with [`dayjs`](https://dayjs.fenxianglu.cn/) | String, Function | year `yyyy` month `MM` day `dd`, hour `HH`, minute `mm`, second `ss` | `DD/MM/YYYY` |
| min | the minimum of date that can be selected | Date, Function | Function only effective when `type` contains `range` | - |
| max | the maximum of date that can be selected | Date, Function | Function only effective when `type` contains `range` | - |
| fixed | whether any or which end of `value` if fixed, only effective when `type` contains `range` | Boolean, String | `false`/`start`/`end` | `false` |
| disabled-date | the function that return a Boolean value to disable the date or not | Function | - | - |
| range-separator | range separator, only effective when `type` contains `range` | String | - | `–` |
| show-overflow-date | whether show the date out of current calendar | Boolean | - | `false` |
| start-of-week | the start of week, 0 stands for Sunday and 6 stands for Saturday | Number | `0` |
| popper-class | custom class of popper | String | - | - |
| popper-flippable | whether popper is flippable | Boolean | - | `true` |
| append-to-body | whether append picker popper to body | Boolean | - | `true` |
| placement | the placement of popper | String | `top`/`top-start`/`top-end`/`bottom`/`bottom-start`/`bottom-end`/`left`/`left-start`/`left-end`/`right`/`right-start`/`right-end` | `bottom-start` |


`RangeDate`:
```json
{
  startDate: Date;
  endDate: Date;
}
```

**DatePicker events**
| Property | Description | Parameters |
|:--|:--|:--|
| change | triggers when input value changed | 	formatted value |

**DatePicker slots**
| Property | Description | Parameters |
|:--|:--|:--|
| date-cell | customized date cell | `dateCell` |

`dateCell` is the setup of date cell info
```json
{
  type: 'normal' | 'current' | 'last-month' | 'next-month';
  date: Date;
  text: string;       // date text of the day
  selected: boolean;
  isStart: boolean;
  isEnd: boolean;
  disabled: boolean;
  inRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
}
```

**DatePickerPanel props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| value | value of picker | Date | - | - |
| type | the type of date picker | String | `year`/`month`/`week`/`date`/`datetime` | `date` |
| min | the minimum of date that can be selected | Date | - | - |
| max | the maximum of date that can be selected | Date | - | - |
| disabled-date | the function that return a Boolean value to disable the date or not | Function | - | - |
| show-overflow-date | whether show the date out of current calendar | Boolean | - | `false` |
| start-of-week | the start of week, 0 stands for Sunday and 6 stands for Saturday | Number | - | `0` |

**DatePickerPanel events**
| Property | Description | Parameters |
|:--|:--|:--|
| change | triggers when picker value changes | selected date/range |

**DaterangePickerPanel props**
all of props of DatePickerPanel and following
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| value | value of picker | Object | `{startDate: Date, endDate: Date}` | - |
| type | the type of date picker | String | `yearrange`/`monthrange`/`daterange` | `daterange` |
| min | the minimum of date that can be selected | Date, Function | `Date | (selectingRange, section) => Date` | - |
| max | the maximum of date that can be selected | Date, Function | `Date | (selectingRange, section) => Date` | - |
| fixed | whether any or which end of `value` if fixed | Boolean, String | `false`/`start`/`end` | `false` |
| range-separator | range separator, only effective when `type` contains `range` | String | - | `-` |

**DaterangePickerPanel events**
all of events of DatePickerPanel and following
| Property | Description | Parameters |
|:--|:--|:--|
| range-input | triggers when picker first or last changes | selected range |

