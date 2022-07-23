# JavaScript 中闭包的详解

## 闭包是什么
闭包是指那些能够访问自由变量的函数。

《JavaScript高级程序设计第三版》：闭包是指有权访问另一个函数作用域中的变量的函数，创建闭包的常见方式，就是在一个函数内部创建另一个函数。

《你不知道的JavaScript（上卷）》：当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。

```js
function foo() {
  var a = 2;
  function bar() {
    console.log( a ); // 2
  }
  bar();
}
foo();
```
按照第一种定义，这个就是闭包了，因为在一个函数foo内部创建另一个函数bar()。其实，我们仔细看下定义就会发现：在一个函数内部创建另一个函数是创建闭包的常见方式，并不是闭包的定义。确切的说，上述代码中bar() 对a 的引用的方法是词法作用域的查找规则，而这些规则只是闭包的一部分。

```js
var a = 2;
(function IIFE() {
  console.log( a );//2
})();
```
这个是闭包吗？按照前面的定义，并不是，因为IIFE这个函数并不是在它本身的词法作用域以外执行的，a 是通过普通的词法作用域查找而非闭包被发现的。
```js
function foo() {
  var a = 2;
  function bar() {
    console.log( a );
  }
  return bar;
}
var baz = foo();
baz(); // 2 
```
在上面例子中，bar()在自己定义的词法作用域以外的地方被执行，这就是闭包。

一般情况下，由于有垃圾回收机制，在foo() 执行后，foo() 的整个内部作用域都被销毁。而闭包的“神奇”之处在于可以阻止这件事情的发生。事实上，bar()在使用foo() 的内部作用域，所以这个内部作用域依然存在，拜bar() 所声明的位置所赐，它拥有涵盖foo() 内部作用域的闭包，使得该作用域能够一直存活，使得bar() 在之后任何时间进行引用。bar() 对foo()的作用域的引用，就叫作闭包。
```js
function foo() {
  var a = 2;
  function baz() {
    console.log( a ); // 2
  }
  bar( baz );
}
function bar(fn) {
  fn(); 
}

var fn;
function foo() {
  var a = 2;
  function baz() {
    console.log( a );
  }
  fn = baz; // 将baz 分配给全局变量
}
function bar() {
  fn(); // 这就是闭包！
}
foo();
bar(); // 2
```
上述两段代码的区别在于，函数值的传递方式不同，但其运行结果一样，而且都产生了闭包。因此，无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。

我们再来分析闭包中经典的for循环问题
```js
for(var i=0;i<5;i++){
  setTimeout(function timer(){
    console.log( i );
  },i*1000)
}
```
如果你认为这段代码的运行结果为分五次输出0，1，2，3，4，每次间隔为1秒，那就错了。正确的结果是，五次输出都为5，那么，这个5 是从哪里来的呢？我们发现这个循环的终止条件是i >=5。条件首次成立时i 的值是5。因此，输出显示的是循环结束时i 的最终值。

