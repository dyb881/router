import React from 'react';
import { Redirect, Route, Switch, matchPath, useHistory, useLocation } from 'react-router-dom';
import Transition from '@dyb881/transition';

interface IRouters {
  [index: string]: React.ComponentType<any>;
}

interface IProps {
  routers: IRouters; // 页面配置列表
  transition?: boolean; // 开启跳转动画
  app?: boolean; // 是否打包成APP，既启用app模拟跳转
}

/**
 * 注册路由
 */
const Router: React.SFC<IProps> = ({ app, transition, routers }) => {
  const location = useLocation();
  const history = useHistory();
  const keys = Object.keys(routers);

  const res = (
    <Switch location={location} key={location.pathname}>
      {keys.map((item, index) => (
        <Route key={index} path={item} component={routers[item]} exact />
      ))}
      <Redirect to={keys[0]} />
    </Switch>
  );

  if (
    transition &&
    history.action !== 'REPLACE' &&
    keys.some(i => !!matchPath(location.pathname, { path: i, exact: true }))
  ) {
    const name = app ? (history.action === 'PUSH' ? 'router-go' : 'router-back') : 'router-fade';
    return <Transition name={name}>{res}</Transition>;
  }

  return res;
};

export default Router;
