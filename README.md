# Promise-learn

学习Promise的笔记和代码         SSP冲冲冲！！！

---

## 第一章：准备

### 1.1. 区别实例对象和函数对象

- 实例对象：由构造函数new出来的，一般简称为对象
- 函数对象：把函数作为对象使用时，就叫做函数对象

```javascript
function Fn() { }                   // Fn函数
const fn  = new Fn()                // Fn是构造函数 fn是实例对象（简称为对象）
console.log(Fn.prototype)           // Fn是函数对象（对象才有属性选择器.）

$('#test')                          // jQuery函数
$.get('/test')						// jQuery函数对象
```

- tips：属性选择器.的左边是对象，括号左边是函数

---

### 1.2. 两种类型的回调函数(同步和异步)

> 回调函数特征：

- 自己定义的函数
- 回调函数不是由自己亲自调用的
- 回调函数最终会被调用

```javascript
// 1.同步回调函数（数组遍历相关的回调函数/Promise的executor函数）
const arr = [1, 3, 5]
arr.forEach(item => {               // 直接由主线程执行，不会放入回调队列
console.log(item)
})
console.log('forEach()之后打印')

// 2.异步回调函数
setTimeout(() => {                   // 会放入回调队列中将来执行
console.log('11111111')
},0)
console.log('22222222')              // 先由主线程执行回调函数后面的语句
```

> 浏览器打印输出：

```
1
3
5
forEach()之后打印
22222222
11111111
```

---

### 1.3. error

#### 1.3.1 常见的内置错误

> **Uncaught是Uncatch的过去式，意思是throw（抛出）了一个异常，却没有catch(处理)**

- ReferenceError：引用的变量不存在

```javascript
console.log(a)      // Uncaught ReferenceError: a is not defined
```

- TypeError：数据类型不正确的错误

```js
let b = null
console.log(b.xxx)  // Uncaught TypeError：Cannot read property 'xxx' of null
```

- RangeError：数据值不在其所允许的范围内

```js
function fn() {
	fn()            // Uncaught RangeError：Maxium call stack size exceeded
}					// 超出了调用的次数限制
```

- SyntaxError：语法错误（IDE就能帮忙纠正）

#### 1.3.2. 错误的处理(try...catch...throw)

> **throw抛出的异常由外部调用者来决定如何处理**

```js
function fn() {
    throw new Error('Msg')
}
// 外部调用者
try {
    fn()
} catch(err) {
    alert(err.message)
}
```

----

## 第二章：Promise的理解和使用

### 2.1. Promise是什么？

- Promise是JS中进行异步编程的新的解决方案
- 从语法上来说：Promise是一个构造函数
- 从功能上来说：Promise对象用来封装一个异步操作并可以获取其执行结果(可以延迟获得，在执行器执行完后也可以【和纯回调函数函数相比】)

#### -------Promise的状态改变

1. pending 变为 resolved  （成功的结果一般称·为value）
2. pending 变为 rejected   （失败的结果一般称为reason）

#### -------Promise基本使用

```js
	// 1.创建一个新的Promise
    const p = new Promise(((resolve, reject) => {      // 执行器函数
        // 2.执行异步操作
        setTimeout(() => {
            const time = Date.now()   // 如果当前时间是偶数就代表成功， 否则代表失败
            // 3.1. 如果成功了，调用resolve(value)
            if (time %2 === 0) {
                resolve('成功的数据，time=' + time)
            } else {
            // 3.2. 如果失败了，调用reject(reason)
                reject('失败的数据，time=' + time)
            }
        }, 1000)
    }))

    p.then(
        value => {       //接收得到成功的value数据(被动)    onResolved
            console.log('成功的回调', value)
        },
        reason => {      //接收得到失败的reason数据（被动）  onRejected
            console.log('失败的回调', reason)
        }
    )
```



---

### 2.2. 为什么要用Promise？