### 作用域链
```js
function compare(value1, value2){
  if (value1 < value2){
    return -1;
  } else if (value1 > value2){
    return 1;
  } else {
    return 0;
  }
}
var result = compare(5, 10);
```
以上代码先定义了compare()函数，然后又在全局作用域中调用了它。当调用compare()时，会创建一个包含arguments、value1 和value2 的活动对象。全局执行环境的变量对象（包含result和compare）在compare()执行环境的作用域链中则处于第二位。下图展示了包含上述关系的compare()函数执行时的作用域链。
![img](https://upload-images.jianshu.io/upload_images/4297212-c119522dfe5abe81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/907/format/webp)

作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。

无论什么时候在函数中访问一个变量时，就会从作用域链中搜索具有相应名字的变量。一般来讲，当函数执行完毕后，局部活动对象就会被销毁，内存中仅保存全局作用域（全局执行环境的变量对象）。但是，闭包的情况又有所不同。
```js
function createComparisonFunction(propertyName) {
  return function(object1, object2){
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value1 < value2){
      return -1;
    } else if (value1 > value2){
      return 1;
    } else {
      return 0;
    }
  };
}
```
在另一个函数内部定义的函数会将包含函数（即外部函数）的活动对象添加到它的作用域链中。因此，在createComparisonFunction()函数内部定义的匿名函数的作用域链中，实际上将会包含外部函数createComparisonFunction()的活动对象。这段代码的作用域链如下所示
![img](https://upload-images.jianshu.io/upload_images/4297212-f5ae2ab0046f6875.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/918/format/webp)

在匿名函数从createComparisonFunction()中被返回后，它的作用域链被初始化为包含createComparisonFunction()函数的活动对象和全局变量对象。这样，匿名函数就可以访问在createComparisonFunction()中定义的所有变量。更为重要的是，createComparisonFunction()函数在执行完毕后，其活动对象也不会被销毁，因为匿名函数的作用域链仍然在引用这个活动对象。换句话说，当createComparisonFunction()函数返回后，其执行环境的作用域链会被销毁，但它的活动对象仍然会留在内存中；直到匿名函数被销毁后，createComparisonFunction()的活动对象才会被销毁
```js
//创建函数
var compareNames = createComparisonFunction("name");
//调用函数
var result = compareNames({ name: "Nicholas" }, { name: "Greg" });
//解除对匿名函数的引用（以便释放内存）
compareNames = null;
```
首先，创建的比较函数被保存在变量compareNames 中。而通过将compareNames 设置为等于null解除该函数的引用，就等于通知垃圾回收例程将其清除。随着匿名函数的作用域链被销毁，其他作用域（除了全局作用域）也都可以安全地销毁了。

### 内存管理
在闭包中调用局部变量，会导致这个局部变量无法及时被销毁，相当于全局变量一样会一直占用着内存。如果需要回收这些变量占用的内存，可以手动将变量设置为null。

然而在使用闭包的过程中，比较容易形成 JavaScript 对象和 DOM 对象的循环引用，就有可能造成内存泄露。这是因为浏览器的垃圾回收机制中，如果两个对象之间形成了循环引用，那么它们都无法被回收。
```js
function func() {
  var test = document.getElementById('test');
  test.onclick = function () {
    console.log('hello world');
  }
}
```
在上面例子中，func 函数中用匿名函数创建了一个闭包。变量 test 是 JavaScript 对象，引用了 id 为 test 的 DOM 对象，DOM 对象的 onclick 属性又引用了闭包，而闭包又可以调用 test(``test.onclick函数中的this就是对象test``) ，因而形成了循环引用，导致两个对象都无法被回收。要解决这个问题，只需要把循环引用中的变量设为 null 即可。
```js
function func() {
  var test = document.getElementById('test');
  test.onclick = function () {
    console.log('hello world');
  }
  test = null;
}
```
如果在 func 函数中不使用匿名函数创建闭包，而是通过引用一个外部函数，也不会出现循环引用的问题。
```js
function func() {
  var test = document.getElementById('test');
  test.onclick = funcTest;
}
function funcTest(){
  console.log('hello world');
}
```

## 应用场景
### 函数防抖和节流
防抖和节流的作用都是防止函数多次调用。区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于wait，防抖的情况下只会调用一次，而节流的 情况会每隔一定时间（参数wait）调用函数。

### 设计单例模式
* 组件化思想，使用简单，扩展简单 
* 避免全局污染 
```js
class CreateUser {
  constructor(name) {
    this.name = name;
    this.getName();
  }
  getName() {
    return this.name;
  }
}
// 代理实现单例模式
var ProxyMode = (function() {
  var instance = null;
  return function(name) {
    if(!instance) {
      instance = new CreateUser(name);
    }
    return instance;
  }
})();
// 测试单体模式的实例
var a = ProxyMode("aaa");
var b = ProxyMode("bbb");
// 因为单体模式是只实例化一次，所以下面的实例是相等的
console.log(a === b);    //true
```

### 设置私有变量
```js
//赋值到闭包里
const Squery = (function () {
  const _width = Symbol();

  class Squery {
    constructor(s) {
      this[_width] = s
    }

    foo() {
      console.log(this[_width])
    }
  }
  return Squery
})();

const ss = new Squery(20);
ss.foo();
console.log(ss[_width])
```

### 为节点循环绑定click事件
```html
<p id="info">123</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p>

<script>
  function showContent(content){
    document.getElementById('info').innerHTML = content;
  };

  function setContent(){
    var infoArr = [
      {'id':'email','content':'your email address'},
      {'id':'name','content':'your name'},
      {'id':'age','content':'your age'}
    ];
    for (var i = 0; i < infoArr.length; i++) {
      var item = infoArr[i];
      //循环中创建了三个闭包，他们使用了相同的词法环境item，item.content是变化的变量
      //当onfocus执行时，item.content才确定，此时循环已经结束，三个闭包共享的item已经指向数组最后一项。
      document.getElementById(item.id).onfocus = function(){
        showContent(item.content)
      }
    }
  }
  setContent()

  /**
    * 解决方法1
    * 通过函数工厂，则函数为每一个回调都创建一个新的词法环境
    */
  function showContent(content){
    document.getElementById('info').innerHTML = content;
  };

  function callBack(content){
    return function(){
      showContent(content)
    }
  };

  function setContent(){
    var infoArr = [
      {'id':'email','content':'your email address'},
      {'id':'name','content':'your name'},
      {'id':'age','content':'your age'}
    ];
    for (var i = 0; i < infoArr.length; i++) {
      var item = infoArr[i];
      document.getElementById(item.id).onfocus = callBack(item.content)
    }
  }
  setContent()

  /**
    * 解决方法2
    * 绑定事件放在立即执行函数中
    */
  function showContent(content){
    document.getElementById('info').innerHTML = content;
  };

  function setContent(){
    var infoArr = [
      {'id':'email','content':'your email address'},
      {'id':'name','content':'your name'},
      {'id':'age','content':'your age'}
    ];
    for (var i = 0; i < infoArr.length; i++) {
      (function(){
        var item = infoArr[i];
        document.getElementById(item.id).onfocus = function(){
          showContent(item.content)
        }
      })()//放立即执行函数，立即绑定，用每次的值绑定到事件上，而不是循环结束的值
    }
  }
  setContent()

  /**
    * 解决方案3
    * 用ES6声明，避免声明提前，作用域只在当前块内
    */
  function showContent(content){
    document.getElementById('info').innerHTML = content;
  };

  function setContent(){
    var infoArr = [
      {'id':'email','content':'your email address'},
      {'id':'name','content':'your name'},
      {'id':'age','content':'your age'}
    ];
    for (var i = 0; i < infoArr.length; i++) {
      let item = infoArr[i];      //限制作用域只在当前块内
      document.getElementById(item.id).onfocus = function(){
        showContent(item.content)
      }
    }
  }
  setContent()

```

参考文献：
* [你不知道的JavaScript之闭包](https://www.jianshu.com/p/ef27006f917f)