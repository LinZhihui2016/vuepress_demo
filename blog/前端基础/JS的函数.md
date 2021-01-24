> 函数，就是y=kx+b。并不是，编程中的函数指的是可以一段可以反复调用的代码块，能接受各种参数，能返回不同的值。善于利用函数，可以减少重复编写程序段的工作量，也可以避免一些不必要的BUG。

# 函数声明
## 直接function
```JavaScript
function print(s) {
  console.log(s);
}
```
## 变量=匿名函数
```JavaScript
var p = function(s) {
  console.log(s);
}
```

## 函数再命名
```JavaScript
var print = function p(s) {
  console.log(s)
  console.log(print.name) //此时会打印p
}
```
## 构造函数
```JavaScript
var print = new Function('x','y','return x + y');
//非常坑爹
```
## 箭头函数：=>
```JavaScript
f = (x,y) =>{return x*y}
f = (x,y) => x*y
```

# 默认属性和方法
## name
```JavaScript
function fun() {}
fun.name // 返回fun，好奇怪的用法，我问我自己
```
```JavaScript
var fun1 = function fun2() {}
fun1.name //返回fun2，这是隔壁老王的
```
## length
```JavaScript
function fun(a,b,c) {}
fun.length //返回3
```
## toString()
```JavaScript
var a = function fun(a,b,c) {}
a.toString()
 //  'function fun(a,b,c) {}' 会连注释和换行符一并带出来
```

# 作用域
## 局部变量
```Python
#我是python
a = 1
def fun1():
    global a  #此处必须声明变量a是全局，否则无法修改变量a，会报错
    print(a)
    a = 2  #如果没有修改变量a，只是引用变量a，则不需要global声明
    print(a)
    return 
fun1()   # 1 2
```
```JavaScript
//我是JS
var a = 1
function fun1(){
  var a = 2 //局部变量覆盖全局变量，但全局的a还是自己
  console.log(a) 
}
fun1() // 2
console.log(a) // 1 
```
2种语言对比，就是python会去警告你不能动全局，JS就按原来的规则执行

## 自身作用域
```JavaScript
var a = 1
function fun1(){console.log(a)}
function fun2(){
  var a =2
  fun1()
}
fun1() // a=1 我是哪里定义的，我就用哪里的变量
```
# 参数
## 参数数量
```JavaScript
function f(a,b,c){
  return a
}
f() //undefined  输入参数不够的时候，不够的都是undefined
f(1)  //1  f(1,undefined,undefined)
f(1,2) //1
f(1,2,3) //1
f(1,2,3,4) //1
f.length // 3
```
## 传值
```JavaScript
var a = 1;
var b = {'b':'bb'}
var c = {'c':'cc'}
function f1(a,b,c){
  a = 4
  b.b = 'bbb' //修改的时候会跟着
  c = {'c':'ccc'} //指向了新的地址，此c非彼c
}
f1(a,b,c)
console.log(a) //还是全局的a
console.log(b) //传递的是地址，所以{'b':'bbb'}
console.log(c) //函数内的c指向了新地址，{'c':'cc'}
```
## arguments
函数拥有不定数目的参数，就需要想办法读取到每一个参数，arguments类似一个列表，装进了每一个传递进去的参数，甚至可以修改参数。arguments.length可以查看参数数量。
```JavaScript
function f1(a,b) {
  console.log(arguments[0])
  console.log(arguments[1])
  console.log(arguments[2])
  console.log(arguments[3])
}
f1(1,2,3) // 1 2 3 undefined
//管他三七二十一，进来几个就读取几个
function f2(a,b){
  arguments[0] = 1 // var a = 1
  arguments[1] = -1 // var b=-1
  return a+b
}
f2(2,2) // 0 
```

严格模式下，arguments无法修改参数

# 常用的函数封装
## 函数防抖
函数防抖就是等到没有新触发了就行动
```javascript
function debounce(fn, wait) {
  let timeout;
  return function() {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
      timeout = null;
    }, wait)
  }
}
```
## 函数节流
函数节流就是事件自带冷却时间
```js
function throttle(fn, interval) {
  let mark = true;
  return function() {
    if (!mark) return;
    mark = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      mark = true;
    }, interval);
  };
}
```
## AJAX
```js
function(url, method, data, resolve, reject) {
  let request = new XMLHttpRequest()
  request.open(method, url)
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status >= 200 & request.status > 300) {
        resolve.apply(this, arguments);
      } else {
        reject.apply(this, arguments);
      }
    }
  }
  request.send(data)
}
```