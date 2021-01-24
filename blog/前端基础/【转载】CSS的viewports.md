> 简单的记录一下Viewport的知识点，以及各个相关的尺寸。

>Viewport的知识点较多，该文章清楚介绍了这方面的知识。
>著作权归原作者所有。
>商业转载请联系原作者获得授权,非商业转载请注明出处。
>原文: https://www.w3cplus.com/css/viewports.html 
> © w3cplus.com

# 相关的尺寸
## 屏幕尺寸 Screen size
`screen.width/height`指的是用户设备屏幕的完整大小，这个尺寸是设备的pixels，是显示器的属性。在前端工作中没有用处。
## 浏览器尺寸 Window size
`window.innerWidht/Height`指的是浏览器页面的大小，**包含滚动条**但不包括菜单栏等。它定义了CSS的布局区域。当用户放大缩小浏览器窗口时，数值会跟随变化。
## 滚动移位 Scrolling offset
`window.pageX/YOffset`指的是页面的位移，定义了页面相对于窗口的水平、垂直位移。体现出来的就是滚动条的位置。
## 视窗大小 document.documentElement
`document.documentElement.clientWidth/Height`可以获取到viewport的尺寸。viewport就是浏览器的窗口宽度高度，`<HTML>`的宽度就是viewpoint宽度的100%。

当`<body>`的宽度为`width: 10%`时，默认是按父元素`<html>`的10%。`<html>`的宽度就是浏览器的宽度。当宽度设置为`width: 100%`，`<body>`的宽度就是浏览器的宽度。但是，当窗口比例放大到一定程度的时候，`<html>`的宽度依旧是浏览器的宽度，但由于画面被放大，`<body>`在视觉上就达不到原先的100%。
## document.documentElement.clientWidth/Height
`document.documentElement`指的就是`<html>`元素，但是有意思的是`document.documentElement.clientWidth/Height`只会给出viewport的尺寸，`<html>`尺寸为10%的时候也显示viewport的尺寸。`window.inner`比`documentElement`多了滚动条而已。

## html尺寸
`document.documentElement.offsetWidth/Height`指的是`<html>`的尺寸，如果给`<html>`赋值了尺寸，offset就会给出赋值的尺寸。

# 事件坐标
## pageX/Y
触发事件点到`<html>`原点的CSS距离
## clientX/Y
触发事件点到viewport原点的CSS距离
## screenX/Y
触发事件点到显示器设备远点的距离

# Media查询
可以根据页面的宽度来定义特殊的CSS。有两个相关的media查询：`width/height`和`device-width/device-height`。`width/height`使用的是`documentElement.clientWidth/Height`，也就是viewport的值。`device-width/device-height`使用的是`screen.width/height`，也就是设备的尺寸值。