> 终于到了手动配置webpack的时候到了，奥利给！

## 初始化
> 万事不离npm，先初始化package.json吧
``` bash
mkdir webpack-demo
cd webpack-demo
npm init -y 
npm i -D webpack webpack-cli vue
```
>创建src文件夹和入口文件
``` bash
touch index.html
mkdir src
touch ./src/index.js
```
>webpack初始化
```
cd ../
npx webpack init 
```
>此时提示要安装@webpack-cli/init 输入yes
安装后重新执行npx webpack init
``` bash
npx webpack init
? Will your application have multiple bundles?(y/N) 
yes
? What do you want to name your bundles?(separated by comma) 
index
? What is the location of "index"? 
src/index
? In which folder do you want to store your generated bundles? 
dist
? Will you use one of the below JS solutions?
ES6
? Will you use one of the below CSS solutions?
SASS
? Overwrite package.json?
y
? Overwrite src\index.js?
y
```
>一顿操作猛如虎，英语不好啥都看不懂（也就第一句理解不了）
>慢慢等webpack init，这里由于要安装node-sass，基本要挂的，该fq的fq，该换源的换源吧。 
## plugin和loader
>这里安装之后，不要急着npm run start，webpack.config.js需要一些修改

>`html-webpack-plugin`
>这个插件是用来加载html文件的，默认设置下无法加载到我们index.html的，需要手动配置
``` js
module.exports = {
	plugins: [
		//其他plugins
		new HtmlWebpackPlugin({
			template: 'index.html'
		})
	],
}
```
>在src下建立一个vue文件
``` bash
touch ./src/Hello.vue
```
``` html
<!--Hello.vue-->
<template>
  <div>{{msg}}</div>
</template>
```
```js
//Hello.vue
export default {
  data() {
    return {
      msg: "Hello World"
    };
  }
};
```
```js
//index.js
import Vue from 'vue'
import Hello from './Hello.vue'
let div = document.createElement('div')
div.id = 'app'
document.body.appendChild(div)
new Vue({
  el: div,
  render: h => h(Hello)
})
```
>此时，由于引入了.vue文件，webpack就需要vue-loader
``` bash
npm i -D vue vue-loader vue-template-compiler
```
```js
//webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	plugins: [
		//其他plugins
		new VueLoaderPlugin(),
	],
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				esModule: true
			}
		},
		//...其他rules
		]
	},
}
```
>一波又一波的大红特红，提示没有安装babel-loader
```
npm i -D babel-loader @babel/core babel-plugin-syntax-dynamic-import @babel/preset-env
```

## production环境和development环境
>prod环境下打包出来是压缩后的文件
>复制一份webpack.config.js并命名webpack.prod.js
``` bash
cp webpack.config.js webpack.prod.js
```
```js
//webpack.prod.js
module.exports = {
	mode: 'production'
	//...
}
```
```js
//package.json
  "scripts": {
    "build:dev": "webpack",
    "build":"webpack --config webpack.prod.js",
    "start": "webpack-dev-server"
  },
```

## TypeScript
>在src下建一组文件
```
touch ./src/index.ts
touch ./src/shims-vue.d.ts
```
``` ts
//index.ts
let a :number = 5
export const b = 1
```
```js
//index.js
import {b} from './index'
console.log(b)
```
>此时没有ts-loader，上ts-loader
```
npm i -D ts-loader typescript
touch tsconfig.json
```
```js
//webpack.config.js
module.exports = {
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			loader: 'ts-loader',
			options: {
				appendTsSuffixTo: [/\.vue$/]
			}
		},
		//...其他rules
		]
	},
}
```

```JSON
//tsconfig.json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```
```ts
//shims-vue.d.ts
declare module '*.vue'{
  import Vue from 'vue'
  export default Vue
}
```
>这个时候已经成功打印了b
可以将原来的index.js写成index.ts了
```ts
//index.ts
import Vue from 'vue'
import Hello from './Hello.vue'
let div = document.createElement('div')
div.id = 'app'
document.body.appendChild(div)
new Vue({
  el: div,
  render: h => h(Hello)
})
```
```js
//webpack.prod.js && webpack.config.js
module.exports = {
	entry: {
		index: './src/index.ts'
	},
}
```
>挖塞，总算没有红色了。

### 总结
>配置一次webpack，命要掉半条。
>亮一下这次的package.json，记录一下版本号
```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "My webpack project",
  "main": "index.js",
  "scripts": {
    "build:dev": "webpack",
    "build": "webpack --config webpack.prod.js",
    "start": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.6.4",
    "@babel/preset-env": "^7.6.3",
    "babel-loader": "^8.0.6",
    "babel-plugin-syntax-dynamic-import": "^6.18.0",
    "html-webpack-plugin": "^3.2.0",
    "ts-loader": "^6.2.1",
    "typescript": "^3.6.4",
    "vue": "^2.6.10",
    "vue-loader": "^15.7.2",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.9.0"
  }
}

```
