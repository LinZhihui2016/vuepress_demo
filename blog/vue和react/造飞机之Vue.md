> 造飞机系列第三章，渐进式框架的Vue的一些疑难杂症。

# Vue
## watch和computed的区别
### watch
watch是一个动作
>watch的监听主要负责的是一对多监听，当watch监听的值变化时，可以进行一系列操作；
>watch的回调参数是新旧值，可以对两个值进行特定的操作。
### computed
computed是一个计算值
>computed的监听主要负责的是多对一监听，只要computed所依赖的值改变，computed计算的属性就会跟进；ounted
>computed具由缓存性，还有setter功能


## 生命周期钩子
>beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestory、destoryed
### created和mounted
>create一般用于数据的初始化，mounted一般用于特殊的插件对DOM进行操作


## 组件通信
>方法一：父子组件props、$emit传递
>方法二：爷孙（兄弟）组件，二次父子组件
>方法三：`var eventBus = new Vue()`
>方法四：Vuex状态管理

## Vue的双向绑定（数据响应）
> `v-model`来实现数据响应式
>原理是使用 `Object.defineProperty` 把这些属性全部转为 `getter/setter`，但Vue无法检测到对象属性的添加或删除，应当使用`Vue.set(object, propertyName, value)`方法向嵌套对象添加响应式属性。

# Vuex
## Vuex是什么
>Vuex是专门为Vue.js开发的状态管理模式
## 核心概念
### State
>State是Vuex的数据源
### Getter
>Getter就是Vuex里的计算属性
### Mutation
>Mutation是更改State的唯一方法
### Action
>Action就是Vuex用来逻辑操作的，在action提交mutation来改变Mutation
### Module
>modules就是用来合并多个store模块
# Vue-router
## Vue-router是什么
>Vue-router是Vue.js官方的路由管理器
## 如何使用Vue-router
>通过组合组件来组成页面，将组件映射到路由。根据需求配置动态路由、路由守卫、嵌套路由、路由懒加载等功能。

## 动态路由
```js
new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```
>以冒号开头，冒号后的参数名会被设置到`this.$route.params`中。

## 路由守卫
>比较常用的是前置守卫，使用`router.beforeEach(fn)`来注册一个前置守卫，可以在进入该组件之前进行逻辑判断，是否要进行其他操作，例如取消本次跳转，跳转至其他页面等。路由守卫中一定要`next()`

## 嵌套路由
>使用`children`配置嵌套路由

## 路由懒加载
> 使用`import`来引入组件