---
category: Components
type: 通用
title: button
subtitle: 按钮
---

## API

**Button props**

| Property    | Description                                        | Type    | Accepted Values                          | Default  |
| :---------- | :------------------------------------------------- | :------ | :--------------------------------------- | :------- |
| type        | 按钮类型                             | String  | `primary`, `secondary`, `link`, `danger` | -        |
| size        | 按钮尺寸                                 | String  | `x-large`/`large`/`normal`/`small`       | `normal` |
| outline     | 边框按钮            | Boolean | -                                        | `false`  |
| dashed      | 虚线按钮              | Boolean | -                                        | `false`  |
| full-width  | 全宽按钮          | Boolean | -                                        | `false`  |
| circle      | 圆形按钮              | Boolean | -                                        | `false`  |
| round      | 圆角按钮，圆角弧度`100px`              | Boolean | -                                        | `false`  |
| icon        | 按钮图片                  | `JSX.Element/VNode`  | -                                        | -        |
| suffix-icon | 按钮后缀图片               | `JSX.Element/VNode`  | -                                        | -        |
| loading     | 按钮是否处于加状态          | Boolean | -                                        | `false`  |
| href        | 是否渲染成 HTMLElement `a` 标签           | String  | -                                        | -        |
| target      | HTMLElement `a` 标签的属性 | String  | -                                        | -        |

**Button events**

| Event | Description               | Parameters   |
| :---- | :------------------------ | :----------- |
| click | 按钮点击事件 | Event Object |
