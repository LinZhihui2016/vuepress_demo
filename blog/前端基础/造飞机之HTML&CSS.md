> 马上就要出征了，出征路上准备点干粮。面试一路上风风雨雨，但愿能安稳度过。先整理一下跟HTML&CSS有关的知识点吧。

# HTML
## HTML语义化

>互联网一开始并没有区分前后端，都是由PHP后端负责前端工作，由于CSS的麻烦，后端们索性用table布局，这就违背了HTML语义化。之后了分化出了专门的前端，但也只是DIV+CSS布局，只能说勉强语义化。近几年，前端变的更专业了，于是前端们就开始用适当的标签来表达其内容，例如header、main、nav、aside等。语义化可以让代码更有可读性。

## meta viewport

> `<meta name="viewport" content="width=device-width，initial-scale=1.0>`
meta viewport是控制移动端不要缩小放大显示。

## canvas标签

> `<canvas>`是一个可以用脚本绘图的标签，用于绘制图标、绘图等功能。形象一点就是一个画布，可以用JS在上面绘图。

## 什么是H5

> H5是微信HTML5网页。

# CSS
## 盒模型

> 一个盒子从内到外具有 content、padding、border、margin组成。CSS有border-box和content-box两种盒模型。border-box模式下，盒子的宽高是四个要素加起来的，content-box模式下，盒子的宽高只是单单content的宽高。

## 居中
### 水平居中
>内联：在父元素上添加text-align:center；
块级：margin: 0 auto;

### 垂直居中
> 1.`<table>`元素自带其子元素`<td>`垂直居中
> 2.`line-hight`撑高
> 3.绝对定位+top:50%+负magrin（transform也可以）
> 4.flex布局直接居中
> 5.grid布局直接居中

## CSS选择器优先级

> 先看CSS引入位置，内联CSS>`<style>`标签>外联CSS，外联再看后来优先；
> 再看CSS选择器权重，id选择器>类、伪类、属性选择器>元素、伪元素选择器；
> `!important`吊打一切优先级（慎用）；

## 什么是BFC

> 全称“块格式化上下文”，触发了BFC的元素，其内部的元素定位将不再影响外部的。
> 举例来说，使用overflow:hidden后清除了浮动，也可以取消父子margin合并。

## 清除浮动

> 方法一：overflow:hidden（慎用）
> 方法二：添加`class="clearfix"`（推荐）
``` css
.clearfix::after{
  content: '';
  display: block;
  clear: both
}
```

## flex布局
### 容器
> `display:flex` flex意为弹性布局。
> `flex-direction:row | row-reverse | column | column-reverse` 主轴方向
> `flex-wrap:nowrap | wrap | wrap-reverse` 主轴是否换行
> `justify-content:flex-start | flex-end | center | space-between | space-around ` 主轴对齐
> `align-items:flex-start | flex-end | center | baseline | stretch` 次轴对齐

### 项目
> flex的子元素就是flex项目
> `order:<integer>` 排序顺序
> `flex:1` 撑开
> `align-self:auto | flex-start | flex-end | center | baseline | stretch` 在次轴方向上自己对齐

## grid布局

> `display:grid`grid意为栅格布局。grid布局用法多样，语言难以阐述其功能的强大。


# HTTP协议
## HTTP状态码
### 1xx 继续
>100 Continue
### 2xx 没有问题
>200 请求成功
>204 无返回内容
### 3xx 进一步操作
>301 永久重定向
>302 临时重定向
>304 没有变更
### 4xx 客户端出错
>400 请求有误
>401 需要用户验证
>403 拒绝访问
>404 请求失败
>408 请求超时
>414 请求过长
### 5xx 服务器出错
>500 服务器错误
>502 内部错误

## HTTP缓存
### 无HTTP请求
`Cashe-control : max-age=600` 缓存600秒后过期
`Expire`用日期记录，但是依照的是客户端本地时间，客户端更改时间将会保留缓存
### 有HTTP请求
`ETag`每次请求时请求头携带ETag，服务器检查Etag是否变化，没有变化则返回304

## GET和POST的区别
>POST比GET安全（F）都不安全(T)
>GET有长度限制(F) 都有长度限制（T）
>GET参数在URL，POST参数在消息体(F) 可以对调的(T)
>其实本质没区别，只是语义不同，GET获取，POST修改

## Cookie和Session
>Cookie是服务器给浏览器的一段字符串，浏览器每次访问服务器都会带上Cookie，Cookie保存在浏览器。
>Session基于Cookie，Cookie内会有一个Session-ID，服务器通过这个Session-ID来判断浏览器。

## LocalStorage 和 SessionStorage
>LocalStorage是存在浏览器本地的数据
>存储大小比Cookie要大，Cookie最大差不多4K，LocalStorage最大差不多5M
>SessionStorage的有效期和LocalStorage不同。

## HTTP/2和HTTP/1.1的区别
>HTTP/2 二进制格式
# 其他
## 浏览器内核
>Trident:IE、360、百度
>Gecko:firefox火狐浏览器
>webkit:Safari浏览器、Chrome
>blink:Chrome、Opera