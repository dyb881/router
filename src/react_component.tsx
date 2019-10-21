import React from 'react';
import { Redirect, Route, Switch, matchPath, withRouter, RouteComponentProps } from 'react-router-dom';
import Transition from '@dyb881/transition';

type TRouters = {
  [index: string]: React.ComponentType<any>;
};

type TProps = RouteComponentProps & {
  routers: TRouters; // 页面配置列表
  transition?: boolean; // 开启跳转动画
  app?: boolean; // 是否打包成APP，既启用app模拟跳转
};

/**
 * 注册路由
 */
const Router: React.SFC<TProps> = ({ app, transition, routers, location, history: { action } }) => {
  const keys = Object.keys(routers);

  const res = (
    <Switch location={location} key={location.pathname}>
      {keys.map((item, index) => (
        <Route key={index} path={item} component={routers[item]} exact />
      ))}
      <Redirect to={keys[0]} />
    </Switch>
  );

  const isTransition = transition && keys.some(i => !!matchPath(location.pathname, { path: i, exact: true }));

  if (isTransition) {
    const name = app && action !== 'REPLACE' ? (action === 'PUSH' ? 'router-go' : 'router-back') : 'router-fade';
    return <Transition name={name}>{res}</Transition>;
  }

  return res;
};

export default withRouter(Router);
