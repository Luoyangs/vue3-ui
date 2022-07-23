# 静态作用域与动态作用域

## 作用域
作用域是指程序源代码中定义变量的区域。

作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。

## 静态作用域与动态作用域
* 因为 JavaScript 采用的是词法作用域，函数的作用域在``函数定义``的时候就决定了。
* 而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。
```js
var value = 1;

function foo() {
  console.log(value);
}

function bar() {
  var value = 2;
  foo();
}

bar(); // 1
```
假设JavaScript采用静态作用域，让我们分析下执行过程：

执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

假设JavaScript采用动态作用域，让我们分析下执行过程：

执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。

前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是 1。


```js
var value = 1;

function bar() {
  var value = 2;

  function foo() {
    console.log(value);
  }
  foo();
}

bar(); // 2
```

最后，让我们看一个《JavaScript权威指南》中的例子：
```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope(); // local scope
```

```js
var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function f(){
    return scope;
  }
  return f;
}
checkscope()(); // local scope
```
虽然两段代码执行的结果一样，但是两段代码究竟有哪些不同呢？

答案就是执行上下文栈的变化不一样。

让我们模拟第一段代码：
```js
ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();
```

让我们模拟第二段代码：
```js
ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();
```

再看看下面这个简单的例子
```js
var scope = "global scope";
function f(){
  return scope;
}
function checkscope(){
  var scope = "local scope";
  
  return f;
}
checkscope()(); // global scope
```

```js
var scope = "global scope";
function f(){
  return scope;
}
function checkscope(){
  var scope = "local scope";
  
  return f();
}
checkscope(); // global scope
```