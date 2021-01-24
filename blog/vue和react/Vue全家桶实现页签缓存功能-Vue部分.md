> vue+vue-router+vuex实现页面页签缓存功能。


## 创建项目
### Vue初始化
``` bash
vue create .
yarn 
```
把不需要的都删掉，重新建立文件夹结构。
### 文件夹结构
>src
|-- componets
|---- Aside.vue       
|---- Header.vue
|---- Tabs.vue            //页签组件
|-- router
|---- index.js
|-- store
|---- index.js
|-- views
|---- BIZ
|------ Home.vue          //页签内的主页
|------ TestA.vue         //测试A
|------ TestB.vue         //测试B
|------ TestC.vue         //测试C
|------ 其他缓存的页面.vue
|---- SYS
|------ Login.vue         //登陆页，不缓存
|------ Main.vue          //Main页面
|------ 其他不缓存的页面.vue
|-- main.js               //js主入口
|-- App.vue               //vue主入口

其他webpack配置、css、静态文件这里就不展示了

## 文件分析
### App.vue
``` html
<template>
  <div id="app">
    <keep-alive>
      <!-- 这里必须用keep-alive缓存 -->
      <router-view/>
    </keep-alive>
  </div>
</template>
```
并没有什么特殊的地方，`keep-alive`包裹`router-view`就可以
这里如果不使用`keep-alive`的话，如果跳转到其他不在页签内缓存的页面，会使主页签缓存消失。

### main.js
没额外变化，不展示
### router/index.js
``` js
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index.js';

Vue.use(VueRouter);
const index = [
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/BIZ/Home.vue'),
    meta: {
      keepAlive: true,
      title:'首页'
    },
  },{
    path:'a',
    name:'testa',
    component:()=>import('@/views/BIZ/TestA.vue'),
    meta: {
      keepAlive: true,
      title:'测试A'
    },
  },{
    path:'b',
    name:'testb',
    component:()=>import('@/views/BIZ/TestB.vue'),
    meta: {
      keepAlive: true,
      title:'测试B'
    },
  },{
    path:'c',
    name:'testc',
    component:()=>import('@/views/BIZ/TestC.vue'),
    meta: {
      keepAlive: true,
      title:'测试C'
    },
  }
];


const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/SYS/Login.vue'),
    },
    {
      name: 'main',
      component: () => import('@/views/SYS/Main.vue'),
      path: '/',
      children: [...index],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.keepAlive) {
    // ? 只有带keepAlive的路由不会被缓存
    store.dispatch('add_cache', {
      route_name: to.name,
      route_query: to.query,
      tab_title: to.meta.title,
    });
  }
  next();
});

export default router;

```

### store/index.js
```js
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import router from '../router/index';

const TAB_MAX = 10;

export default new Vuex.Store({
  state: {
    keepAlive_include: [{ route_name: 'home', tab_title: '首页' }],
  },
  getters: {
    include: state => state.keepAlive_include,
  },
  mutations: {
    add_keepAlive_include(state, item) {
      const current_route_name = item.route_name;
      const is_exist = state.keepAlive_include.findIndex(
        route => route.route_name === current_route_name,
      );
      if (is_exist > -1) {
        //* 如果数组里存在该路由
        return;
      }
      //* 如果数组里不存在该路由，push进数组
      if (state.keepAlive_include.length === TAB_MAX) {
        //* 如果数组长度等于10，推出第2个
        state.keepAlive_include.splice(1, 1);
      }
      state.keepAlive_include.push(item);
    },
    delete_keepAlive_include(state, payload) {
      const { index, route_name } = payload;
      if (route_name === state.keepAlive_include[index].route_name) {
        // ? 关闭的是当前路由
        let jump;
        if (index === state.keepAlive_include.length - 1) {
          // ? 当前路由是最后一个
          jump = state.keepAlive_include[index - 1];
        } else {
          // ? 当前路由不是最后一个
          jump = state.keepAlive_include[index + 1];
        }
        router.push({ name: jump.route_name, query: jump.route_query });
      }
      state.keepAlive_include.splice(index, 1);
    },
    save_keepAlive(state) {
      window.localStorage.setItem(
        'crm_tabs',
        JSON.stringify(state.keepAlive_include),
      );
    },
  },
  actions: {
    add_cache({ commit }, item) {
      commit('add_keepAlive_include', item);
      commit('save_keepAlive');
    },
    delete_cache({ commit }, payload) {
      commit('delete_keepAlive_include', payload);
      commit('save_keepAlive');
    },
  },
})


```

### views/SYS/Main.vue

``` html
<template>
  <div id="app">
    <Aside></Aside>
    <Header>
      <!-- 记得在header里加slot -->
      <router-tabs></router-tabs>
    </Header>
    <main>
      <keep-alive  :include="$include">
        <router-view></router-view>
      </keep-alive>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Aside from '@/components/Aside.vue';
import Header from '@/components/Header.vue';
import routerTabs from '@/components/Tabs.vue';

export default {
  components: {
    Aside,
    Header,
    routerTabs,
  },
  computed: {
    ...mapGetters(['include']),
    $include() {
      // include是个对象数组，应当提取出其中的route_name
      return this.include.map(i => i.route_name);
    },
  },
};
</script>
```

### components/Tabs.vue

``` html
<template>
  <div class="tabs-container">
    <transition-group :css="false" tab="ul">
      <li
        v-for="(tab, index) in include"
        :key="tab.route_name"
        :class="{ active: tab.route_name === $route.name }"
        @click="onClick(tab)"
      >
        <span>
          {{ tab.tab_title }}
        </span>
        <i
          @click.stop="onClose(index)"
          v-if="tab.route_name !== 'home'"
        >X</i>
      </li>
    </transition-group>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default Vue.extend({
  computed: {
    ...mapGetters(['include']),
  },
  methods: {
    ...mapActions(['delete_cache']),
    onClick(tab) {
      const { route_name, route_query } = tab;
      //无视点击本页面的页签
      if (route_name !== this.$route.name) {
        this.$router.push({ name: route_name, query: route_query }).catch();
      }
    },
    onClose(index) {
      this.delete_cache({
        index,
        route_name: this.$route.name,
      });
    },
  },
});
</script>

```

## CSS美化页面
在这些文件下，目前没有任何CSS，已经可以渲染出基本功能。CSS部分就自己看着办吧。