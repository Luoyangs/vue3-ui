# 模拟实现Promise

## Promise/A+ 规范
Promise 规范有很多，如 Promise/A，Promise/B，Promise/D 以及 Promise/A 的升级版 Promise/A+，有兴趣的可以去了解下，最终 ES6 中采用了 Promise/A+ 规范。在讲解 Promise 实现之前，当然要先了解 Promise/A+ 规范。Promise/A+ 规范参考：

* 英文版：https://promisesaplus.com/
* 中文版：http://malcolmyu.github.io/malnote/2015/06/12/Promises-A-Plus/

规范虽然不长，但细节也比较多，我挑出几个要点简单说明下：

* Promise 本质是一个状态机。每个 promise 只能是 3 种状态中的一种：pending、fulfilled 或 rejected。状态转变只能是 pending -> fulfilled 或者 pending -> rejected。状态转变不可逆。
* then 方法可以被同一个 promise 调用多次。
* then 方法必须返回一个 promise。规范里没有明确说明返回一个新的 promise 还是复用老的 promise（即 return this），大多数实现都是返回一个新的 promise，而且复用老的 promise 可能改变内部状态，这与规范也是相违背的。
* 值穿透。

## Promise API
```js
// Promise 是一个构造函数，需要用 new 调用
function Promise(resolver) {}
 
Promise.prototype.then = function() {}
Promise.prototype.catch = function() {}
 
Promise.resolve = function() {}
Promise.reject = function() {}
Promise.all = function() {}
Promise.race = function() {}
```

## Promise 实现基本原理
```js
var Promise = require('appoint')
var promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('haha')
  }, 1000)
})
var a = promise.then(function onSuccess() {})
var b = promise.catch(function onError() {})
console.log(require('util').inspect(promise, { depth: 10 }))
console.log(promise.queue[0].promise === a)
console.log(promise.queue[1].promise === b)

Promise {
  state: 0,
  value: undefined,
  queue:
   [ QueueItem {
       promise: Promise { state: 0, value: undefined, queue: [] },
       callFulfilled: [Function],
       callRejected: [Function] },
     QueueItem {
       promise: Promise { state: 0, value: undefined, queue: [] },
       callFulfilled: [Function],
       callRejected: [Function] } ] }
true
true
```
可以看出，queue 数组中有两个对象。因为规范中规定：then 方法可以被同一个 promise 调用多次。上例中在调用 .then 和 .catch 时 promise 并没有被 resolve，所以将 .then 和 .catch 生成的新 promise（a 和 b） 和正确时的回调（onSuccess 包装成 callFulfilled）和错误时的回调（onError 包装成 callRejected）生成一个 QueueItem 实例并 push 到 queue 数组里，所以上面两个 console.log 打印 true。当 promise 状态改变时遍历内部 queue 数组，统一执行成功（FULFILLED -> callFulfilled）或失败（REJECTED -> callRejected）的回调（传入 promise 的 value 值），生成的结果分别设置 a 和 b 的 state 和 value，这就是 Promise 实现的基本原理。
```js
var Promise = require('appoint')
var promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('haha')
  }, 1000)
})
promise
  .then(() => {})
  .then(() => {})
  .then(() => {})
console.log(require('util').inspect(promise, { depth: 10 }))

Promise {
  state: 0,
  value: undefined,
  queue:
   [ QueueItem {
       promise:
        Promise {
          state: 0,
          value: undefined,
          queue:
           [ QueueItem {
               promise:
                Promise {
                  state: 0,
                  value: undefined,
                  queue:
                   [ QueueItem {
                       promise: Promise { state: 0, value: undefined, queue: [] },
                       callFulfilled: [Function],
                       callRejected: [Function] } ] },
               callFulfilled: [Function],
               callRejected: [Function] } ] },
       callFulfilled: [Function],
       callRejected: [Function] } ] }
```
调用了 3 次 then，每个 then 将它生成的 promise 放到了调用它的 promise 队列里，形成了 3 层调用关系。当最外层的 promise 状态改变时，遍历它的 queue 数组调用对应的回调，设置子 promise 的 state 和 value 并遍历它的 queue 数组调用对应的回调，然后设置孙 promise 的 state 和 value 并遍历它的 queue 数组调用对应的回调......依次类推。

