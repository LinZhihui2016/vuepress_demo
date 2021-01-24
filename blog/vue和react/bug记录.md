> 奇葩的bug们

# element-select 与 scale
## bug描述
在一个组件的初始化的时候，css给入场动画
``` css
@keyframes show {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```

``` js
//element select mounted
    if (reference && reference.$el) {
        const sizeMap = {
          medium: 36,
          small: 32,
          mini: 28
        };
        const input = reference.$el.querySelector('input');
        this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.selectSize];
      }
```
将导致该组件内部的element的select在多选的情况下初始化出现高度问题呢
input默认1倍高度为32px，动画0%的scale倍数将导致input的高度跟随scale倍数变化。即scale(0.5)的情况下，select多选的不选值的时候，框的高度变为16px，scale(2)就是64px。
## 解决方案
0%改为1%即可
>补充
改初始百分比依旧不稳定，不定时还是会触发

# element-select 与 chrome
## bug描述 
当chrome调整了页面比例时，select的下拉可能出现位置闪烁
> 在crm的dialog中，dialog为fixed布局，select的下拉框便是fixed嵌套了fixed，于是下拉框的抖动传染给了dialog。

## 个人猜测
chrome在调整了页面大小后，本来CSS设置了100vh的html出现了滚动条，fixed的基准发生了偏差。
element-ui的issues里囤积了多个关于这个的反馈，依旧没有解决问题。有人提出了hack方案，但担心出现引发其他bug，故暂不考虑。
