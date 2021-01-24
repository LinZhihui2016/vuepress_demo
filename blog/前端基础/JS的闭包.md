> JavaScript函数的闭包是一个很重要的知识点，在学习Python时闭包就没理解透，这次通过JS的闭包试试看一并理解这个概念。

# 前置

## 函数作用域
在JS中，引用某个参数时，会按作用域向下寻找该参数，直到window全局仍然没有找到该参数时，返回错误。
``` javascript
let a=1
let f1 = function(){
    b=2
    console.log(a) //全局变量
    console.log(b) //局部变量
    console.log(c) //未定义过
}
f1()
// 1
// 2
// Uncaught ReferenceError: c is not defined
```
## 垃圾回收机制
在创建一个对象时，该对象会分配到自己对应的内存，当JavaScript检测不再需要该对象的时候，便会释放这个对象的内存，这个对象也就‘消失’了。
``` javascript
let a='hello' //假设'hello'的地址是1
let b='world' //假设'world'的地址是2
a = b //a指向了'world'，原来的'hello'无人问津，被JavaScript无情抹杀
```

# 闭包
## 什么是闭包?
当一个内部函数引用了外部函数的参数，就产生了闭包。 
>张麻子：**你给我翻译翻译，什么叫闭包？**
>汤师爷：**这还用翻译，都说了**
>张麻子：**我让你翻译给我听，什么叫闭包？**
>汤师爷：**不用翻译，这就是闭包**
>张麻子：**我就想让你翻译翻译，什么叫闭包？**
>汤师爷：**闭包嘛**
>张麻子：**翻译出来给我听，什么TMD叫闭包！什么TMD叫TMD的闭包！**
>汤师爷：**看代码！！！！！！！！！！！！1**
## 翻译翻译
```javascript
function father(){
    let a=2
    function son(){
        console.log(a)
    }
}
```
没错，这样就产生了闭包，函数son想要打印father的a，father说那就给你吧，这就叫闭包。
这里一定会想问为什么不这样
```javascript
function father(){
    let a=2
    console.log(a)
}
```
当然可以，不过有些时候必须用闭包的方法，看以下例子
``` javascript
//闭包
function f1(){
    let a=2
    function son(){
        a++
        console.log(a)
    }
    return son
}
//不用闭包
function f2(){
    let a=2
    a++
    console.log(a)
}
```
这2个函数是完全不一样的，先看f2，稍微有点基础的人就知道，怎么运行这个函数都是打印了3。那么f1呢？
```javascript
function f1(){
    let a=2
    function son(){
        a++
        console.log(a)
    }
    return son
}
let f =f1() //f1()返回了son函数，此时参数f是f1函数里的son函数
f() //第一次运行了son函数,得到了3
f() //第二次运行了son函数,得到了4
```
>张麻子：**哈，原来这TM的是闭包啊**

## 闭包的用法
学过Python的，肯定都知道类和实例，这里的闭包也可以这样用。
```javascript
function class_(left){
    let a=left
    function add(right){
        a += right
        console.log(a)
        return a
    }
    function minus(right){
        a -= right
        console.log(a)
        return a
    } 
    fun={'add':add,'minus':minus}
    return fun
}
let f1 = class_(10) //f1是函数class_的第1个实例
let f2 = class_(100)//f2是函数class_的第2个实例
f1.add(20) //30
f1.minus(29) //1

f2.add(20) //120
f2.minus(102) //18
//f1和f2互不相干，但都是class_的一个实例
```
## 内存泄漏
稍微观察仔细点，其实会发现这样滥用闭包的话，闭包的参数会一直留在内存中，反而对内存具有了负面影响。