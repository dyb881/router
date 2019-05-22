# router

使用 react-router-dom 封装的路由注册组件 可选 @dyb881/transition 动画跳转

## 用法

index.ts

```
import React from 'react';
import Router from '@dyb881/router';
import '@dyb881/router/lib/style.css';

import Home from './home';
import Test from './test';

/**
 * 导出页面，所有页面都需要绝对定位才可正常播放跳转动画
 */
export const page = {
  '/home': Home,
  '/test/:id?': Test,
};

interface IProps {
  page: IPage; // 页面配置列表
  transition?: boolean; // 开启跳转动画
  app?: boolean; // 是否打包成APP，既启用app模拟跳转
}

/**
 * 页面组件
 */
class Page extends React.Component {
  render() {
    return (
      <div className="fill">
        <Router page={page} transition={true} app={false} />
      </div>
    );
  }
}
```
