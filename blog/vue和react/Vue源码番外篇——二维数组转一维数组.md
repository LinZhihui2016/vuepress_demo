> VUE源码中学到了一个小技巧

# 代码
```js
// vue\core\vdom\helpers\normalize-children.js 第18行
export function simpleNormalizeChildren (children: any) {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}
```
这个方法能将二维数组转一维数组，第一次看到这里的时候，这个`Array.prototype.concat.apply([], children)`太迷了。为了搞清这8行代码，开始测试
```js
Array.prototype.concat.apply([12],[1,[2]]) //[12,1,2]
[12].concat([1,[2]])  //[12,1,[2]]
```
这个就太诡异了。

其实这里就已经错了，我下意识的认为了`apply([12],[1,[2]])`会等效`concat([1,[2]])`，这里的`apply`应该是`concat(1,[2])`

```js
[12].concat(1,[2])  //[12,1,2]
Array.prototype.concat.apply([12],[1,[2]]) //[12,1,2]

[12].concat([1,[2]])  //这个其实是call
Array.prototype.concat.call([12],[1,[2]]) //[12,1,2]
```