> 纯回调函数必须在启动异步操作之前指定回调函数
>
> 而Promise甚至可以在异步操作执行完了去指定回调函数并获取输出结果

> 支持**链式调用**，可以解决回调地狱问题（不便于阅读|不便于异常处理）
>
> **回调地狱**：回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调函数执行的条件
>
> **终极解决方案**：async/await

----

```
Promise.then()返回的新promise的结果状态由什么决定？
（1）简单表述：由then()指定的回调函数执行的结果决定
（2）详细表述：
    1. 如果抛出异常，新Promise变为rejected，reason为抛出的异常
    2. 如果返回的是非Promise的任意值，新Promise变为resolved，value为返回的值
    3. 如果返回的是另一个新Promise，此Promise的结果就会变为新Promise的结果
```

---

## 第三章：手写Promise

#### 3.1. 定义整体结构

```js
/*
    自定义Promise函数模块:IIFE
 */

(function (window) {
    /*
        Promise构造函数
        executor执行器
     */
    function Promise(executor) {

    }

    /*
        Promise原型对象的then(),
        指定成功和失败的回调函数，
        返回一个新的Promise对象
     */
    Promise.prototype.then = function (onResolved, onRejected) {

    }

    /*
        Promise原型对象的catch()
        指定失败的回调函数，
        返回一个新的Promise对象
     */
    Promise.prototype.catch = function (onRejected) {

    }

    /*
        Promise函数对象的resolve()
        返回一个指定value的成功的Promise
     */
    Promise.resolve = function (value) {

    }

    /*
        Promise函数对象的reject()
        返回一个指定reason的失败的Promise
     */
    Promise.reject = function (reason) {

    }

    /*
        Promise函数对象的all()
        返回一个Promise，只有所有Promise都成功才成功
     */
    Promise.all = function (PromiseArr) {

    }

    /*
        Promise函数对象的race()
        返回一个Promise，取决于第一个完成的Promise
     */
    Promise.race = function (PromiseArr) {

    }

    // 向外暴露Promise函数
    window.Promise = Promise
})(window)
```

---

#### 3.2. Promise构造函数的实现

```js
function MyPromise(executor) {
        // 将当前promise对象保存下来
        const _this = this
        this.status = 'pending'        // 给MyPromise对象指定status属性，初始值为pending
        this.data = undefined          // 给MyPromise对象指定一个用于存储结果数据的属性
        this.callbacks = []            // 缓存回调函数，每个元素的结构： { onResolved() {}, onRejected() {} }

        function resolve(value) {
            // 状态只能改变一次，如果当前状态不是pending,直接结束
            if (_this.status !== 'pending') {
                return
            }
            // 将状态改为resolved
            _this.status = 'resolved'
            // 保存value数据
            _this.data = value
            // 如果有待执行的callback(),立即异步执行回调函数
            if (_this.callbacks.length > 0) {
                setTimeout(() => {                             //放入队列里执行所有成功的回调
                    _this.callbacks.forEach(callbacksObj => {
                        callbacksObj.onResolved(value)
                    })
                })
            }
        }

        function reject(reason) {
            // 状态只能改变一次，如果当前状态不是pending,直接结束
            if (_this.status !== 'pending') {
                return
            }
            // 将状态改为rejected
            _this.status = 'rejected'
            // 保存value数据
            _this.data = reason
            // 如果有待执行的callback(),立即异步执行回调函数
            if (_this.callbacks.length > 0) {
                setTimeout(() => {                             //放入队列里执行所有成功的回调
                    _this.callbacks.forEach(callbacksObj => {
                        callbacksObj.onRejected(reason)
                    })
                })
            }
        }

        // 立即同步执行executor(),如果执行器抛出异常，则状态变为失败，reason为err
        try {
            executor(resolve, reject)

        } catch (err) {
            reject(err)
        }
    }
```

---

#### 3.3. then(),catch()的实现

