> JS共有7种数据结构，分别是数值Number，字符串String，布尔Boolean，不存在null，未定义undefined，对象Object，以及Symbol（ES6新增）。

# 数值
## 整数和浮点数
所有数字都是用64位浮点数保存，不严格区分整型和浮点型。64位中第1位数字表示该数字的正负，第2位到第12位为指数，第13位到第64位为有效数字。因此JavaScript 能够表示的数值范围为2^1024^到2^-1023^。数字超过了2^1024^次方后返回`Infinity`，小于或等于2^-1075^返回`0`。
## 数值表示
数值有多种表示方法
```javascript
123e3 //123000
123e-3 //0.123
0b11 // 3，0b开头表示二进制
011 // 9，0开头表示八进制
0x11// 17，0x开头表示十六进制
```
## 正负0
JS数字保留了一个二进制位作为正负位，所以`0`也有正负。
- 除于`+0`和`-0`会分别得到`+Infinity`和`-Infinity`

## NaN`
`NaN`表示非数字，字符串与数字计算的结果就会是`NaN`，非实数也表示为`NaN`。`0/0`的结果为`NaN`，但是非0数除于0的时候，结果为`+Infinity`和`-Infinity`。`NaN`的布尔值为`false`。`NaN`的任何运算结果都为`NaN`。
```javascript
1+'x' // NaN
Math.sqrt(-1) // NaN
0/0 // NaN
8/0 // Infinity
NaN === NaN // false
Boolen(NaN) // false
```
## Infinity
数字超过了2^1024^次方后返回`Infinity`，`Infinity`区分正负`+Infinity`和`-Infinity`。`Infinity`>任何数>`-Infinity`，但是和`NaN`比较时候结果都为`false`。
```javascript
Math.pow(2,1024) // Infinity
-1/0 // -Infinity
```
## 关于Infinity和NaN的四则运算
`NaN`的任何计算结果都为`NaN`
```javascript
NaN + 10 // NaN
NaN - 10 // NaN
NaN * 10 // NaN
NaN / 10 // NaN
```
`Infinity`与常数的计算和大部分常数计算一样
```javascript
5 * Infinity //Infinity
5 + Infinity //Infinity
5 - Infinity // -Infinity
5 / Infinity // 0
Infinity /5 // Infinity
Infinity * Infinity // Infinity
Infinity + Infinity // Infinity
```
`Infinity` 部分计算得到`NaN`
```javascript
Infinity * 0 // NaN
Infinity - Infinity //NaN
Infinity / Infinity //NaN
```
# 字符串
## 多行字符串
JS提供了多种方法来输入多行字符串
```javascript
//1.反斜杠结束，反斜杠后不可有任何字符串
var a = 'a \
b\
c'
console.log(a) // 'abc'
//2.多字符串拼接
var a = 'a' +
  'b'+
  'c'
console.log(a) // 'abc'
//3.反引号，难用的很
var a=`a
b
c`
console.log(a) // 'a\nb\nc'会带入\n
//4.骚操作
(function (){ /*
a
b
c
*/}).toString().split('\n').slice(1,-1).join('')
// abc
```
## 转义符
反斜杠 `\`的特殊含义
```
\0 : null
\b : 后退
\f : 换页
\n : 换行
\r : 回车
\t : 制表
\v : 垂直制表
\' : 单引号'
\" : 双引号"
\\ : 反斜杠\
```
反斜杠表示Unicode
```javascript
\HHH 用3个八进制表示Unicode
'\251' //  ©
'\172' // z
\xHH 用2个十六进制表示Unicode
'\xA9' //  ©
'\x7A' // z
\uXXXX 用4个十六j进制表示Unicode
'\u009A' //  ©
'\u007A' // z
```
## 长度
length返回字符串长度
```javascript
var a = 'balabala'
a.length //8
```
## 切片
和Python不同的是，JS字符串无法直接多切、逆切，只能正向单切
```javascript
var a = 'balabala'
a[0] = 'b'
a[1] = 'a'
a[-1] = undefined
```
# undefined和null
JS的数据类型比python多了`undefined`和`null`，二者都是“没有”，但语义和用在计算的时候体现出不同。
- `null`表示空值，`undefined`表示未定义
- 在数字计算中，`null`转为0，`undefined`则转为`NaN`

# 布尔
## true  false
在JS中，其他类型的除了`undefined`\\`null`\\`false`\\`0`\\`NaN`\\`空字符串`，其他都为`true`。
## 或且非
`&&`用来表示`且`，`||`用来表示`或`，`!`用来表示`非`。
```javascript
1 && 1 // true
1 && 0 // false
0 && 0 // false
1 || 1 // true
0 || 1 // true
0 || 1 // false
!0 // true
!1 // false
```
## 三元运算
用`?`和`:`分隔的三个表达式，第一个表达式判断，第二个为`true`的值，第三个为`false`的值。
```javascript
var a = 1 ? '我是对的' : '我是错的'  // a = '我是对的'
var b = 0 ? '我是对的' : '我是错的' // b = '我是错对'
a ? b : c 等同于 if(a){b}else{c}
```

# 对象
## 概述
对象就是~~找老婆~~Object。其实就是字典的结构，是“键key”和“值value”组成，是一种无序的复合数据集合。键只能是字符串，可不加引号，值可以是其他结构。每对键值之间用逗号隔开。
##读取值
JS对象有2种取值的方法，分别是“.”和“[]”。
```javascript
var object = {hello:'world'}
object.hello // world
object['hello'] //world
```
使用[]读取属性时候，内部的字符串要加引号。


# 类型转换
## 转String
number to string
```javascript
var a = 9
a.toString() //'9'
a+'' //'9'
String(a) // '9'
```
boolean to string
```javascript
var a = true
a.toString() //'true'
a+'' //'true'
String(a) // 'true'
```
null/undefined to string
```javascript
var a = null
var b = undefined
a.toString() //报错
b.toString()  //报错
a+'' // 'null'
b+'' // 'undefined'
String(a) // 'null'
String(b) // 'undefined'
```
object to string
```javascript
var a = {'name':'lin'}
a.toString() // '[object Object]'
a+'' // '[object Object]'
String(a) // '[object Object]'
```
## 各类型转boolean
Boolean 或 !!
```javascript
//除去以下特殊的几个结果为false,其余都为true
Boolean('') //空字符
!!null  //null
!!undefined //undefined
!!0 // 0
!!NaN //NaN
```
## 各类型转number
Number
```javascript
Number('1') //1
Number('2.3') //2.3
Number(null) //0
Number(true) //1
Number(undefined) //NaN
Number('1xx') //NaN
```
parseInt
```javascript
parseInt('       11',10) //11
parseInt('11',10) //11
parseInt('11',2) //3
parseInt('11',8) //9
parseInt('11ds',10) //11，从左向右，出现非法字符串停下
parseInt('ads') //NaN，左起没有有效字符直接判断NaN
```
parseFloat
```javascript
parseFloat('11.32') //11.32
parseFloat('11.3x2') //11.3，从左向右，出现非法字符串停下
parseFloat('11') //11
parseFloat('ads') //NaN，左起没有有效字符直接判断NaN
```
-0 或 +
```javascript
'123'-0 //123
'1.23'-0 //1.23
null-0 //0
true-0 //1
'1.23xx'-0 //NaN
+'123' //123
+'1.23' //1.23
+true //1
+null //0
+'1.23xx' //NaN
```