### safelyResolveThen
```js
function safelyResolveThen(self, then) {
  var called = false;
  try {
    then(function (value) {
      if (called) {
        return;
      }
      called = true;
      doResolve(self, value);
    }, function (error) {
      if (called) {
        return;
      }
      called = true;
      doReject(self, error);
    });
  } catch (error) {
    if (called) {
      return;
    }
    called = true;
    doReject(self, error);
  }
}
```
safelyResolveThen 顾名思义用来『安全的执行 then 函数』，这里的 then 函数指『第一个参数是 resolve 函数第二个参数是 reject 函数的函数』，如下两种情况：
* 构造函数的参数，即这里的 resolver：
* promise 的 then

safelyResolveThen 有 3 个作用：
* try...catch 捕获抛出的异常，如：
```js
new Promise(function resolver(resolve, reject) {
  throw new Error('Oops')
})
```
* called 控制 resolve 或 reject 只执行一次，多次调用没有任何作用。
```js
var Promise = require('appoint')
var promise = new Promise(function resolver(resolve, reject) {
  setTimeout(() => {
    resolve('haha')
  }, 1000)
  reject('error')
})
promise.then(console.log)
promise.catch(console.error)
```
打印 error，不会再打印 haha。
* 没有错误则执行 doResolve，有错误则执行 doReject。

### doResolve 和 doReject
```js
function doResolve(self, value) {
  try {
    var then = getThen(value);
    if (then) {
      safelyResolveThen(self, then);
    } else {
      self.state = FULFILLED;
      self.value = value;
      self.queue.forEach(function (queueItem) {
        queueItem.callFulfilled(value);
      });
    }
    return self;
  } catch (error) {
    return doReject(self, error);
  }
}
 
function doReject(self, error) {
  self.state = REJECTED;
  self.value = error;
  self.queue.forEach(function (queueItem) {
    queueItem.callRejected(error);
  });
  return self;
}
```
doReject 就是设置 promise 的 state 为 REJECTED，value 为 error，callRejected 如前面提到的通知子 promise：『我这里出了点问题呀』然后子 promise 根据传入的错误设置自己的状态和值。``doResolve 结合 safelyResolveThen 使用不断地解包 promise，直至返回值是非 promise 对象``后，设置 promise 的状态和值，然后通知子 promise：『我这里有值了哟』然后子 promise 根据传入的值设置自己的状态和值。

这里有个辅助函数 getThen：
```js
function getThen(obj) {
  var then = obj && obj.then;
  if (obj && (isObject(obj) || isFunction(obj)) && isFunction(then)) {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}
```
规范中规定：如果 then 是函数，将 x（这里是 obj） 作为函数的 this 调用。

### Promise.prototype.then 和 Promise.prototype.catch
```js

Promise.prototype.then = function (onFulfilled, onRejected) {
  if (!isFunction(onFulfilled) && this.state === FULFILLED ||
    !isFunction(onRejected) && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.value);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }
  return promise;
};
 
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
```
上述代码中的 return this 实现了值穿透，后面会讲。可以看出，then 方法中生成了一个新的 promise 然后返回，符合规范要求。如果 promise 的状态改变了，则调用 unwrap，否则将生成的 promise 加入到当前 promise 的回调队列 queue 里，之前讲解了如何消费 queue。有 3 点需要讲解：
* Promise 构造函数传入了一个 INTERNAL 即空函数，因为这个新产生的 promise 可以认为是内部的 promise，需要根据外部的 promise 的状态和值产生自身的状态和值，不需要传入回调函数，而外部 Promise 需要传入回调函数决定它的状态和值。所以之前 Promise 的构造函数里做了判断区分外部调用还是内部调用
* unwrap 代码如下
```js
// 用来解包（即执行函数）的
// 第一个参数是子 promise
// 第二个参数是父 promise 的 then 的回调（onFulfilled/onRejected）
// 第三个参数是父 promise 的值（正常值/错误）
// 使用 setTimeout 将同步代码变异步
function unwrap(promise, callback, value) {
  setTimeout(function() {
    let res;

    try {
      res = callback(value);
    } catch (error) {
      doReject(promise, error);
    }

    if (promise === res) {
      doReject(promise, new TypeError('Cannot resolve promise with itself'));
    }

    return doResolve(promise, res);
  }, 0);
}
```
使用 immediate 将同步代码变异步
```js
var Promise = require('appoint')
var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('haha')
  }, 1000)
})
promise.then(() => {
  promise.then(() => {
    console.log('1')
  })
  console.log('2')
})
```
打印 2 1，去掉 immediate 则打印 1 2。

try...catch 用来捕获 then/catch 内抛出的异常，并调用 doReject
```js
promise.then(() => {
  throw new Error('haha')
})
promise.catch(() => {
  throw new Error('haha')
})
```