```js
/*
        MyPromise原型对象的then(),
        指定成功和失败的回调函数，
        返回一个新的MyPromise对象
     */
    MyPromise.prototype.then = function (onResolved, onRejected) {
        // 向后传递成功的value
        onResolved = typeof onResolved === 'function' ? onResolved : value => value
        // 指定默认的失败的回调（实现错误/异常传透的关键点）
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}

        const _this = this

        // 返回一个新的MyPromise对象
        return new MyPromise((resolve, reject) => {

            // try...catch 复用
            function handle(callback) {
                /*
                    回调函数
                    1. 抛出异常，rejected,err
                    2. return value, resolved，value
                    3. return MyPromise, 一一对应
                */
                try {
                    const result = callback(_this.data)
                    if (result instanceof MyPromise) {
                        // result.then(
                        //     value => resolve(value),
                        //     reason => reject(reason)
                        // )
                        // 简洁写法
                        result.then(resolve, reject)    //return的MyPromise的resolve()和reject()，传的却是result的状态和data
                    } else {
                        resolve(result)
                    }
                } catch (err) {
                    reject(err)
                }
            }

            if (_this.status === 'pending') {
                // 当前状态还是pending状态，则保存回调函数
                _this.callbacks.push({
                    onResolved () {
                        handle(onResolved)
                    },
                    onRejected () {
                        handle(onRejected)
                    }
                })
            } else if (_this.status === 'resolved') {
                setTimeout(() => {
                    handle(onResolved)
                })
            } else if (_this.status === 'rejected') {
                setTimeout(() => {
                    handle(onRejected)
                })
            }
        })
    }

    /*
        MyPromise原型对象的catch()
        指定失败的回调函数，
        返回一个新的MyPromise对象
     */
    MyPromise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected)
    }
```



---

#### 3.4. resolve(),reject()的实现

```js
/*
    MyPromise函数对象的resolve()
    返回一个指定value的成功的MyPromise
 */
/*
    传入的值可以是一般值，也可以是MyPromise对象
 */
MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
    })
}

/*
    MyPromise函数对象的reject()
    返回一个指定reason的失败的MyPromise
 */
MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => {
        reject(reason)
    })
}
```



----

#### 3.5. all(),race()的实现

```js
/*
    MyPromise函数对象的all()
    返回一个MyPromise，只有所有MyPromise都成功才成功
 */
MyPromise.all = function (MyPromiseArr) {
    const resolveArr = new Array(MyPromiseArr.length)  // 成功的Promise结果
    let count = 0

    return new MyPromise((resolve, reject) => {
        MyPromiseArr.forEach((_MyPromise, index) => {   // index的主要作用是按顺序输出value,因为异步，这些promise不一定按顺序完成
            // 传入的数组中可能有值,不是MyPromise
            MyPromise.resolve(_MyPromise).then(
                value => {
                    resolveArr[index] = value
                    if (++count === MyPromiseArr.length) {
                        resolve(resolveArr)
                    }
                },
                reason => {
                    reject(reason)
                }
            )
        })
    })
}

/*
    MyPromise函数对象的race()
    返回一个MyPromise，取决于第一个完成的MyPromise
 */
MyPromise.race = function (MyPromiseArr) {
    return new MyPromise((resolve,reject) => {
        MyPromiseArr.forEach(_MyPromise => {
            MyPromise.resolve(_MyPromise).then(resolve,reject)
        })
    })
}
```

---

#### 3.7. function 完整版本（ES5）

---

#### 3.8. class 完整版本（ES6）

----

### 第四章：async与await

> 1. async 函数
>
> 函数的返回值为Promise对象，和then差不多
>
> 2. await 表达式
>
> await右侧的表达式一般为Promise对象，但也可以是其他值，失败的结果只能在catch中获得

----

### 第五章：JS之异步宏队列与微队列

----

- 宏队列：DOM事件回调、AJMAX回调、定时器回调
- 微队列：Promise回调、MutationObserver回调

> **微队列优先级更高，而且可以插宏队列的队**

