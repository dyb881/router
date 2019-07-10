# router

使用 react-router-dom 封装的路由注册组件 可选 @dyb881/transition 动画跳转

## 用法

### 引用

```
import Router from '@dyb881/router';
import '@dyb881/router/lib/style.css';
```

### 配置

配置路由地址，和对应的页面组件

```
const routers: any = {
  '/': 页面组件,
  '/user': 页面组件,
};
```

### 参数说明

#### routers

路由配置参数

#### transition：boolean

开启页面跳转动画

#### app：boolean

仿 app 跳转动画，在特定情况下可启用

### 示例

```
<Router page={page} transition={true} app={false} />
```
