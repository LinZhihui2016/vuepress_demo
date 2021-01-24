> Python语言中有“类（class）”的概念，写好一个类后，需要实例化，对象就是类的实例化（理解为爸爸儿子就好了）。JavaScript的爸爸儿子则是构造函数和原型链。原型和原型链构成了JS的全部，是重中之重的基础知识。

# 原型及原型链

## 构造函数
```JavaScript
var fun_father = function(){} //定义一个函数
var fun_son = new fun_father() //father作为构造函数，儿子则是father的一个实例
fun_father.prototype === fun_son.__proto__ //true 
// 子的__proto__指向父的prototype
```

## 包装对象
三种最基本的原始类型，数值、字符和布尔值，相对应的构造函数`Number`、`String`、`Boolean`可以把原始类型的值变成对象。
```JavaScript
//用new视为构造函数
var n = new Number(123) 
var s = new String('a') 
var b = new Boolean(true)
//不带new则作为普通函数
var nn = Number(123)
var ss = String('a')
var bb = Boolean(true)
```
## `valueOf`和`toString`
上面三种构造函数也继承自父亲`Object`，并继承了Object的 `valueOf`和`toString`。
`valueOf`可以将上面的对象n\s\b返回内在的值
```JavaScript
n.valueOf() //123
s.valueOf() //'a'
b.valueOf() //true
```
`toString`则返回成字符串形式，参考《JS的数据结构》的类型转换。
## `__proto__` 和`prototype`
A构造了B，A就是B的原型对象，B的`__proto__`就指向了A的`prototype`。原型上面还有原型，就构成了原型链。
三个构造函数连同`Object`都为`Function`的儿子，甚至连`Function`都是自己`Function`构造的，所以`__proto__`都指向了`Function.prototype`。
三个构造函数的`prototype`也是对象，所以父亲是`Object`，所以`String.prototype.__proto__`指向`Object.prototype`。
`Object.prototype`作为老父亲的，往上已经没有人了，所以`Object.prototype.__proto__`指向了`null`。

2019/4/20补充
```JavaScript
Function.prototype.__proto__ === Object.prototype
```

![原型链](https://linzhihui.oss-cn-hangzhou.aliyuncs.com/personal-index/blog/%E5%8E%9F%E5%9E%8B%E9%93%BE.png)


# 特殊的对象——数组
## 数组是什么
数组是对象的一种，是特殊的对象，和对象的差别在于：对象的`__proto__`指向了`Object.prototype`，而数组的`__proto__`指向了`Array.prototype`，`Array.prototype`的`__proto__`才指向了`Object.prototype`。
也就是：
```
[3,4].__proto__  === Array.prototype //true
Array.prototype.__proto__ === Object.prototype  //true
```
也就是说数组拥有对象的基本属性和方法，还额外拥有自己的基本属性和方法，包括了pop、push、shift等。