返回的值不能是 promise 本身，否则会造成死循环，如 node@4.6.0 下运行
```js
var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('haha')
  }, 1000)
})
var a = promise.then(() => {
  return a
})

a.catch(console.log)// [TypeError: Chaining cycle detected for promise #<Promise>]
```

### QueueItem
```js
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  this.callFulfilled = function (value) {
    doResolve(this.promise, value);
  };
  this.callRejected = function (error) {
    doReject(this.promise, error);
  };
  if (isFunction(onFulfilled)) {
    this.callFulfilled = function (value) {
      unwrap(this.promise, onFulfilled, value);
    };
  }
  if (isFunction(onRejected)) {
    this.callRejected = function (error) {
      unwrap(this.promise, onRejected, error);
    };
  }
}
```
promise 为 then 生成的新 promise（以下称为『子promise』），onFulfilled 和 onRejected 即是 then 参数中的 onFulfilled 和 onRejected。从上面代码可以看出：比如当 promise 状态变为 FULFILLED 时，之前注册的 then 函数，用 callFulfilled 调用 unwrap 进行解包最终得出子 promise 的状态和值，之前注册的 catch 函数，用 callFulfilled 直接调用 doResolve，设置队列里子 promise 的状态和值。当 promise 状态变为 REJECTED 类似。

> promise.catch(onRejected) 就是 promise.then(null, onRejected) 的语法糖。

### 值穿透
```js
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (!isFunction(onFulfilled) && this.state === FULFILLED ||
    !isFunction(onRejected) && this.state === REJECTED) {
    return this;
  }
  ...
}
```
例如
```js
var Promise = require('appoint')
var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('haha')
  }, 1000)
})
promise
  .then('hehe')
  .then(console.log)
```
最终打印 haha 而不是 hehe。

其实值穿透有两种情况：
* promise 已经是 FULFILLED/REJECTED 时，通过 return this 实现的值穿透
```js
var Promise = require('appoint')
var promise = new Promise(function (resolve) {
  setTimeout(() => {
    resolve('haha')
  }, 1000)
})
promise.then(() => {
  promise.then().then((res) => {// ①
    console.log(res)// haha
  })
  promise.catch().then((res) => {// ②
    console.log(res)// haha
  })
  console.log(promise.then() === promise.catch())// true
  console.log(promise.then(1) === promise.catch({ name: 'nswbmw' }))// true
})
```
上述代码①②处 promise 已经是 FULFILLED 了符合条件所以执行了 return this。注意：原生的 Promise 实现里并不是这样实现的，所以会打印两个 false。

* promise 是 PENDING 时，通过生成新的 promise 加入到父 promise 的 queue，父 promise 有值时调用 callFulfilled->doResolve 或 callRejected->doReject（因为 then/catch 传入的参数不是函数）设置子 promise 的状态和值为父 promise 的状态和值。
```js

var Promise = require('appoint')
var promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('haha')
  }, 1000)
})
var a = promise.then()
a.then((res) => {
  console.log(res)// haha
})
var b = promise.catch()
b.then((res) => {
  console.log(res)// haha
})
console.log(a === b)// false
```

### Promise.resolve 和 Promise.reject
```js
Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return doResolve(new this(INTERNAL), value);
}
 
Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return doReject(promise, reason);
}
```
当 Promise.resolve 参数是一个 promise 时，直接返回该值。


### Promise.all
```js
// Promise.all 用来并行执行多个 promise/值,当所有 promise/值执行完毕后或有一个发生错误时返回
//  Promise.all 内部生成了一个新的 promise 返回。
//  called 用来控制即使有多个 promise reject 也只有第一个生效。
//  values 用来存储结果。
//  当最后一个 promise 得出结果后，使用 doResolve(promise, values) 设置 promise 的 state 为 FULFILLED，value 为结果数组 values。
PromiseFn.all = all;
function all(promises) {
  if (!isArray(promises)) {
    throw new TypeError('parameter must be a array');
  }

  const len = promise.length;
  if (!len) {
    return this.resolve([]);
  }

  let called = false;
  let resolved = 0;
  let i = -1;
  const self = this;
  const values = new Array[len];
  const promise = new this(noop);

  while (++i < len) {
    doAllResolver(promises[i], i);
  }

  return promise;

  function doAllResolver(item, index) {
    self.resolve(item).then(function (value) {
      values[index] = value;

      if (++resolved >= len && !called) {
        called = true;
        doResolve(promise, values);
      }
    }, function (error) {
      if (!called) {
        called = true;
        doReject(promise, error);
      }
    });
  }
}
```
Promise.all 用来并行执行多个 promise/值，当所有 promise/值执行完毕后或有一个发生错误时返回。可以看出：

