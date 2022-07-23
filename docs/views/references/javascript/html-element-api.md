# 重学之JavaScript HTML Element 常用API解析

## offsetHeight, offsetWidth
HTMLElement.offsetHeight 是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。

HTMLElement.offsetWidth 是一个只读属性，返回一个元素的布局宽度。一个典型的（译者注：各浏览器的offsetWidth可能有所不同）offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值。

通常，元素的offsetHeight是一种元素CSS高度的衡量标准，包括元素的边框、内边距和元素的水平滚动条（如果存在且渲染的话），不包含:before或:after等伪类元素的高度。

对于文档的body对象，它包括代替元素的CSS高度线性总含量高。浮动元素的向下延伸内容高度是被忽略的。

> 这个属性值会被四舍五入为整数值，如果你需要一个浮点数值，请用 element.getBoundingClientRect()
```html
<style>
#myDIV {
  height: 250px;
  width: 400px;
  padding: 10px;
  margin: 15px;
  border: 5px solid red;
  background-color: lightblue;
  /* box-sizing: content-box; */
}
</style>

<div id="myDIV">
  <b>Information about this div:</b><br>
  Height: 250px<br>
  Width: 400px<br>
  padding: 10px<br>
  margin: 15px<br>
  border: 5px<br>
  <p id="demo"></p>
</div>
<button onclick="myFunction()">Try it</button>

<script>
function myFunction() {
  var elmnt = document.getElementById("myDIV");
  var txt = "Height including padding and border: " + elmnt.offsetHeight + "px<br>";
  txt += "Width including padding and border: " + elmnt.offsetWidth + "px<br>";
  
  var rect = elmnt.getBoundingClientRect();
  txt += 'Width from getBoundingClientRect():' + (rect.right - rect.left)  + 'px<br>';
  txt += 'Height from getBoundingClientRect():' + (rect.bottom - rect.top)  + 'px';
  
  
  document.getElementById("demo").innerHTML = txt;
}
</script>
```
> 但是，它会受到box-sizing属性的干扰，默认情况相当于box-sizing: content-box;

### 使用方法
```js
var intElemOffsetHeight = document.getElementById(id_attribute_value).offsetHeight;

var intElemOffsetWidth = document.getElementById(id_attribute_value).offsetWidth;
```


## offsetLeft, offsetTop
HTMLElement.offsetLeft 是一个只读属性，返回当前元素左上角相对于  HTMLElement.offsetParent 节点的左边界偏移的像素值。

对块级元素来说，offsetTop、offsetLeft、offsetWidth 及 offsetHeight 描述了元素相对于 offsetParent 的边界框。

