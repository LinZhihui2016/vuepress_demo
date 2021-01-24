> 学习vue的路上，遇到坑，自己填。填完还得记笔记。

# vue-cli初始化操作
## 安装node-sass
`cnpm i -D node-sass`
`./build/webpack.base.conf.js`内`rules`添加
```javascript
{
    test:  /\.scss$/,
    loaders: ["style", "css", "sass"]
}
```

## 修改build绝对路径
`./config/index.js`内修改`build`内的
```javascript
assetsPublicPath: './'
```
# Axios
## POST默认传参是字符串
引入"qs"模块
``` javascript
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

# 其他
## element图标丢失
原因：字体文件太大
解决：修改`/build/webpack.base.conf.js`内的fonts的limit，改到比字体文件大即可。

## element-ui的导航插件
```html
<el-menu unique-opened @select="onClick">
  <el-submenu v-for="(topNav,index1) in data" :key="topNav.top" :index="index1+''">
    <template slot="title">
      <span>{{topNav.top}}</span>
    </template>
    <el-menu-item-group>
      <el-menu-item
        v-for="subNav in topNav.route"
        :key="subNav.title"
        :index="subNav.route"
      >{{subNav.title}}</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
```
```js
{
  methods:{
    onClick(index) {
      this.$router.push({ path: index }).catch(() => {})
    }
  }
}
```