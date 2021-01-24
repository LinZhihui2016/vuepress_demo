<template>
  <div>
    <ul>
      <li v-for="(group, k) in groupData" :key="k" class="menu-group">
        <header>
          <h2>{{ k }}</h2>
        </header>
        <transition-group :css="false" tag="ul" class="menu-group-list">
          <li
            v-for="item in group"
            :key="item.objectid"
            class="card nav-list-item"
          >
            <a :href="item.url" target="_blank">
              <img
                :src="item.icon"
                onerror="javascript:this.src='https://linzhihui.oss-cn-hangzhou.aliyuncs.com/personal-index/smile.png'"
              />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </transition-group>
      </li>
    </ul>
  </div>
</template>

<script>
const res = {
  guide: [
    {
      groupPri: 0,
      group: "guide",
      name: "CSS-多边形",
      icon: "https://css-tricks.com/apple-touch-icon.png",
      url: "https://css-tricks.com/the-shapes-of-css/",
      objectid: "5e770a6314de8e00084d9499",
    },
    {
      groupPri: 0,
      group: "guide",
      name: "Velocity",
      icon: "",
      url: "http://www.velocityjs.org/",
      objectid: "5e770a6214de8e00084d9497",
    },
    {
      groupPri: 0,
      group: "guide",
      name: "Flex布局",
      icon: "",
      url:
        "http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool",
      objectid: "5e770a6114de8e00084d9495",
    },
    {
      groupPri: 0,
      group: "guide",
      name: "Grid布局",
      icon: "",
      url: "http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html",
      objectid: "5e770a6014de8e00084d9494",
    },
    {
      groupPri: 0,
      group: "guide",
      name: "LeanCloud开发",
      icon: "https://leancloud.cn/apple-touch-icon.png",
      url: "https://tab.leancloud.cn/docs/leanstorage_guide-js.html",
      objectid: "5e770a5f14de8e00084d9491",
    },
    {
      groupPri: 0,
      group: "guide",
      name: "Mint-UI",
      icon:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE3NXB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTc1IDIwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy44LjIgKDI5NzUzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT7nu7/lj7ZAMXg8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMjU2LWNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MC4wMDAwMDAsIC0yOC4wMDAwMDApIiBmaWxsPSIjMjZhMmZmIj4KICAgICAgICAgICAgPGcgaWQ9Iue7v+WPtiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAuMDAwMDAwLCAyOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4zMDQ2ODgsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTgzLjcyOTQ4OTUsMTU1LjAxMTg3NiBDODIuMTA5MzUsMTUxLjY2MDE1OSA4MC4wMzY0ODA3LDE0Ny4xMTY3MTIgNzcuOTA3NTkzMiwxNDEuNzU1NTIgQzc1Ljc3ODcwNTcsMTQ0LjUwMzU5NyA3My40NTk2MzU3LDE0Ny4yNjc0MjMgNzAuOTU3NTYsMTUwLjA2MzU0NCBMNjYuOTk0NDI4MywxNTQuNTc1MDk1IEw2MS45NzQ1Mjc5LDE1Mi40NTQzOCBDNDcuMzA0MTYyNSwxNDYuMjY2ODcxIDQuNzYyMjk2MDksMTI1LjU4MzgyOSAwLjM3NzczMjYxNyw5Mi4xNzYzMDM1IEMtMi43NTk0ODA4Niw1Ny4zNzA5MTY2IDE3LjYwNTc5MzIsMzkuMDg2NDg2MSAxMC4yNDI5MDA0LDE5LjczNzcxMTcgQzM5Ljk0MTA3MDUsMjYuODM4NjU0OSA2My4zNTY0NDA4LDM4LjMzOTkxMDQgNzguMzM2NjAwMiw1My4wNTc5MjExIEMxMDEuODM5Mjg3LDIzLjA1NzkzMDkgMTMxLjk0Mjk0LDIxLjg4MjM0OCAxMzkuOTcyNjY4LDAgQzE5NS43MzkzOTMsNzcuOTQyNzE5OSAxODYuODQzMjc5LDE0OS4xODk5OCA5My44ODgzMDM5LDE2MC42NzQ4ODkgQzg2LjAyNTIzNTQsMTc1LjEzOTEyMyA3Ny4yNjQyODIsMTg4LjU3MDExMyA2Ny43NDA4MDQ5LDIwMCBMNTQuNzA2NzI2NiwxOTEuOTA2MjggQzY1Ljg4MjIzOTUsMTgxLjE3NTUyMyA3NS40NDU1ODczLDE2OC42NDk3OTQgODMuNzI5NDg5NSwxNTUuMDExODc2IEw4My43Mjk0ODk1LDE1NS4wMTE4NzYgTDgzLjcyOTQ4OTUsMTU1LjAxMTg3NiBaIE05Mi42OTcxNzE1LDExNi4xNzk3NjQgQzk0LjYzNTI3ODUsMTIxLjM5ODAyMSA5Ni42MjEwMzA3LDEyNS42MjM1IDk3Ljg5OTg3ODMsMTI4LjE4ODc3MSBDMTExLjQzNDUzMSw5OC44MDA1OTQ1IDEyMC42NzE5MzgsNjYuNjYzOTQyMiAxMjguMTE0MzcyLDM3LjA2OTAzNjkgQzEyMC4wOTIwMjEsNDUuNDA4OTU3MiAxMDQuNjM1NDA4LDQ4LjY2NTU4MyA5Mi41MzA1MTI3LDY1LjQzMjkzOTMgQzkxLjc2ODE4NzksNjYuNTc2NjI1OCA5MS4xMDA1NTU5LDY3Ljc2MDE4MjYgOTAuNTA1Mjg4Nyw2OC45Njc0NjI3IEM5OC4wNjY3MzY1LDgyLjk3MDU5NDUgOTkuMjI2MTcxOSw5OC45NDM3Mjk3IDkyLjY5NzE3MTUsMTE2LjE3OTc2NCBMOTIuNjk3MTcxNSwxMTYuMTc5NzY0IEw5Mi42OTcxNzE1LDExNi4xNzk3NjQgWiBNNTIuNjA5NzM1NCwxMjcuNzEyMzE4IEM0Ny40NjI4NDczLDk5LjA2Mjc0MzQgNDAuNTEyODE0MSw3Mi40MzgzOTI2IDI4LjM1MjQ5ODYsNDguODgwMDg2MyBMMjguMzUyNDk4Niw0OC44ODAwODYzIEM0MS4zMzA5NTc2LDY2Ljk5NzY1ODYgNTYuNDA2NDA3Niw5My4yNjQ1Njk5IDY0LjM5Njg2MjUsMTIyLjk5NDIzOCBDOTIuNDM1MDIyNyw4OS43NjE1NDQzIDc0LjA5NTE3MjEsNTQuOTQwMjA5MiAyMi4zODc0NjcsNDIuNTg5MzEyNSBDMjcuMTkyODYzOSw1NS4yMjY0Nzk3IDEzLjg4ODY2MjcsNjcuMTcyMjkxNiAxNS45Mzc4MDksODkuOTEyNjUzNSBDMTguOTU2MDA5LDExMi44NTkzNDYgNDQuNjI3MjU0NSwxMjQuNDg3Nzg4IDUyLjYwOTczNTQsMTI3LjcxMjMxOCBMNTIuNjA5NzM1NCwxMjcuNzEyMzE4IEw1Mi42MDk3MzU0LDEyNy43MTIzMTggWiBNMTA4Ljc4MTM0NiwxMjkuNjkwMjk2IEMxNTkuNzEwNTc5LDEyMC45MjEzNjggMTY1LjQ0NTE1OSw4MC42ODMwMjIzIDEzNS44MTA3ODEsMzUuNzkwMTg5MyBDMTMyLjAyOTg1OCw2Mi45NTQ1ODY1IDEyMi41OTM4OTcsOTcuMTg4MjI5OSAxMDguNzgxMzQ2LDEyOS42OTAyOTYgTDEwOC43ODEzNDYsMTI5LjY5MDI5NiBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+",
      url: "http://mint-ui.github.io/docs/",
      objectid: "5e770a5e14de8e00084d948f",
    },
    {
      groupPri: 0,
      group: "guide",
      name: "Animate.css",
      icon: "",
      url: "https://daneden.github.io/animate.css/",
      objectid: "5e770a5d14de8e00084d948e",
    },
    {
      groupPri: 0,
      group: "guide",
      name: "Anime.js",
      icon: "https://www.animejs.cn/documentation/assets/img/favicon.png",
      url: "https://www.animejs.cn/documentation/",
      objectid: "5e770a5c14de8e00084d948d",
    },
    {
      groupPri: 0,
      group: "guide",
      name: "Element-ui",
      icon:
        "https://camo.githubusercontent.com/462f24153b8e8739c8ea71f7102585c4cb0e1575/68747470733a2f2f63646e2e7261776769742e636f6d2f456c656d6546452f656c656d656e742f6465762f656c656d656e745f6c6f676f2e737667",
      url: "https://element.eleme.cn/#/zh-CN/component/installation",
      objectid: "5e770a5b14de8e00084d948b",
    },
    {
      groupPri: 0,
      group: "guide",
      name: "vue",
      icon: "https://cn.vuejs.org/images/logo.png",
      url: "https://cn.vuejs.org/v2/guide/",
      objectid: "5e770a5a14de8e00084d9489",
    },
    {
      groupPri: 0,
      group: "guide",
      name: "JavaScript手册",
      icon: "https://wangdoc.com/javascript/assets/icons/favicon-96x96.png",
      url: "https://wangdoc.com/javascript/",
      objectid: "5e770a5914de8e00084d9486",
    },
  ],
  code: [
    {
      groupPri: 1,
      group: "code",
      name: "Github代码管理",
      icon: "https://github.com/favicon.ico",
      url: "https://github.com/LinZhihui2016",
      objectid: "5e770a6f14de8e00084d94ab",
    },
    {
      groupPri: 1,
      group: "code",
      name: "买域名",
      icon: "https://www.namesilo.com/favicon.ico",
      url: "https://www.namesilo.com/account_domains.php",
      objectid: "5e770a6e14de8e00084d94a9",
    },
    {
      groupPri: 1,
      group: "code",
      name: "阿里巴巴矢量图标库",
      icon:
        "https://gtms04.alicdn.com/tps/i4/TB1_oz6GVXXXXaFXpXXJDFnIXXX-64-64.ico",
      url: "https://www.iconfont.cn/",
      objectid: "5e770a6d14de8e00084d94a8",
    },
    {
      groupPri: 1,
      group: "code",
      name: "RAP2",
      icon: "http://rap2.taobao.org/favicon.png",
      url: "http://rap2.taobao.org/",
      objectid: "5e770a6c14de8e00084d94a6",
    },
    {
      groupPri: 1,
      group: "code",
      name: "LeanClound",
      icon: "https://leancloud.cn/apple-touch-icon.png",
      url: "https://tab.leancloud.cn/applist.html#/apps",
      objectid: "5e770a6b14de8e00084d94a5",
    },
    {
      groupPri: 1,
      group: "code",
      name: "阿里云",
      icon: "https://img.alicdn.com/tfs/TB1_ZXuNcfpK1RjSZFOXXa6nFXa-32-32.ico",
      url: "https://www.aliyun.com/",
      objectid: "5e770a6a14de8e00084d94a4",
    },
    {
      groupPri: 1,
      group: "code",
      name: "饥人谷JS Bin",
      icon: "http://js.jirengu.com/favicon.ico",
      url: "http://js.jirengu.com",
      objectid: "5e770a6914de8e00084d94a3",
    },
    {
      groupPri: 1,
      group: "code",
      name: "梯子，翻墙用的",
      icon: "https://order.shadowsocks.ch/favicon.ico",
      url:
        "https://order.shadowsocks.ch/clientarea.php?action=productdetails&id=1091154",
      objectid: "5e770a6814de8e00084d94a1",
    },
    {
      groupPri: 1,
      group: "code",
      name: "写代码啦",
      icon: "https://xiedaimala.com/favicon.ico",
      url: "https://xiedaimala.com/",
      objectid: "5e770a6714de8e00084d949d",
    },
  ],
  community: [
    {
      groupPri: 2,
      group: "community",
      name: "豆瓣，偶尔一下",
      icon: "https://www.douban.com//favicon.ico",
      url: "https://www.douban.com/",
      objectid: "5e770a5814de8e00084d9485",
    },
    {
      groupPri: 2,
      group: "community",
      name: "鱼C工作室",
      icon: "https://fishc.com.cn/favicon.ico",
      url: "https://fishc.com.cn",
      objectid: "5e770a5714de8e00084d9484",
    },
    {
      groupPri: 2,
      group: "community",
      name: "渣浪",
      icon: "https://weibo.com/favicon.ico",
      url: "https://weibo.com",
      objectid: "5e770a5614de8e00084d9483",
    },
    {
      groupPri: 2,
      group: "community",
      name: "简书-笔记",
      icon: "https://www.jianshu.com//favicon.ico",
      url: "https://www.jianshu.com/",
      objectid: "5e770a5514de8e00084d947d",
    },
    {
      groupPri: 2,
      group: "community",
      name: "钢鞭的故事",
      icon: "https://www.zhihu.com/favicon.ico",
      url: "https://www.zhihu.com",
      objectid: "5e770a5414de8e00084d947b",
    },
  ],
  media: [
    {
      groupPri: 3,
      group: "media",
      name: "鼠绘",
      icon: "https://www.ishuhui.com//favicon.ico",
      url: "https://www.ishuhui.com/",
      objectid: "5e770a7714de8e00084d94b7",
    },
    {
      groupPri: 3,
      group: "media",
      name: "优酷土豆",
      icon:
        "https://img.alicdn.com/tfs/TB1WeJ9Xrj1gK0jSZFuXXcrHpXa-195-195.png",
      url:
        "https://faxian.youku.com/watch_record?spm=a2h0j.11185381.uerCenter.5!3~5~5~A",
      objectid: "5e770a7614de8e00084d94b6",
    },
    {
      groupPri: 3,
      group: "media",
      name: "企鹅电视",
      icon: "https://v.qq.com/favicon.ico",
      url: "https://v.qq.com/",
      objectid: "5e770a7514de8e00084d94b3",
    },
    {
      groupPri: 3,
      group: "media",
      name: "马桶台",
      icon: "https://www.mgtv.com//favicon.ico",
      url: "https://www.mgtv.com/",
      objectid: "5e770a7414de8e00084d94b2",
    },
    {
      groupPri: 3,
      group: "media",
      name: "网易云音乐",
      icon: "https://s1.music.126.net/style/favicon.ico?v20180823",
      url: "https://music.163.com/",
      objectid: "5e770a7314de8e00084d94b1",
    },
    {
      groupPri: 3,
      group: "media",
      name: "271",
      icon: "https://www.iqiyi.com//favicon.ico",
      url: "https://www.iqiyi.com/",
      objectid: "5e770a7214de8e00084d94b0",
    },
    {
      groupPri: 3,
      group: "media",
      name: "大型同性视频平台",
      icon: "https://www.bilibili.com/favicon.ico",
      url: "https://www.bilibili.com",
      objectid: "5e770a7114de8e00084d94ad",
    },
  ],
  daily: [
    {
      groupPri: 4,
      group: "daily",
      name: "无法注册",
      icon: "http://image.wufazhuce.com/favicon.ico",
      url: "http://wufazhuce.com/",
      objectid: "5e770a5314de8e00084d9479",
    },
    {
      groupPri: 4,
      group: "daily",
      name: "秀米",
      icon: "https://stc.xiumi.us/images/316e42.xiumi_logo_40.png",
      url: "https://xiumi.us/#/",
      objectid: "5e770a5214de8e00084d9476",
    },
    {
      groupPri: 4,
      group: "daily",
      name: "微信公众号",
      icon: "https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico",
      url: "https://mp.weixin.qq.com/cgi-bin/loginpage?t=wxm2-login&lang=zh_CN",
      objectid: "5e770a5114de8e00084d9474",
    },
    {
      groupPri: 4,
      group: "daily",
      name: "人人影视",
      icon: "http://www.yyets.com/favicon.ico",
      url: "http://www.zmz2019.com/",
      objectid: "5e770a5014de8e00084d9471",
    },
    {
      groupPri: 4,
      group: "daily",
      name: "百度",
      icon: "https://www.baidu.com/favicon.ico",
      url: "https://www.baidu.com",
      objectid: "5e770a4f14de8e00084d9470",
    },
    {
      groupPri: 4,
      group: "daily",
      name: "亚马逊",
      icon: "https://www.amazon.cn//favicon.ico",
      url: "https://www.amazon.cn/",
      objectid: "5e770a4e14de8e00084d946e",
    },
    {
      groupPri: 4,
      group: "daily",
      name: "百度地图",
      icon: "https://map.baidu.com//favicon.ico",
      url: "https://map.baidu.com/",
      objectid: "5e770a4d14de8e00084d946b",
    },
    {
      groupPri: 4,
      group: "daily",
      name: "铁总",
      icon: "https://www.12306.cn/index/images/favicon.ico",
      url: "https://www.12306.cn",
      objectid: "5e770a4c14de8e00084d9468",
    },
    {
      groupPri: 4,
      group: "daily",
      name: "厦门小鱼网",
      icon: "http://www.xmfish.com//favicon.ico",
      url: "http://www.xmfish.com/",
      objectid: "5e770a4b14de8e00084d9464",
    },
    {
      groupPri: 4,
      group: "daily",
      name: "Are you ok?",
      icon: "https://www.mi.com//favicon.ico",
      url: "https://www.mi.com/",
      objectid: "5e770a4a14de8e00084d9462",
    },
    {
      groupPri: 4,
      group: "daily",
      name: "剁手网",
      icon: "https://img.alicdn.com/tps/i3/T1OjaVFl4dXXa.JOZB-114-114.png",
      url: "https://www.taobao.com",
      objectid: "5e770a4914de8e00084d9461",
    },
  ],
  resourse: [
    {
      groupPri: 5,
      group: "resourse",
      name: "pexels",
      icon: "https://www.pexels.com/favicon.ico",
      url: "https://www.pexels.com/",
      objectid: "5e770a6614de8e00084d949c",
    },
    {
      groupPri: 5,
      group: "resourse",
      name: "unsplash图库",
      icon: "https://unsplash.com/favicon-16x16.png",
      url: "https://unsplash.com/",
      objectid: "5e770a6514de8e00084d949b",
    },
    {
      groupPri: 5,
      group: "resourse",
      name: "Dribbble",
      icon:
        "https://cdn.dribbble.com/assets/favicon-63b2904a073c89b52b19aa08cebc16a154bcf83fee8ecc6439968b1e6db569c7.ico",
      url: "https://dribbble.com",
      objectid: "5e770a6414de8e00084d949a",
    },
  ],
  blog: [
    {
      groupPri: 6,
      group: "blog",
      name: "移动端页面的适配",
      icon: "https://www.w3cplus.com/sites/all/themes/w3cplusV2/favicon.ico",
      url: "https://www.w3cplus.com/css/vw-for-layout.html",
      objectid: "5e770a7014de8e00084d94ac",
    },
  ],
};

