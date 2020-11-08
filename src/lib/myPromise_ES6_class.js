/*
    自定义MyPromise函数模块:IIFE
 */

(function (window) {

    class MyPromise {
        constructor(executor) {
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

        /*
        MyPromise原型对象的then(),
        指定成功和失败的回调函数，
        返回一个新的MyPromise对象
     */
        then(onResolved, onRejected) {
            // 向后传递成功的value
            onResolved = typeof onResolved === 'function' ? onResolved : value => value
            // 指定默认的失败的回调（实现错误/异常传透的关键点）
            onRejected = typeof onRejected === 'function' ? onRejected : reason => {
                throw reason
            }

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
                        onResolved() {
                            handle(onResolved)
                        },
                        onRejected() {
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
        catch(onRejected) {
            return this.then(undefined, onRejected)
        }

        /*
            MyPromise函数对象的resolve()
            返回一个指定value的成功的MyPromise
         */
        /*
            传入的值可以是一般值，也可以是MyPromise对象
         */
        static resolve = function (value) {
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
        static reject = function (reason) {
            return new MyPromise((resolve, reject) => {
                reject(reason)
            })
        }

        /*
            MyPromise函数对象的all()
            返回一个MyPromise，只有所有MyPromise都成功才成功
         */
        static all = function (MyPromiseArr) {
            const resolveArr = new Array(MyPromiseArr.length)  // 成功的Promise结果
            let count = 0

            return new MyPromise((resolve, reject) => {
                MyPromiseArr.forEach((_MyPromise, index) => {   // index的主要作用是按顺序输出value,因为异步，这些promise不一定按顺序完成
                    // 传入的数组中可能有值,不是MyPromise(包一层)
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
        static race = function (MyPromiseArr) {
            return new MyPromise((resolve, reject) => {
                MyPromiseArr.forEach(_MyPromise => {
                    MyPromise.resolve(_MyPromise).then(resolve, reject)
                })
            })
        }

    }

    // 向外暴露MyPromise函数
    window.MyPromise = MyPromise
})(window)