* Promise.all 内部生成了一个新的 promise 返回。
* called 用来控制即使有多个 promise reject 也只有第一个生效。
* values 用来存储结果。
* 当最后一个 promise 得出结果后，使用 doResolve(promise, values) 设置 promise 的 state 为 FULFILLED，value 为结果数组 values。

### Promise.race
```js
// Promise.race 接受一个数组，当数组中有一个 resolve 或 reject 时返回。
// 这里用 called 控制只要有任何一个 promise onFulfilled/onRejected 立即去设置 promise 的状态和值。
PromiseFn.race = race;
function race(promises) {
  if (!isArray(promises)) {
    throw new TypeError('parameter must be a array');
  }

  const len = promise.length;
  if (!len) {
    return this.resolve([]);
  }

  let called = false;
  let self = this;
  let i = -1;
  const values = new Array(len);
  const promise = new this(noop);

  while (++i < len) {
    doReacResolver(promises[i], i);
  }

  return promise;

  function doReacResolver(item) {
    self.resolve(item).then(function (value) {
      if (!called) {
        called = true;
        doResolve(promise, value);
      }
    }, function (error) {
      if (!called) {
        called = true;
        doReject(promise, error);
      }
    });
  }
}
```
Promise.race 接受一个数组，当数组中有一个 resolve 或 reject 时返回。跟 Promise.all 代码相近，只不过这里用 called 控制只要有任何一个 promise onFulfilled/onRejected 立即去设置 promise 的状态和值。

附最佳调试测试用例：
```js
new PromiseFn(function (resolve) {
  // // resolve(new PromiseFn(function (resolve) {
  //   resolve(true);
  // // }));
  setTimeout(() => {
    resolve('haha');
  }, 1000)
}).then(function (result) {
  console.log('result:', result)
});
```

### 感受Promise
我们假设 doSomething 耗时 1s，doSomethingElse 耗时 1.5s：
```js
function doSomething() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('something')
    }, 1000)
  })
}
 
function doSomethingElse() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('somethingElse')
    }, 1500)
  })
}
```
*  第一种情况：
```js
console.time('case 1')
doSomething().then(() => {
  return doSomethingElse()
}).then(function finalHandler(res) {
  console.log(res)
  console.timeEnd('case 1')
});

// somethingElse
// case 1: 2509ms
// 执行顺序为：
// 解释：正常的 Promise 用法。
doSomething()
|----------|
           doSomethingElse()
           |---------------|
                           finalHandler(somethingElse)
                           |->
```
* 第二种情况：
```js
console.time('case 2')
doSomething().then(function () {
  doSomethingElse()
}).then(function finalHandler(res) {
  console.log(res)
  console.timeEnd('case 2')
})
// undefined
// case 2: 1009ms
// 执行顺序为：
// 解释：因为没有使用 return，doSomethingElse 在 doSomething 执行完后异步执行的。
doSomething()
|----------|
           doSomethingElse()
           |---------------|
           finalHandler(undefined)
           |->
```
* 3. 第三种情况
```js
console.time('case 3')
doSomething().then(doSomethingElse())
  .then(function finalHandler(res) {
    console.log(res)
    console.timeEnd('case 3')
  })
// something
// case 3: 1008ms
// 执行顺序为：
// 而我们知道 then 需要接受一个函数，否则会值穿透，所以打印 something。
doSomething()
|----------|
doSomethingElse()
|---------------|
           finalHandler(something)
           |->
// 上面代码相当于：
console.time('case 3')
var doSomethingPromise = doSomething()
var doSomethingElsePromise = doSomethingElse()
doSomethingPromise.then(doSomethingElsePromise)
  .then(function finalHandler(res) {
    console.log(res)
    console.timeEnd('case 3')
  })
```


* 第四种情况：
```js
console.time('case 4')
doSomething().then(doSomethingElse)
  .then(function finalHandler(res) {
    console.log(res)
    console.timeEnd('case 4')
  })
// somethingElse
// case 4: 2513ms
// 执行顺序为：
// 解释：doSomethingElse 作为 then 参数传入不会发生值穿透，并返回一个 promise，所以会顺序执行。
doSomething()
|----------|
           doSomethingElse(something)
           |---------------|
                           finalHandler(somethingElse)
                           |->


[原文]：(https://blog.csdn.net/shimodocs/article/details/55100011)
