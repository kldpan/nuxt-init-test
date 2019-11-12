# Nuxt

Nuxt.js 是一个基于vue.js的通用应用框架，其核心主要是通过vue-server-renderer模块来实现服务端渲染。 vue-server-renderer是Vue服务端Node.js渲染的一个模块，用来生成HTML内容

### **客户端渲染**

客户端利用ajax等数据交互手段获取服务端提供的数据之后，并渲染到HTML页面。渲染工作在浏览器完成.减少服务器压力,不利于SEO优化

### **服务器端渲染**

整个网站先在服务器中运行，然后返回一个完整的HTML字符串，然后响应内容输出给浏览器,浏览器会接收到一个渲染完毕静态化page页面,不需要客户端在进行渲染,渲染速度快与利于搜索引擎抓取页面内容

### 安装

安装 create-nuxt-app 工具

官网 https://zh.nuxtjs.org/guide/installation

```js
cnpm i -g create-nuxt-app   //安装构建工具 
create-nuxt-app -v                //成功出现版本
//create-nuxt-app/2.11.1 win32-x64 node-v10.15.3
create-nuxt-app test_nuxt            //出现项目
```

> 启动

```js
cd test_nuxt 
cnpm i 
cnpm run dev
//应用现在运行在 http://localhost:3000 上运行。
```

### 渲染方式

```javascript
mode: 'universal'   // universal 服务器端渲染ssr； spa单页应用
```

### 项目目录

>熟悉目录

```js
pages//路由页面
components //通用组件
plugins //引入插件自定义计算模块, js模块执行,没有暴露
```



>Nuxt.js 的路由是根据 `pages` 目录结构自动生成
>
>layouts/default.vue 这个页面是主布局页面（入口页）。

```js
layouts/default.vue //相当于App
<nuxt/> //路由显示位置
```

### 路由入口

>nuxt的路由是根据文件夹自动生成

>**入口路由**
>
> /             默认到pages文件夹,并且自定加载index.vue 文件
>
>**自定义**
>
> /user         默认到 pages/user/index.vue 文件

### 请求

> 配置插件

```js
import Vue from "vue"
import axios from "axios"
class Apis  {
    getTestData(){
        axios({
            method:"GET",
            url:"/json1811.ashx?v=1572782189825"
        }).then((res)=>{
            console.log(res);
        })
    }    
}
Vue.prototype.$apis=new Apis();

//配置nuxt.config 代理
//单独一项
//TestBUg
proxy: {
    '/bsk': {
        target: 'http://m.bestcake.com', // 代理地址
        changeOrigin: true,
        pathRewrite: {
            '^/bsk': '', //将 /api 替换掉
        },
   }
}
```



### Nuxt配置文件(配置请求)

>next.config.js
>
>模块与自定义模块

```js
// '@nuxtjs/axios' npm 模块名
// 因为是服务端,所以在启动渲染没有window,设置在启动过程中,不渲染这个文件渲染完毕后,在加载 
//~ 代表根目录
plugins: [
    {
      src: '~/plugins/api.js',
      ssr: false     //启动时执行自动build,属于服务端渲染是没有window,设置启动不加载
    },
     {
      src: '~/node_modules/lib-flexible',
      ssr: false
  },
  {
      src: '~/node_modules/storejs',   
      ssr: false
  },
  ]

 //配置 lib-flexible
```

配置Vuex

> 在默认创建的 store文件下建文件,注意重启
>
> state.js
>
> mutations.js
>
> actions.js
>
> getters.js 

### 修改端口

>package.json 里面进行修改

```js

"config": {
    "nuxt": {
        "host": "0.0.0.0",
        "port": "3333"
    }
}
```

### scss全局配置

> nuxt 本身不直接支持 scss，需要先安装模块,打开page页面，编写scss代码测试。

```js
//cnpm i node-sass@4.13.0 sass-loader@8.0.0 @nuxtjs/style-resources@1.0.0 -D
module.exports = { 
modules: [
    //这是npm 社区 就有 名字叫 @nuxtjs/axios 模块
    '@nuxtjs/axios', 
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: './assets/css/index.scss'
  }
}
```

## static引用(qn)

> nuxtjs 没有所谓的 index.html 入口页，这个 index.html 实际是有 nuxt.config.js 编译而成的。

```javascript
// 不要使用这种方式引入rem，因为刷新页面时，会报找不到document错误，这是ssr渲染造成的问题。
//head index.html head便签内部配置
head:{
 script: [
    {
        src: './js/vconsole.min.js',
    },
    // 可以写入 js代码
    {innerHTML: 'new VConsole()',  type: 'text/javascript'}
]   
}


```

### 发布

```
npm run generate   //静态发布
```

# 部署

将上一步的 dist 文件夹放入网站服务器下，这样别人就可以通过浏览器直接访问了。

有很多种部署网站的方法，比如 nodejs：

文件结构

```
www/
    node_modules/
    dist/
    app.js
```

app.js 代码

```
// npm install express
const express = require('express');
const app = express();
app.use(express.static('dist'));
app.listen(80);
```
