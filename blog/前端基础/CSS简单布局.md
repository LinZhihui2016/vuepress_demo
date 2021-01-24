> 文档流使得元素排版布局过程中，元素会默认自动从左往右，从上往下的流式排列方式。并最终窗体自上而下分成一行行，并在每行中从左至右的顺序排放元素。这就导致了想完成较复杂的纵横布局，就需要各种CSS的配合，主要还是依靠float、position、flex以及grid实现。

# 横向布局
## float左右布局
利用float完成左右布局，由于用了float出现了父元素高度崩塌，要用clearfix解决。
```HTML
 <div class="father clearfix">
    <div class="son-left">1</div>
    <div class="son-right">2</div>
  </div>
```
```CSS
.father {
  border:5px black solid;
  background: #ccc;
}
.son-left {
  background: pink;
  float:left;
  height: 100px;
  width: 40%;
}
.son-right {
  background: skyblue;
  float:right;
  height: 200px;
  width: 60%;
}
.clearfix::before,::after {
    content: '';
    display: block;
}
.clearfix:after {
    clear: both;
}
```

## 绝对定位左中右布局

左右用position: absolute，中间容器左右margin。
absolute元素会向上寻找一个不是static的元素作为基准。
所以这里父元素需添加position: relative/absolute/fixed。
```HTML
<div class="father">
  <div class="son-left">1</div>
  <div class="son-middle">2</div>
  <div class="son-right">3</div>
</div>
```
```CSS
.father {
  border:5px black solid;
  background: #ccc;
  position: relative;
}
.son-left {
  background: pink;
  position: absolute;
  left:0;
  top:0;
  height: 100px;
  width: 100px;
}
.son-right {
  background: skyblue;
  position: absolute;
  right:0;
  top:0;
  height: 100px;
  width: 100px;
}
.son-middle {
  margin-left:100px;
  margin-right:100px;  
  height: 100px;
  background: hotpink;
}
```
# 水平居中&垂直居中
## margin：auto
子元素是block，并且有自己的宽度才能使用，仅能水平居中。
```HTML
<div class="father">
  <div class="son">2</div>
</div>
```
```CSS
.father {
  border:5px black solid;
  background: #ccc;
}
.son {
  margin:auto;
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
}
```
## 父元素text-align:text
子元素只能是inline和inline-block，仅能水平居中。
```CSS
.father {
  border:5px black solid;
  margin:100px;
  background: #ccc;
  text-align:center;
}
.son {
  display:inline-block;
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
}
```
## relative+transform
利用left：50%和top：50%，再用transform: translate(-50%,-50%)回调，就可以双居中。

```CSS
.father {
  border:5px black solid;
  background: #ccc;
  height: 300px;
}
.son {
  position: relative;
  top:50%;
  left:50%;
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
  transform: translate(-50%,-50%)
}
```
## absolute+margin:auto
给四个方向都加上0的定位，再margin：auto便可以居中，不过子元素只能是absolute/fixed。
要写很多东西，比较难用。

``` CSS
.father {
  border:5px black solid;
  position: relative;
  background: #ccc;
  height:500px;
}
.son {
  position: absolute;
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
  top:0;
  left:0;
  bottom:0;
  right:0;
  margin:auto;
}
```
## flex布局
父元素使用flex布局，然后让其内部item水平居中和垂直居中。

```CSS
.father {
  border:5px black solid;
  background: #ccc;
  height:500px;
  display: flex;
  align-items:center;
  justify-content:center;
}
.son {
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
}
```

## grid布局
和flex布局类似。
```CSS
.father {
  border:5px black solid;
  background: #ccc;
  height:300px;
  display: grid;
  place-items:center;
}
.son {
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
}
```

# 其他
## clear:both清除浮动
由于浮动，浮动的脱标，父元素失去高度出现崩塌，父元素之后的元素也会紧跟着浮动，利用clear:both来解决。
```
代码见1.左右布局
```


# 横向布局
## float左右布局
利用float完成左右布局，由于用了float出现了父元素高度崩塌，要用clearfix解决。
```HTML
 <div class="father clearfix">
    <div class="son-left">1</div>
    <div class="son-right">2</div>
  </div>
```
```CSS
.father {
  border:5px black solid;
  background: #ccc;
}
.son-left {
  background: pink;
  float:left;
  height: 100px;
  width: 40%;
}
.son-right {
  background: skyblue;
  float:right;
  height: 200px;
  width: 60%;
}
.clearfix::before,::after {
    content: '';
    display: block;
}
.clearfix:after {
    clear: both;
}
```

## 绝对定位左中右布局

左右用position: absolute，中间容器左右margin。
absolute元素会向上寻找一个不是static的元素作为基准。
所以这里父元素需添加position: relative/absolute/fixed。
```HTML
<div class="father">
  <div class="son-left">1</div>
  <div class="son-middle">2</div>
  <div class="son-right">3</div>
</div>
```
```CSS
.father {
  border:5px black solid;
  background: #ccc;
  position: relative;
}
.son-left {
  background: pink;
  position: absolute;
  left:0;
  top:0;
  height: 100px;
  width: 100px;
}
.son-right {
  background: skyblue;
  position: absolute;
  right:0;
  top:0;
  height: 100px;
  width: 100px;
}
.son-middle {
  margin-left:100px;
  margin-right:100px;  
  height: 100px;
  background: hotpink;
}
```
# 水平居中&垂直居中
## margin：auto
子元素是block，并且有自己的宽度才能使用，仅能水平居中。
```HTML
<div class="father">
  <div class="son">2</div>
</div>
```
```CSS
.father {
  border:5px black solid;
  background: #ccc;
}
.son {
  margin:auto;
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
}
```
## 父元素text-align:text
子元素只能是inline和inline-block，仅能水平居中。
```CSS
.father {
  border:5px black solid;
  margin:100px;
  background: #ccc;
  text-align:center;
}
.son {
  display:inline-block;
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
}
```
## relative+transform
利用left：50%和top：50%，再用transform: translate(-50%,-50%)回调，就可以双居中。

```CSS
.father {
  border:5px black solid;
  background: #ccc;
  height: 300px;
}
.son {
  position: relative;
  top:50%;
  left:50%;
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
  transform: translate(-50%,-50%)
}
```
## absolute+margin:auto
给四个方向都加上0的定位，再margin：auto便可以居中，不过子元素只能是absolute/fixed。
要写很多东西，比较难用。

``` CSS
.father {
  border:5px black solid;
  position: relative;
  background: #ccc;
  height:500px;
}
.son {
  position: absolute;
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
  top:0;
  left:0;
  bottom:0;
  right:0;
  margin:auto;
}
```
## flex布局
父元素使用flex布局，然后让其内部item水平居中和垂直居中。

```CSS
.father {
  border:5px black solid;
  background: #ccc;
  height:500px;
  display: flex;
  align-items:center;
  justify-content:center;
}
.son {
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
}
```

##grid布局
和flex布局类似。
```CSS
.father {
  border:5px black solid;
  background: #ccc;
  height:300px;
  display: grid;
  place-items:center;
}
.son {
  width: 100px;
  height: 100px;
  border:1px red solid;
  background-color: pink;
}
```

# 其他
## clear:both清除浮动
由于浮动，浮动的脱标，父元素失去高度出现崩塌，父元素之后的元素也会紧跟着浮动，利用clear:both来解决。
```
代码见1.左右布局
```


