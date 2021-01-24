> vue源码中

# 前言
本文将记录vue源码内的各种util的用法和解释

记录顺序为解读过程中遇到的顺序，部分简单的util将不进行记录

## hasOwn
这个obj对象是否拥有这个key
```js
// vue\src\shared\util.js 第146行
export function hasOwn (obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}
```
## isReserved
这个字符串str是否是 $ 或 _ 开头
```js
// vue\src\core\util\lang.js 第13行
export function isReserved (str: string): boolean {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}
```

## noop
用来对付Flow的类型检测，本质就是`()=>{}`
```js
// vue\src\shared\util.js 第258行
export function noop (a?: any, b?: any, c?: any) {}
```

## bind
指定函数的this，本质就是fn.bind(this)
```js
// vue\src\shared\util.js 第193行
function polyfillBind (fn: Function, ctx: Object): Function {
  function boundFn (a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length
  return boundFn
}

function nativeBind (fn: Function, ctx: Object): Function {
  return fn.bind(ctx)
}

export const bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind
```

## hyphenate
将驼峰字符串转为-字符串 （abcDef => abc-def）
```js
// vue\src\shared\util.js 第179行
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
```

## isReservedAttribute
检查字符串是否是关键字`key,ref,slot,slot-scope,is`
```js
// vue\src\shared\util.js 第128行
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')
```

## makeMap
将传入的str通过“,”分隔，检查某个字符串是否属于这个数组中
```js
// vue\src\shared\util.js 第106行
export function makeMap (
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}
```

## remove
数组删除某个元素
```js
// vue\src\shared\util.js 第133行
export function remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```
