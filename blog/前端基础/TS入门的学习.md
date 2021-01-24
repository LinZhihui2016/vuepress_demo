> 前端不学TS，不如回家种红薯。不要问，问就是TS是爸爸。

# VSCode环境配置

## 安装ts和ts-node
```js
//npm install typescript -g
//npm install ts-node -g
```
用npm安装？脑子秀逗了吧。
```
yarn global add typescript
yarn global add ts-node
```
## VSCode的调试配置
创建配置文件
```
mkdir .vscode
cd .vscode
touch launch.json
touch tsconfig.json
```
launch.json
```json
{
  "configurations": [
    {
      "name": "ts-node",
      "type": "node",
      "request": "launch",
      "program": "/ts-node/dist/bin.js",//ts-node下的dist/bin.js路径
      "args": ["${relativeFile}"],
      "cwd": "${workspaceRoot}",
      "protocol": "inspector"
    }
  ]
}
```
tsconfig.json
```json
{
  "compilerOptions": {
    "lib": ["es2015", "dom", "es2016", "es2017", "es2018"],
  }
}
```
# 前置知识
## 基本类型
### Boolean
>boolean小写！
```ts
let bool: boolean = false
```
### Number
>小写！小写！小写！
```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```
### String
```ts
let hello: string = 'world'
```
### Array
>数组内部貌似只能锁死一种类型(存疑)
```ts
let list: number[] = [1,2,3]
let str: string[] = ['a','b','c']
//或者
let list: Array<number> = [1,2,3];//吃柠檬，这里整一个大写
```
### Tuple
```ts
let x:[string,number] = ['1',1] //不可调换
let x:[string,number] = [1,'1'] //作死
x[3] = 2; //不可以再赋值
console.log(x[3]) //无法输出
```
### Enum
```ts
enum Color {
  Red,
  Green,
  Blue
}
let a: Color = Color.Green //a = 1
let b: string = Color[2] //b = Blue

enum Color {
  Red = 1,
  Green = 3,
  Blue 
}
let c: Color = Color.Green //c = 3
let d: string = Color[4] //Blue
```
### Interface
```ts
interface Person {
  gender: string
}
let a: Person = { gender: 'male' } //OK,拥有gender属性，并且键值为string
let b: Person = { gender: 123 } //Error,拥有gender属性，但键值类型错误
let c: Person = { age: 25 } //Error,压根就不具备Person的要求
```
### Enum和Interface配合
```ts
enum Gender {
  Male,
  Female
}

interface Person {
  gender: Gender
}
function merry(a: Person, b: Person): Array<number> {
  return [a.gender, b.gender]
}

let a = { gender: Gender.Male }
let b = { gender: Gender.Female }
console.log(merry(a, b)); //[0,1]
```

### Object
>爸爸终于来了,除了number，string，boolean，symbol，null，undefined，剩下都是object爸爸管辖的。

### Any
>用多了宛如废物
### void | null | undefined | never
>4个咸鱼兄弟