> JS的数组是一种特殊的对象，数组的__proto__会先指向Array.prototype，而Array.prototype.__proto__则再指向了Object.prototype。这里简单的记录下Array.prototype里关于数组的基本方法。数组的定义和python中的数组基本一致，但由于依靠的类似字典的对象，出现了很多比python数组要坑的事情。例如数组的长度问题，for in的遍历问题。


# 数组的普通方法
## 先准备一些普通的数组
```JavaScript
var arr1 = [2,3,4]
var arr2 = ['CHINA','USA','UK']
```
## isArray
如果用`typeof`来判断数组，返回的是`object`。那么要正确判断数组，就要用`isArray`方法。
```JavaScript
Array.isArray(arr1) //true
```

## push() & pop()
`push()`方法就是python的append方法，在数组的末端添加一个元素；`pop()`甚至名字都一样，删除数组最后一个元素，并返回改元素。
```JavaScript
arr2.push('CANADA') // ['CHINA','USA','UK','CANADA']
arr2.pop() // 返回'CANADA'，并且删除了'CANADA'
```

## shift() & unshift()
`shift()`和`unshift()`则是`push()`和`pop()`翻版，改变的是数组的第一个元素。`shift()`返回该元素，`unshift()`的返回值是数组的新长度。
```JavaScript
arr2.shift() // 返回'CHINA'
arr2.unshift('CHINA') //返回3
```
## join()
`join()`方法的参数是一个字符串，将所有元素中间插入该字符串，再返回成一个大字符串，默认是`,`。
```JavaScript
arr1.join('abc') // '2abc3abc4'
arr1.join() // '2,3,4'
```

## concat()
`concat()`方法就是直接是python的`+`而已。***python大法好***。
```JavaScript
arr1.concat(arr2) // [2,3,4,'CHINA','USA','UK']
// python只需要 arr1+arr2
arr1.concat(2,2,2) // [2,3,4,2,2,2]
```

## reverse()
`reverse()`和python一样，反向抽烟赛神仙。会直接更改原数组。
```JavaScript
arr2.reverse() //arr2=[ 'UK', 'USA', 'CHINA' ]
```

## slice()
`slice(start,end)`切片，python的[：]而已，js真麻烦。***python大法好***。
```JavaScript
arr1.slice(0,2) //[2,3]
arr1.slice(1) // 就一个参数就是一刀切到结束[3,4] 
arr1.slice() //没有参数就直接深拷贝
```
## splice()
`splice(start,count,new1,new2,……)`从start删除到count，然后再从start位置插入new1,new2……。返回的是删除掉的部分。
```JavaScript
arr1.splice(1,2,'456','ssss') //返回的是[3,4]
console.log(arr1) // [2,'456','ssss']
arr2.splice(1,0,'CANADA') //第二个参数取0则是插入了'CANADA'
arr2.splice(2) //就一个参数则是在该位置拆开数组
```
## indexOf()
`indexOf()`查找元素，只能找到第一次出现的位置。`lastIndexOf()`则找到最后一次的位置。

# 数组稍微难的方法
数组有些方法参数可以是函数的，比较难理解。
## sort()
`sort()`方法可以对数组进行排序，默认是按照字典排序。但`sort()`的参数可以用函数来让数组根据某种算法来排序。
该函数必须接受2个参数，返回的值如果是正值，则表示第一个参数排在第二个参数后；反之就是第一个参数在第二个参数之前。
```JavaScript
a = ['中国','巴西','日本','美国']
b = {'中国':13,'美国':3,'日本':1,'巴西':2}
pop = function(x,y){return b[x]-b[y]}
a.sort(pop) //[ '日本', '巴西', '美国', '中国' ]
```

## map()
`map()`同样需要接受一个函数，可以将数组里的每一个元素执行一次参数里的函数，再返回新的数组。该函数可以接受3个参数，分别是当前元素，当前元素下表，数组本身。
```JavaScript
arr1.map(function(x){return x*2}) // [4,6,8]
arr1.map(x=>x*2) //骚操作
arr1.map(function(ele,index,arr){console.log(ele,index,arr)})
// 2 0 [2,3,4]
// 3 1 [2,3,4]
// 4 2 [2,3,4]
```
`map()`还可以接受第二个参数，用来绑定第一个参数函数的`this`。

## forEach()
`forEach()`和`map()`用法一样，差别在于`forEach()`不返回任何值。

## filter()
`filter()`接受一个函数，遍历每一个元素，返回一个函数返回值为`true`的元素组成一个新的数组。该函数同样可以接受3个参数，`filter`也可以接受第二个参数来绑定`this`。
```JavaScript
[1,2,3,4,5,6,7,8].filter(ele=>ele %2 ===0)
// [2,4,6,8]，只有偶数才通过函数过滤
```
## some() & every()
这2个函数同样都接受一个三参数的函数和`this`，参数函数遍历每一个元素，返回`true`和`false`。`some()`只要有一个元素返回了`true`，则返回`true`；`every()`必须是全元素返回`true`才返回`true`。
```JavaScript
arr1.some(ele=>ele %2 ===0) //因为2,4返回true,则some返回了true
[2,4,6].every(ele=>ele %2 ===0) //全部true，我就true
```

## reduce()
`reduce()`的参数函数有4个参数，第一个参数代表上一次的返回值，第二个参数代表下一个元素，也就是元素全部迭代，三四参数跟上面的方法一样。`reduce()`的第二个参数是初始值。还有一个兄弟方法`reduceRight()`就是反向迭代。
```JavaScript
arr1 = [2,3,4]
arr1.reduce(function(a,b){return a*b})
// 第一步 2*3=6 
// 第二步 6*4=24
```