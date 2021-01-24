> Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

# 框架
## MVC
`MVC ==> Model View Controller`
Model控制数据，View控制视图，Controller控制逻辑语言。
## MVVM
MVVM是MVC的一种升级版，将原来Controller替换为ViewModel。
ViewModel顾名思义，同时对View和Model进行同步管理。
`Model  <===>  ViewModel  <==> View`
当Model和View出现更新时，ViewModel监听更新，并同步给另外一方，达到视图层和数据层的双向绑定。
# vue的基础
## vue的实例
```javascript
let vm = new Vue(options)
```
options中包含了常用的数据（data、methods、computed等），DOM（el、template等）、生命周期钩子（beforeCreate、created、beforeMount、mounted等），还有其他选项。

### vue的开始：el ===> `String | Element`
>提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。
将Vue实例挂载，创建Vue和DOM之间的联系。

### 数据：data ===> `Object`
>当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

必须是一个对象，里面放置了vue实例的基本数据，数据发生改变时，视图会重新渲染（最基本的MVVM监听）。但是data只对本身存在的属性进行响应，对后来添加的新data将无视。如果想后期插入新的data，应当在data中设置`null`来“占座位”。

可以通过`vm.$data`访问data里的属性，也可以直接通过`vm.xxx`来直接访问具体的属性。

### 方法：methods ===> `{key:Function}`
>methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用。方法中的 this 自动绑定为 Vue 实例。

***不要使用箭头函数***
methods里储存了一些基本的函数方法，通过`this.fn`来调用。
这些方法有的会用在生命周期钩子中，有的会用在事件触发。

### 计算属性：computed ===> `{key:{get:Function,(set:Function)}}`
>计算属性将被混入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例。
>计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果某个依赖 (比如非响应式属性) 在该实例范畴之外，则计算属性是不会被更新的。

***不要使用箭头函数***
当直接引用data中的数据的时候，有时候需要一些逻辑上的处理，如果逻辑上的处理较为繁琐（直接引用data数据只能使用单个表达式），应当使用计算属性。
computed内默认是只设置getter函数（监听data数据），必要时还可以设置setter函数(反向修改data数据)

### 监听：watch ===> `{key:Function}`
>一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。

***不要使用箭头函数***
相比计算属性，监听器只能监听一个data的变化。
监听器可以传入2个参数，第1个参数是旧值，第2个参数是新值。

### 生命周期钩子Lifecycle Hooks ===> `Function`
#### 什么是生命周期钩子
>每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。
https://cn.vuejs.org/images/lifecycle.png

Lifecycle 生命周期
Hooks 钩子
Lifecycle Hooks 生命周期钩子
***翻译的跟屎一样***

#### beforeCreate 
在初始化之后，还没有进行data和watch配置。
#### created 
在beforeCreate后进行了data和watch配置，还没开始挂载。***还没有$el***
#### beforeMount
挂载开始之前。
#### mounted
el被$el替换，开始挂载，调用mounted钩子。

#### 其他钩子
未学习，待更新，包括了update、destroy等。

## 模板语法
>Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。
### 文本 `{{ xxx }}`
数据捆绑，用双大括号包裹，直接data（computed、methods）里的数据xxx。
括号内的内容其实是一个JavaScript表达式，可以使用基本的方法。
### 指令
双大括号语法不能用在标签的属性中，所以要换一种方法，也就是指令。

#### v-bind
v-bind可以动态修改标签的属性
```html
<a v-bind:href="xxx">引号内为JavaScript表达式，这里指向了data里的xxx属性</a>
```
vue为v-bind准备了一个语法糖，即`v-bind === :`

#### v-on
v-on动态监听DOM事件
```html
<a v-on:click="onClick">引号内为JavaScript表达式或者是methods里的函数方法，这里指向了methods里的onClick方法</a>
```
vue为v-on准备了一个语法糖，即`v-bind === @`

#### v-text
```javascript
data:{
    msg:'xxx'
}
```
```html
<p>我要用v-text了：<span v-text='msg'>这个会被替换掉，看不见的</span></p>
```
```
我要用v-text了：xxx
```
会将标签原来的内容替换掉

#### v-html
相对于v-text，多了渲染html代码

#### v-if\v-else\v-else-if
```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```
v-else，v-else-if 也必须紧跟在带 v-if 或者 v-else-if 的元素之后

#### v-show
v-if是不挂载，v-show只是`display:none`

#### v-for
>我们可以用 v-for 指令基于一个数组来渲染一个列表。v-for 指令需要使用 item in items 形式的特殊语法，其中 items 是源数据数组，而 item 则是被迭代的数组元素的别名。
```javascript
data: {
    items: [
      {text: 'a'},
       {text: 'b'},
       {text: 'c'}
    ]
  }
```
```html
<p v-for='item in items'>{{item.text}}</p>
```
```
a
b
c
```

当遍历的是数组时，可以使用2个参数，分别是value、index;
当遍历的是数组时，可以使用3个参数，分别是value、key、index;
用v-for的时候出现坑爹BUG，一般都要配合用key属性，来确保不会乱成一锅粥。


# 待更新
以上为2019/6/17所写，学习仍在继续。