然而，对于可被截断到下一行的行内元素（如 span），offsetTop 和 offsetLeft 描述的是第一个边界框的位置（使用 Element.getClientRects() 来获取其宽度和高度），而 offsetWidth 和 offsetHeight 描述的是边界框的尺寸（使用 Element.getBoundingClientRect 来获取其位置）。因此，使用 offsetLeft、offsetTop、offsetWidth、offsetHeight 来对应 left、top、width 和 height 的一个盒子将不会是文本容器 span 的盒子边界。
```html
<div style="width: 300px; border-color:blue;
  border-style:solid; border-width:1;">
  <span>Short span. </span>
  <span id="long">Long span that wraps withing this div.</span>
</div>

<div id="box" style="position: absolute; border-color: red;
  border-width: 1; border-style: solid; z-index: 10">
</div>

<script>
  var box = document.getElementById("box");
  var long = document.getElementById("long"); 
  // 
  // long.offsetLeft这个值就是span的offsetLeft.
  // span是个行内元素，它没有absolute定位，但还是默认offsetParent就是父元素，而不是根
  //

  box.style.left = long.offsetLeft + document.body.scrollLeft + "px";
  box.style.top = long.offsetTop + document.body.scrollTop + "px";
  box.style.width = long.offsetWidth + "px";
  box.style.height = long.offsetHeight + "px";
</script> 
```
![img](https://developer.mozilla.org/@api/deki/files/790/=OffsetLeft.jpg)


## offsetParent
HTMLElement.offsetParent 是一个只读属性，返回一个指向最近的（closest，指包含层级上的最近）包含该元素的定位元素。如果没有定位的元素，则 offsetParent 为最近的 table, table cell 或根元素（标准模式下为 html；quirks 模式下为 body）。当元素的 style.display 设置为 "none" 时，offsetParent 返回 null。offsetParent 很有用，因为 offsetTop 和 offsetLeft 都是相对于其内边距边界的。


## Element​
### scroll​Left
The Element.scrollLeft property gets or sets the number of pixels that an element's content is scrolled from its left edge.

If the element's direction is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position (at the start of the scrolled content), and then increasingly negative as you scroll towards the end of the content.
```js
// Get the number of pixels scrolled
var sLeft = element.scrollLeft;
```
sLeft is an integer representing the number of pixels that element has been scrolled from the left edge.
```js
// Set the number of pixels scrolled
element.scrollLeft = 10;
```
scrollLeft can be specified as any integer value. However:

* If the element can't be scrolled (e.g., it has no overflow), scrollLeft is set to 0.
* If specified as a value less than 0 (greater than 0 for right-to-left elements), scrollLeft is set to 0.
* If specified as a value greater than the maximum that the content can be scrolled, scrollLeft is set to the maximum.

### scrollTop
The Element.scrollTop property gets or sets the number of pixels that an element's content is scrolled vertically.

An element's scrollTop value is a measurement of the distance from the element's top to its topmost visible content. When an element's content does not generate a vertical scrollbar, then its scrollTop value is 0.
```js
// Get the number of pixels scrolled.
var intElemScrollTop = someElement.scrollTop;
```
After running this code, intElemScrollTop is an integer corresponding to the number of pixels that the element's content has been scrolled upwards.
```js
// Set the number of pixels scrolled.
element.scrollTop = intValue;
```
scrollTop can be set to any integer value, with certain caveats:

* If the element can't be scrolled (e.g. it has no overflow or if the element has a property of "non-scrollable"), scrollTop is 0.
* scrollTop doesn't respond to negative values; instead, it sets itself back to 0.
* If set to a value greater than the maximum available for the element, scrollTop settles itself to the maximum value.

### scroll​Width
The Element.scrollWidth read-only property is a measurement of the width of an element's content, including content not visible on the screen due to overflow.

The scrollWidth value is equal to the minimum width the element would require in order to fit all the content in the viewport without using a horizontal scrollbar. The width is measured in the same way as clientWidth: `it includes the element's padding, but not its border, margin or vertical scrollbar (if present).` It can also include the width of pseudo-elements such as ::before or ::after. If the element's content can fit without a need for horizontal scrollbar, its scrollWidth is equal to clientWidth

> This property will round the value to an integer. If you need a fractional value, use element.getBoundingClientRect().

### scrollHeight
The Element.scrollHeight read-only property is a measurement of the height of an element's content, including content not visible on the screen due to overflow.

The scrollHeight value is equal to the minimum height the element would require in order to fit all the content in the viewport without using a vertical scrollbar. The height is measured in the same way as clientHeight: `it includes the element's padding, but not its border, margin or horizontal scrollbar (if present). `It can also include the height of pseudo-elements such as ::before or ::after. If the element's content can fit without a need for vertical scrollbar, its scrollHeight is equal to clientHeight

> This property will round the value to an integer. If you need a fractional value, use Element.getBoundingClientRect().

判断是否滚动到底部
```js
// Determine if an element has been totally scrolled
element.scrollHeight - element.scrollTop === element.clientHeight

// When the container does not scroll, but has overflowing children, these checks determine if the container can scroll:
window.getComputedStyle(element).overflowY === 'visible'
window.getComputedStyle(element).overflowY !== 'hidden'
```

### clientLeft
The width of the left border of an element in pixels. It includes the width of the vertical scrollbar if the text direction of the element is right–to–left and if there is an overflow causing a left vertical scrollbar to be rendered. `clientLeft does not include the left margin or the left padding. clientLeft is read-only.`

Gecko-based applications support clientLeft starting with Gecko 1.9 (Firefox 3, implemented in bug 111207). This property is not supported in Firefox 2 and earlier.

### clientTop
The width of the top border of an element in pixels. It is a read-only, integer property of element.

As it happens, all that lies between the two locations (offsetTop and client area top) is the element's border. This is because the offsetTop indicates the location of the top of the border (not the margin) while the client area starts immediately below the border, (client area includes padding.) Therefore, the clientTop value will always equal the integer portion of the .getComputedStyle() value for "border-top-width". (Actually might be Math.round(parseFloat()).) For example, if the computed "border-top-width" is zero, then clientTop is also zero.

### clientWidth
The Element.clientWidth property is zero for inline elements and elements with no CSS; otherwise, it's the inner width of an element in pixels. `It includes padding but excludes borders, margins, and vertical scrollbars (if present).`

intElemClientWidth is an integer corresponding to the clientWidth of element in pixels. The clientWidth property is read–only.
![img](https://developer.mozilla.org/@api/deki/files/185/=Dimensions-client.png)

### clientHeight
The Element.clientHeight read-only property is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels. It includes padding but excludes borders, margins, and horizontal scrollbars (if present).

clientHeight can be calculated as: CSS height + CSS padding - height of horizontal scrollbar (if present).

> This property will round the value to an integer. If you need a fractional value, use element.getBoundingClientRect().