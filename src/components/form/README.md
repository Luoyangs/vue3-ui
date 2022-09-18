---
category: Components
type: 表单
title: form
subtitle: 表单
---

## API

**DatePicker props**
| Property | Description | Type | Accepted Values | Default |
|:--|:--|:--|:--|:--|
| modelValue | the value of date picker | Date, Object | if `type` is `week`,`daterange`, `monthrange` or `yearrange`, the value is an object that contains `endDate` and `startDate`, eg `{startDate: ..., endDate: ...}`, otherwise the value is a Date Object | - |
| type | the type of date picker | String | `year`/`month`/`week`/`date`/`datetime`/`yearrange`/`monthrange`/`daterange` | `date` |