export default {
  name: "Menu",
  data() {
    return {
      groupData: res,
    };
  },
};
</script>

<style scoped>
body,
ol,
ul,
h1,
h2,
h3,
h4,
h5,
h6,
p,
th,
td,
dl,
dd,
form,
fieldset,
legend,
input,
textarea,
select {
  margin: 0;
  padding: 0;
}
a {
  color: inherit;

  text-decoration: none;
}

a:hover {
  color: inherit;

  text-decoration: none;
}

button {
  cursor: pointer;
}

em {
  font-style: normal;
}

li {
  list-style: none;
}

img {
  border: 0;

  vertical-align: middle;
}

p {
  word-wrap: break-word;
}

header {
  display: block;
  height: 2px;
  width: 100%;
  margin: 30px 0;
  background-color: #eee;
  position: relative;
}
header h2 {
  cursor: pointer;
  position: absolute;
  background-color: #fff;
  padding: 0 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  color: #888;
  border: 0;
}
header h2:hover {
  color: #5f9ea0;
}
.menu-group-list {
  display: grid;
  transition: all 0.5s;
  font-size: 14px;
  grid-gap: 1em;
  width: 100%;
  margin-bottom: 20px;
  grid-template-columns: repeat(5, 1fr);
}
.menu-group-list li {
  overflow: hidden;
  position: relative;
  border-radius: 0.5em;
  transition: all 0.5s;
  border: 1px rgba(0, 0, 0, 0.1) solid;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.1);
}
.menu-group-list li:hover {
  transform: translateY(-0.3em);
}
.menu-group-list li a {
  display: flex;
  padding: 0.7em;
}
.menu-group-list li a img {
  width: 2em;
  height: 2em;
  vertical-align: middle;
}
.menu-group-list li a p {
  vertical-align: middle;
  margin-left: 0.5em;
  line-height: 2em;
  width: 6.6em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
