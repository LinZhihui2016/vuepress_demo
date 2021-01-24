> JS基础知识是前端大门，这个区域的知识点必须稳，不稳就要面临“滚”的局面。

## 原生
### 函数防抖和函数节流
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
### AJAX
```js
let request = new XMLHttpRequest()
request.open('GET', '/xxx')
request.onreadystatechange = function() {
  if (request.readyState === 4) {
    if (request.status >= 200 & request.status > 300) {
      console.log('请求成功');
    } else {
      console.log('请求失败');
    }
  }
}
request.send('a=1')
```
### this
```js
fn() //this指向window,严格模式下为undefind
a.b.c.fn() //this指向a.b.c
fn.call(abc) //this指向abc
fn.apply(abc) //this指向abc
fn.bind(abc) //this指向abc
let a = new Fn() //this指向a
()=>{} //this指向父this
```
### 深拷贝
```js
function clone(object) {
   var object2
   if (!(object instanceof Object)) {
     return object
   } else if (object instanceof Array) {
     object2 = []
   } else if (object instanceof Function) {
     object2 = eval(object.toString())
   } else if (object instanceof Object) {
     object2 = {}
   }
   for (let key in object) {
     object2[key] = clone(object[key])
   }
   return object2
 }
```
### 正则实现trim()
```js
function trim(string){
  return string.replace(/^\s+|\s+$/g,'')
}
```

### 继承
prototype
```js
//创造父属性及方法
function Father(){
  this.firstName = 'lin'
}
Father.prototype.sleep = function(){console.log('sleep')}
//儿子继承父亲属性
function Son(){
  Father.apply(this,arguments)
}
//儿子继承父亲方法
let f = function(){}
f.prototype = Father.prototype
Son.prototype = new f()
```
class
```js
class Son extends Father{
  constructor(){
    super()
  }
}
```
### 数组去重
hash
```js
let arr = [2, 4, 2, 3, 5, 6, 3, 4]
let hash = {}
arr.forEach((value) => {
  if (value in hash) {
  } else {
    hash[value] = true
  }
})
let newArr = [...Object.keys(hash)]

```
set
```js
[...new Set(array)]
```
## ES6新特性 
### let&const
>`let`仅在所在的代码块内有效，不存在变量提升，不可重复声明
>`const`声明常量，声明后不可修改

### 解构赋值
``` js
let [a,b,c] = [1,2,3]
let {a,b} = {a:'1',b:'2'}
let [a,b,c,d,e] = 'hello'
```
### Promise
```js
let fn = function() {
  return new Promise(function(resolve, reject) {
      // pending
      if ("成功") {
        resolve(value) //fulfilled
      } else {
        reject(value) // rejected
      })
  }
```
### await/async
让异步变同步
### class

## DOM操作
### 事件的传播
>第一阶段：从window到目标节点，称为“捕获阶段”
>第二阶段：在目标上触发，称为“目标阶段”
>第三阶段：从目标节点到window，称为“冒泡阶段”
>`event.stopPropagation()`可以停止传播行为
### 事件委托
``` js
function(ele,event,selector,fn){
  element.addEventListener(event,e=>{
    let el = e.target
    while (!el.matches(selector)){
      if (element === el){
        el = null
        break
      }
      el = el.parentNode
    }
    el && fn.call(el,e,el)
  })
  return element
}
```

### 可拖拽的div
```js
let mouseEvent = false
let position = null
ele.addEventListener('mousedown', (e) => {
  mouseEvent = true
  position = [e.clientX, e.clientY]
})

document.addEventListener('mousemove', (e) => {
  if (mouseEvent) {
    ele.style.left = parseInt(ele.style.left || 0) + e.clientX - position[0] + 'px'
    ele.style.top = parseInt(ele.style.top || 0) + e.clientY - position[1] + 'px'
    position = [e.clientX, e.clientY]
  }
})

document.addEventListener('mouseup', (e) => {
  mouseEvent = false
  position = null
})
```
