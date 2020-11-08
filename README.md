# Promise-learn

学习Promise的笔记和代码 SSP冲冲冲！！！

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

### 2.3 如何使用Promise?